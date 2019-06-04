import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class ban implements IBotCommand {

    private readonly _command = "ban";

    help(): string {

        return "Bans the mentioned user";

    } isThisCommand(command: string): boolean {

        return command === this._command;

    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client):  Promise<void> {


        let mentionedUser = msgObject.mentions.users.first();
        let banReason = args.slice(1).join(" ") || "";
        let banLog = `${msgObject.author.username}:${banReason}`;

        msgObject.delete(0);

        //if a user without permissions attempts to kick
        if (!msgObject.member.hasPermission("BAN_MEMBERS") || !msgObject.member.hasPermission("ADMINISTRATOR")) {
            msgObject.channel.send(`Nice try ${msgObject.author.username}, you dummy you don't have permission to ban!`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                })
            return;

        } else if (msgObject.guild.owner.user === mentionedUser) {

            msgObject.channel.send(`Nice try ${msgObject.author.username}, you dummy you can't ban the owner!`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000);;
                })
            return;
        }

        //If user just does ~kick without mentioning a user
        if (args.length < 1) {
            msgObject.channel.send(`Sorry ${msgObject.author.username}, you need to mention someone to ban!`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                })
            return;
        }
        //if the mentioned user could not be found
        if (!mentionedUser) {
            msgObject.channel.send(`Sorry ${msgObject.author.username}, I couldn't find that user to kick them!`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                })
            return;
        }

        /* TO BE IMPLEMENTED:
        *KICK LOG IN CHANNEL
        *KICKING BY USERID
        if(args.slice(1).toString() === Discord.User.name){
            let kickUsername = args.slice(1);
            //let userId = Discord.GuildMember.id;
            msgObject.guild.member(mentionedUser.username).kick(kickLog)
            .then(console.log)
            .catch(console.error)
        } else{
 
            }
        }

       
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setColor("#bfd2f2")
        .addField("Kicked user ", `${mentionedUser} with ID ${mentionedUser.id}`)
        .addField("Kicked by ", `<@${msgObject.author.id}>`)
        .addField("Kicked in", msgObject.channel)
        .addField("Time ", msgObject.createdAt)
        .addField("Reason ", kickReason);

        msgObject.channel.send(kickEmbed);

        */

        msgObject.guild.member(mentionedUser).ban(banLog)
            .then(console.log)
            .catch(console.error)

    }


}