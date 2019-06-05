import * as Discord from "discord.js";
import { IBotCommand } from "../api";
const moment = require("moment");

export default class userinfo implements IBotCommand {

    private readonly _command = "userinfo";

    help(): string {

        return "This command displays the info of the server!";

    } isThisCommand(command: string): boolean {

        return command === this._command;

    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        if (args.length < 1) {

            let userAuthor = msgObject.author;
            const member = msgObject.guild.member(userAuthor);
            let sortedMembers = msgObject.guild.members.array().sort((a, b) => {
                return a.joinedTimestamp - b.joinedTimestamp
            })
            let position = sortedMembers.indexOf(member) + 1;

            let embed = new Discord.RichEmbed()
                .setColor(member.highestRole.hexColor)
                .setFooter(member.permissions)
                .setThumbnail(msgObject.author.avatarURL)
                .setTitle(`**${userAuthor.username}#${userAuthor.discriminator}**`)
                .addField('**User ID: **', msgObject.author.id)
                .addField("**Join position:**", position)
                .addField("**Join date: **", moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss'))
                .addField("**Created at: **", `${moment.utc(userAuthor.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
                .addField("\n**Roles: **", member.roles.map(s => s).join("  ,  ") || "No Roles", true)
                .setTimestamp()

            msgObject.channel.send(embed)
                .catch(console.error);

        } else {
            let userInfo = msgObject.mentions.users.first();
            const member = msgObject.guild.member(userInfo);
            let sortedMembers = msgObject.guild.members.array().sort((a, b) => {
                return a.joinedTimestamp - b.joinedTimestamp
            })
            let position = sortedMembers.indexOf(member) + 1;
            let embed = new Discord.RichEmbed()
                .setColor(member.highestRole.hexColor)
                .setFooter("Key permissions: ")
                .setThumbnail(userInfo.avatarURL)
                .setTitle(`**${userInfo.username}#${userInfo.discriminator}**`)
                .addField('**User ID: **', userInfo.id)
                .addField("**Join position:**", position)
                .addField("**Join date: **", moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss'))
                .addField("**Created at: **", `${moment.utc(userInfo.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
                .addField("**Roles: **", member.roles.map(s => s).join("  ,  ") || "No Roles", true)
                .setTimestamp()

            msgObject.channel.send(embed)
                .catch(console.error);
        }

    }


}