import {
  Controller,
  Post,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailService } from '../mail-module/mail.service';
import { LoginUserDto } from './dto/login-user.dto';

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
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.verifyUser(loginUserDto);
    const userToken = await this.usersService.createUserToken(user);
    return userToken;
  }
}