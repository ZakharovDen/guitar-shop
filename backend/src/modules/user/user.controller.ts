import {
  Controller,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailService } from '../mail-module/mail.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RequestWithTokenPayload } from 'src/core/interfaces/request-with-token-payload.interface';

@Controller('users')
@ApiTags('Пользователи')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly mailService: MailService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Создание нового пользователя' })
  public async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    try {
      await this.mailService.sendNotifyNewSubscriber(createUserDto);
    } finally {
      return user;
    }
  }

  @ApiOperation({ summary: 'Авторизация пользователя.' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  @ApiBearerAuth()
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.verifyUser(loginUserDto);
    const userToken = await this.usersService.createUserToken(user);
    return userToken;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
}