import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class setlog implements IBotCommand{

    private readonly _command = "setlog";
    readonly _logChannel: string | undefined;

    help(): string {

        return "This command sets the log channel!";

    }    isThisCommand(command: string): boolean {

        return command === this._command;

    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client):  Promise<void> {
        

        if(!msgObject.member.hasPermission("MANAGE_CHANNELS")||!msgObject.member.hasPermission("ADMINISTRATOR")){
            msgObject.channel.send(`Nice try ${msgObject.author.username}, you dummy you don't have permission to set the channel!`);
            return;
        }
        if(args.length < 1){
            msgObject.channel.send(`Sorry ${msgObject.author.username}, you need to specify a channel for logs!`);
            return;
        }
        let logChannel = msgObject.channel;
        msgObject.channel.send("Log channel set!");

    }


}