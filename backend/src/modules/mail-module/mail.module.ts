import { Module } from '@nestjs/common';

import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerAsyncOptions } from 'src/helpers/mail';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('application.mail'))
  ],
  providers: [
    MailService
  ],
  exports: [
    MailService
  ]
})
export class MailModule { }