import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class avatar implements IBotCommand {

    private readonly _command = "avatar";

    help(): string {

        return "Returns the avatar of a user";

    } isThisCommand(command: string): boolean {

        return command === this._command;

    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        let userAvatar = msgObject.mentions.users.first();

        if (args.length < 1) {
            let avEmbed = new Discord.RichEmbed()
                .setTitle(`<@${msgObject.author.username}>'s Avatar`)
                .setImage(msgObject.author.avatarURL)
                .setTimestamp()
            msgObject.channel.send(avEmbed)
        } else {
            let avEmbed = new Discord.RichEmbed()
                .setTitle(`${userAvatar.username}'s Avatar`)
                .setImage(userAvatar.avatarURL)
                .setTimestamp()
            msgObject.channel.send(avEmbed)
        }
    }
}