import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class kick implements IBotCommand{

    private readonly _command = "kick";

    help(): string {

        return "Kicks the mentioned user";

    }    isThisCommand(command: string): boolean {

        return command === this._command;

    }
    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {


        let mentionedUser = msgObject.mentions.users.first();
        let kickReason = args.slice(1).join(" ") || "";
        let kickLog = `${msgObject.author.username}:${kickReason}`;
        let username = mentionedUser.username;

        msgObject.delete(0);

       

        //If user just does ~kick without mentioning a user
        if(args.length < 1){
            msgObject.channel.send(`Sorry ${msgObject.author.username}, you need to mention someone to kick!`);
            return;
        }
        //if the mentioned user could not be found
        if(!mentionedUser){
            msgObject.channel.send(`Sorry ${msgObject.author.username}, I couldn't find that user to kick them!`);
            return;
        }

        //if a user without permissions attempts to kick
        if(!msgObject.member.hasPermission("KICK_MEMBERS") || !msgObject.member.hasPermission("ADMINISTRATOR")){
            msgObject.channel.send(`Nice try ${msgObject.author.username}, you retard you don't have permission to kick!`);
            return;

        } else if(msgObject.guild.owner.user === mentionedUser){

            msgObject.channel.send(`Nice try ${msgObject.author.username}, you retard you can't kick the owner!`);
            return;

        }
      
        

      

        msgObject.guild.member(mentionedUser).kick(kickLog)
        .then(console.log)
        .catch(console.error)

    }


}