import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class testCommand implements IBotCommand{

    private readonly _command = "testCommand";

    help(): string {

        return "This command does nothing!";

    }    isThisCommand(command: string): boolean {

        return command === this._command;

    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client):  Promise<void> {

        msgObject.channel.send("IT WORKED");

    }


}