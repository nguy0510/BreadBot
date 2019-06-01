import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class purge implements IBotCommand{

    private readonly _command = "purge";

    help(): string {

        return "Deletes x number of messages in channel";

    }    isThisCommand(command: string): boolean {

        return command === this._command;

    }
    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {

        if(!msgObject.member.hasPermission("MANAGE_MESSAGES")||!msgObject.member.hasPermission("ADMINISTRATOR")){
            msgObject.channel.send(`Nice try ${msgObject.author.username}, you retard you don't have permission to manage messages!!`);
            return;
        }
        let messageCount = parseInt(args.join(' '));
        let purgeUser = msgObject.mentions.members.first();
       
        if (!messageCount || args.length < 1){
            msgObject.reply("You must supply a number of messages to purge!");
        }else {
            if(messageCount > 1000){
                msgObject.reply("Unable to purge more than 1000 messages!");
                return;
            }
/*             if(purgeUser){
                let purgeUserID = msgObject.guild.member(purgeUser).id;
                let messageID = msgObject.channel.messages.f
                msgObject.channel.fetchMessages({
                    
                    limit:messageCount
                })
            } */
            msgObject.channel.fetchMessages({
                limit : messageCount
            }).then(messages => msgObject.channel.bulkDelete(messages));
        }
    }
}