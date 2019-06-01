import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import ms = require("ms");

export default class mute implements IBotCommand{

    private readonly _command = "mute";

    help(): string {

        return "This command mutes a mentioned user";

    }    isThisCommand(command: string): boolean {

        return command === this._command;

    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        if(!msgObject.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")||!msgObject.member.hasPermission("ADMINISTRATOR")){
            msgObject.channel.send(`Nice try ${msgObject.author.username}, you retard you don't have permission to manage roles!!`);
            return;
        }else{
            let muteReason = args.slice(2).join(' ');
            let muteUser = msgObject.mentions.members.first();
            let muteRole = msgObject.guild.roles.find('name','Muted');
            let muteTime = args.slice(1).toString();
            if(!muteRole){
                try{
                    muteRole = await msgObject.guild.createRole({
                    name: "Muted",
                    color: "#eaf945",
                    permissions:[]
                  })
                  msgObject.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muteRole, {
                      SEND_MESSAGES: false,
                      ADD_REACTIONS: false
                    });
                  });
                }catch(e){
                  console.log(e);
                }
              }
            if(msgObject.guild.member(muteUser).roles.has(muteRole.id)){
                msgObject.guild.member(muteUser).removeRole(muteRole);
                msgObject.channel.send(`<@${muteUser.id}> has been unmuted!`);
                return;
            }
            if(muteTime){            
                    if( muteTime > "7d"){
                        msgObject.reply("Cannot mute for longer than 7 days!");
                        return;
                    }
                    if(!muteReason){
                        msgObject.channel.send(`<@${muteUser.id}> has been muted for ${ms(ms(muteTime))}`);
                        msgObject.guild.member(muteUser).addRole(muteRole);
                    }else{
                        msgObject.channel.send(`<@${muteUser.id}> has been muted for ${ms(ms(muteTime))} for ${muteReason}`);
                        msgObject.guild.member(muteUser).addRole(muteRole);
                        setTimeout(function(){
                            muteUser.removeRole(muteRole.id);
                            msgObject.channel.send(`<@${muteUser.id}> has been unmuted!`);
                          }, ms(muteTime));  
                    }
            
            }else{
                if(!muteReason){

                    msgObject.channel.send(`No mute time declared, <@${muteUser.id}> has been muted indefinitely`);
                    msgObject.guild.member(muteUser).addRole(muteRole);
                }else{
                msgObject.channel.send(`No mute time declared, <@${muteUser.id}> has been muted indefinitely for ${muteReason}`);
                msgObject.guild.member(muteUser).addRole(muteRole);
                }
            }
        } 
    }
}
