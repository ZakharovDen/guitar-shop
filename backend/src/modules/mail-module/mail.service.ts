import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EMAIL_REGISTER_SUBJECT } from './mail.constant';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) { }

  private getHtml(subscriber: CreateUserDto): string {
    return `<h2>Привет, ${subscriber.name}</h2><p>Ваш логин: ${subscriber.email} пароль: ${subscriber.password}.</p><p>Ссылка для входа http://localhost:5173/</p>`;
  }

  public async sendNotifyNewSubscriber(subscriber: CreateUserDto) {
    const html = this.getHtml(subscriber);
    await this.mailerService.sendMail({
      from: this.configService.get<string>('mail.from'),
      to: subscriber.email,
      subject: EMAIL_REGISTER_SUBJECT,
      html: html,
    })
  }
}