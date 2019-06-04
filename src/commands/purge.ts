import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class purge implements IBotCommand {

    private readonly _command = "purge";

    help(): string {

        return "Deletes x number of messages in channel";

    } isThisCommand(command: string): boolean {

        return command === this._command;

    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client):  Promise<void> {

        if (!msgObject.member.hasPermission("MANAGE_MESSAGES") || !msgObject.member.hasPermission("ADMINISTRATOR")) {
            msgObject.channel.send(`Nice try ${msgObject.author.username}, you dummy you don't have permission to manage messages!!`);
            return;
        }

        let messageCount = parseInt(args.slice(0).join(" "))
        if (messageCount == NaN) {
            msgObject.reply("that is not a valid number!").then(msg => {
                (msg as Discord.Message).delete(5000);
            })
        }
        messageCount = Math.round(messageCount);
        let purgeUser = msgObject.mentions.members.first();

        if (!messageCount || args.length < 1) {
            msgObject.reply("you must supply a number of messages to purge!")
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                })
            return;
        } else {
            if (messageCount > 100) {
                msgObject.reply("unable to purge more than 100 messages!")
                    .then(msg => {
                        (msg as Discord.Message).delete(5000);
                    })
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
                limit: messageCount
            }).then(messages => msgObject.channel.bulkDelete(messages));
        }
    }
}