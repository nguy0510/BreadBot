import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class role implements IBotCommand {

    private readonly _command = "role";

    help(): string {

        return "This command adds or removes a role from a user!!";

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
            msgObject.reply("can't find that user, mention someone to give or take a role!").then(msg => {
                (msg as Discord.Message).delete(5000);
            })
            return;
        }

        //if a user is mentioned then checks if the user named a role to add
        let roleToAdd = args.join(" ").slice(22);
        if (!roleToAdd) {
            msgObject.reply("specify a role to add!").then(msg => {
                (msg as Discord.Message).delete(5000);
            })
            return;
        }
        //checks the server list of roles for the supplied role
        let role = msgObject.guild.roles.find('name', roleToAdd)
        if (!role) {
            msgObject.reply(`that role doesn't exist, ${roleToAdd} !`);
            return;
        }
        if (msgObject.guild.member(userRole).roles.has(role.id)) {
            msgObject.guild.member(userRole).removeRole(role);
            msgObject.channel.send(`<@&${role.id}> has been removed from ${args[0]}!`)
            return;
        } else {
            msgObject.guild.member(userRole).addRole(role);
            msgObject.channel.send(`<@&${role.id}> has been added to ${args[0]}!`)
            return;
        }
    }
}