import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import setLog from "./setLog";

export default class kick implements IBotCommand{

    private readonly _command = "kick";
    logSetup :setLog = new setLog();
   

    help(): string {

        return "Kicks the mentioned user";

    }    isThisCommand(command: string): boolean {

        return command === this._command;

    }
    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {


        let mentionedUser = msgObject.mentions.users.first();
        let kickReason = args.slice(1).join(" ") || "";
        let kickLog = `${msgObject.author.username}:${kickReason}`;
        /*******************
        TO BE WORKED ON
        let username = mentionedUser.username;
        let lChannel = msgObject.guild.channels.find(`name`, this.logSetup._logChannel);
        */

        msgObject.delete(0);

                //if a user without permissions attempts to kick
        if(!msgObject.member.hasPermission("KICK_MEMBERS") || !msgObject.member.hasPermission("ADMINISTRATOR")){
            msgObject.channel.send(`Nice try ${msgObject.author.username}, you retard you don't have permission to kick!`);
            return;

        } else if(msgObject.guild.owner.user === mentionedUser){

            msgObject.channel.send(`Nice try ${msgObject.author.username}, you retard you can't kick the owner!`);
            return;

        }
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

        /*
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

        msgObject.guild.member(mentionedUser).kick(kickLog)
        .then(console.log)
        .catch(console.error)

    }


}