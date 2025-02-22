import { Module } from '@nestjs/common';
import { CowSayCommand } from './commands/cow-say.command';

@Module({
  providers: [
    CowSayCommand
  ]
})
export class CliModule { }
