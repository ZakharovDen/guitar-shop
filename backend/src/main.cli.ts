import { CLIApplication } from "./cli/cli-application";
import { HelpCommand } from "./cli/commands/help.command";
import { GenerateCommand } from "./cli/commands/generate.command";

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new GenerateCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();