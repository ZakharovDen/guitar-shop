
import { Command, CommandRunner, Option } from 'nest-commander';
import { Logger } from '@nestjs/common';

interface BasicCommandOptions {
  string?: string;
  boolean?: boolean;
  number?: number;
}

@Command({ name: 'basic', description: 'A parameter parse' })
export class BasicCommand extends CommandRunner {
  private readonly logService = new Logger()

  constructor() {
    super()
  }

  async run(
    passedParam: string[],
    options?: BasicCommandOptions,
  ): Promise<void> {
    if (options?.boolean !== undefined && options?.boolean !== null) {
      this.runWithBoolean(passedParam, options.boolean);
    } else if (options?.number) {
      this.runWithNumber(passedParam, options.number);
    } else if (options?.string) {
      this.runWithString(passedParam, options.string);
    } else {
      this.runWithNone(passedParam);
    }
  }

  @Option({
    flags: '-n, --number [number]',
    description: 'A basic number parser',
  })
  parseNumber(val: string): number {
    console.log('parseNumber');
    return Number(val);
  }

  @Option({
    flags: '-s, --string [string]',
    description: 'A string return',
  })
  parseString(val: string): string {
    console.log('parseString');
    return val;
  }

  @Option({
    flags: '-b, --boolean [boolean]',
    description: 'A boolean parser',
  })
  parseBoolean(val: string): boolean {
    console.log('parseBoolean');
    return JSON.parse(val);
  }

  runWithString(param: string[], option: string): void {
    console.log('runWithString');
    console.log({ param, string: option });
  }

  runWithNumber(param: string[], option: number): void {
    console.log('runWithNumber');
    console.log({ param, number: option });
  }

  runWithBoolean(param: string[], option: boolean): void {
    console.log('runWithBoolean');
    console.log({ param, boolean: option });
  }

  runWithNone(param: string[]): void {
    console.log('runWithNone');
    console.log({ param });
  }
}
