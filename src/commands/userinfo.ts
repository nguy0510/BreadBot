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
            let userPerms:any = new Array();
            let counter = 0;
            userPerms = member.roles.map(s => s).join("  ,  ");
            while(counter < userPerms){
                counter++;
            }

            let embed = new Discord.RichEmbed()
                .setColor(member.highestRole.hexColor)
                .setFooter(`User ID: ${msgObject.author.id}`)
                .setThumbnail(msgObject.author.avatarURL)
                .setTitle(`**${userAuthor.username}#${userAuthor.discriminator}**`)
                .addField("**Join position:**", position)
                .addField("**Join date: **", moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss'))
                .addField("**Created at: **", `${moment.utc(userAuthor.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
                .addField("**Roles: **", member.roles.map(s => s).slice(1).join("  ,  ") || "No Roles", true)
                .addField("**Permissions:**", member.permissions)
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
                .setFooter(`User ID: ${userInfo.id}`)
                .setImage(userInfo.avatarURL)
                .setTitle(`**${userInfo.username}#${userInfo.discriminator}**`)
                .addField("**Join position:**", position)
                .addField("**Join date: **", moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss'))
                .addField("**Created at: **", `${moment.utc(userInfo.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
                .addField("**Roles: **", member.roles.map(s => s).slice(2).join("  ,  ") || "No Roles", true)
                .addField("Key permissions: ", member.permissionsIn(msgObject.channel.id))
                .setTimestamp()

            msgObject.channel.send(embed)
                .catch(console.error);
        }

    }


}