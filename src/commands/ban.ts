import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class ban implements IBotCommand{

    private readonly _command = "ban";

    help(): string {

        return "Bans the mentioned user";

    }    isThisCommand(command: string): boolean {

        return command === this._command;

    }
    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {


        let mentionedUser = msgObject.mentions.users.first();
        let banReason = args.slice(1).join(" ") || "";
        let banLog = `${msgObject.author.username}:${banReason}`;
        let username = mentionedUser.username;

        msgObject.delete(0);

         //if a user without permissions attempts to kick
         if(!msgObject.member.hasPermission("BAN_MEMBERS") || !msgObject.member.hasPermission("ADMINISTRATOR")){
            msgObject.channel.send(`Nice try ${msgObject.author.username}, you retard you don't have permission to ban!`);
            return;

        } else if(msgObject.guild.owner.user === mentionedUser){

            msgObject.channel.send(`Nice try ${msgObject.author.username}, you retard you can't ban the owner!`);
            return;

        }
         //If user just does ~kick without mentioning a user
        if(args.length < 1){
            msgObject.channel.send(`Sorry ${msgObject.author.username}, you need to mention someone to ban!`);
            return;
        }
        //if the mentioned user could not be found
        if(!mentionedUser){
            msgObject.channel.send(`Sorry ${msgObject.author.username}, I couldn't find that user to ban them!`);
            return;
        }
 /*
        let banEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setColor("#ed768a")
        .addField("Kicked user ", `${mentionedUser} with ID ${mentionedUser.id}`)
        .addField("Kicked by ", `<@${msgObject.author.id}>`)
        .addField("Kicked in", msgObject.channel)
        .addField("Time ", msgObject.createdAt)
        .addField("Reason ", banReason);
        msgObject.channel.send(banEmbed);
*/
        msgObject.guild.member(mentionedUser).ban(banLog)
        .then(console.log)
        .catch(console.error)

    }


}