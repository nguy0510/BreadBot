import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class serverinfo implements IBotCommand {

    private readonly _command = "serverinfo";

    help(): string {

        return "This command displays the info of the server!";

    } isThisCommand(command: string): boolean {

        return command === this._command;

    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        let embed = new Discord.RichEmbed()
            .setColor("#e2a5ff")
            .setTitle("**Server Info**")
            .setFooter(msgObject.guild.owner.user.tag, msgObject.guild.owner.user.avatarURL)
            .setImage(msgObject.guild.iconURL)
            .setDescription("Placeholder")
            .addField('**Server Name:**', msgObject.guild.name)
            .addField('**Server ID:**', msgObject.guild.id)
            .addField("Member count: ", msgObject.guild.memberCount)
            .addField("**Channels**", `${msgObject.guild.channels.filter(channel => channel.type === 'voice').size} voice / ${msgObject.guild.channels.filter(channel => channel.type === 'voice').size}} text`)
            .addField("**Server Region**", msgObject.guild.region)
            .addField("**Created at: **", msgObject.guild.createdAt)
            .setTimestamp()

        msgObject.channel.send(embed)
            .catch(console.error);

    }


}