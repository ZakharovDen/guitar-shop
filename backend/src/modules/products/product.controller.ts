import { Controller, Get, Post, Body, Param, Delete, Put, Query, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseInterceptors, SerializeOptions, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductQuery } from './product.query';
import { PhotoParams } from './product.constant';
import { FileUploaderService } from '../file-uploader/file-uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductRdo } from './rdo/product-rdo';
import { ProductWithPaginationRdo } from './rdo/product-with-pagination.rdo';
import { FilePathInterceptor } from 'src/helpers/interceptors/photo-path.interceptor';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';

@ApiTags('Товары')
@UseInterceptors(FilePathInterceptor)
@Controller('products')
export class ProductController {
  constructor(
    private readonly productsService: ProductService,
    private readonly fileUploaderService: FileUploaderService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Создание нового товара' })
  @ApiResponse({ type: ProductRdo, status: HttpStatus.CREATED, description: 'Новый товар создан' })
  @UseInterceptors(FileInterceptor('photo'))
  @ApiConsumes('multipart/form-data')
  @SerializeOptions({ type: ProductRdo })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async create(
    @Body() dto: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: PhotoParams.MaxSize }),
          new FileTypeValidator({ fileType: PhotoParams.FileType }),
        ],
        fileIsRequired: true,
      })
    ) photo: Express.Multer.File
  ) {
    if (photo) {
      const photoData = await this.fileUploaderService.writeFile(photo);
      dto.photoPath = `${photoData.subDirectory}\\${photoData.filename}`;
    }
    delete dto.photo;
    return this.productsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка товаров' })
  @ApiResponse({ type: ProductWithPaginationRdo, status: HttpStatus.OK, description: 'Получен список товаров' })
  @SerializeOptions({ type: ProductWithPaginationRdo })
  public async findAll(@Query() query: ProductQuery) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение детальной информации по товару' })
  @ApiResponse({ type: ProductRdo, status: HttpStatus.OK, description: 'Получена информация по товару' })
  @SerializeOptions({ type: ProductRdo })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Редактирование товара' })
  @ApiResponse({ type: ProductRdo, status: HttpStatus.CREATED, description: 'Товар изменен' })
  @UseInterceptors(FileInterceptor('photo'))
  @ApiConsumes('multipart/form-data')
  @SerializeOptions({ type: ProductRdo })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: PhotoParams.MaxSize }),
          new FileTypeValidator({ fileType: PhotoParams.FileType }),
        ],
        fileIsRequired: false,
      })
    ) photo: Express.Multer.File
  ) {
    if (photo) {
      const photoData = await this.fileUploaderService.writeFile(photo);
      dto.photoPath = `${photoData.subDirectory}\\${photoData.filename}`;
    } else {
      dto.photoPath = (await this.productsService.findOne(id)).photoPath;
    }
    if (!dto.photoPath) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }
    delete dto.photo;
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление товара', description: 'Товар удален' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
