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
import { MailService } from '../mail-module/mail.service';

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
    await this.mailService.sendNotifyNewSubscriber(createUserDto);
    return user;
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
