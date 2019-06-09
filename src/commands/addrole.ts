import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class addrole implements IBotCommand {

    private readonly _command = "addrole";

    help(): string {

        return "This creates and adds a role to a user!";

    } isThisCommand(command: string): boolean {

        return command === this._command;

    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        //checks if user has perms to run this command
        if (!msgObject.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS") || !msgObject.member.hasPermission("ADMINISTRATOR")) {
            msgObject.channel.send(`Nice try ${msgObject.author.username}, you dummy you don't have permission to manage roles!!`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                })
            return;
        }
        //if user has perms, checks if user mentioned anyone
        let userRole = msgObject.mentions.members.first() || msgObject.guild.members.get(args[0]);
        if (!userRole) {
            let addRole = args.join(" ");
            let role = msgObject.guild.roles.find('name', addRole)
            if (role) {
                msgObject.reply(`the <@&${role.id}> already exists unable to create!`).then(msg => {
                    (msg as Discord.Message).delete(5000);
                })
                return;
            } else {
                try {
                    role = await msgObject.guild.createRole({
                        name: addRole.toString(),
                        permissions: []
                    })
                    msgObject.channel.send(`<@&${role.id}> has been created!`);
                } catch (e) {
                    console.log(e);
                }
            }
        } else {
            let addRole = args.join(" ").slice(22);
            let role = msgObject.guild.roles.find('name', addRole)
            if (role) {
                msgObject.guild.member(userRole).addRole(role);
                msgObject.reply(`the <@&${role.id}> already exists unable to create but it has been added to ${args[0]} !`);
                return;
            } else {
                try {
                    role = await msgObject.guild.createRole({
                        name: addRole.toString(),
                        permissions: []
                    })
                    msgObject.guild.member(userRole).addRole(role);
                    msgObject.channel.send(`<@&${role.id}> has been created and added to ${args[0]} !`);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
}