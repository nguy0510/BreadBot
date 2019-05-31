import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class setLog implements IBotCommand{

    private readonly _command = "setLog";
    readonly _logChannel: string | undefined;

    help(): string {

        return "This command sets the log channel!";

    }    isThisCommand(command: string): boolean {

        return command === this._command;

    }
    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
        

        if(!msgObject.member.hasPermission("MANAGE_CHANNELS")||!msgObject.member.hasPermission("ADMINISTRATOR")){
            msgObject.channel.send(`Nice try ${msgObject.author.username}, you retard you don't have permission to set the channel!`);
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