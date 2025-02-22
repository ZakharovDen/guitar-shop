import { Module } from '@nestjs/common';
import { CowSayCommand } from './commands/cow-say.command';
import { BasicCommand } from './commands/basic';

@Module({
  providers: [
    BasicCommand
  ]
})
export class CliModule { }
