import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Пользователи')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Создание нового пользователя' })
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
