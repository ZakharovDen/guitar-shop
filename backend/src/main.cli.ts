import { CommandFactory } from "nest-commander";
import { AppModule } from "./app.module";
import { CLIApplication } from "./cli/cli-application";
import { HelpCommand } from "./cli/commands/help.command";
import { GenerateCommand } from "./cli/commands/generate.command";

// async function bootstrap() {
//   await CommandFactory.run(AppModule);
// }

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    // new VersionCommand(),
    // new ImportCommand(),
    new GenerateCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();