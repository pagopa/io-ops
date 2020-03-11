import Command, { flags } from "@oclif/command";
import * as Parser from "@oclif/parser";
import chalk from "chalk";
import cli from "cli-ux";
import { toError } from "fp-ts/lib/Either";
import { TaskEither, tryCatch } from "fp-ts/lib/TaskEither";
// tslint:disable-next-line: no-submodule-imports
import { getRequiredStringEnv } from "io-functions-commons/dist/src/utils/env";
import fetch from "node-fetch";

export class UserGroupUpdate extends Command {
  public static description =
    "Update the list of groups (permissions) associated to the User identified by the provided email";

  // tslint:disable-next-line: readonly-array
  public static args: Parser.args.IArg[] = [
    {
      description: "email",
      name: "email",
      required: true
    }
  ];

  // tslint:disable-next-line: readonly-array
  public static examples = [
    `$ io-ops users:update-groups  --groups=ApiInfoRead,ApiLimitedMessageWrite,ApiMessageRead`
  ];

  public static flags = {
    groups: flags.string({
      description: "A comma separeted list of groups",
      required: true
    })
  };

  public async run(): Promise<void> {
    // tslint:disable-next-line: no-shadowed-variable
    const { args, flags: commandLineFlags } = this.parse(UserGroupUpdate);

    cli.action.start(
      chalk.blue.bold(
        `Updating a list of groups (permission) for user: ${args.email}`
      ),
      chalk.blueBright.bold("Running"),
      {
        stdout: true
      }
    );

    const groupsPermission = commandLineFlags.groups.split(",");

    return this.put(args.email, groupsPermission)
      .fold(
        error => {
          cli.action.stop(chalk.red(`Error : ${error}`));
        },
        result => {
          cli.action.stop(chalk.green(`Response: ${result}`));
        }
      )
      .run();
  }

  private put = (
    email: string,
    groupsPermission: readonly string[]
  ): TaskEither<Error, string> => {
    return tryCatch(
      () =>
        fetch(
          `${getRequiredStringEnv("BASE_URL_ADMIN")}/users/${email}/groups`,
          {
            body: JSON.stringify({ groups: groupsPermission }),
            headers: {
              "Ocp-Apim-Subscription-Key": getRequiredStringEnv("OCP_APIM")
            },
            method: "put"
          }
        ).then(res => res.text()),
      toError
    );
  };
}
