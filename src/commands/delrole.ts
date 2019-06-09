import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class delrole implements IBotCommand {

    private readonly _command = "delrole";

    help(): string {

        return "This command deletes a role from the server!";

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

        let delRole = args.join(" ");
        let role = msgObject.guild.roles.find('name', delRole);

        if (!role) {
            msgObject.reply(" the role does not exist!").then(msg => {
                (msg as Discord.Message).delete(5000);
            })
        }
        if (role) { 
            msgObject.channel.send(`<@&${role.id}> has been deleted!`);
            role.delete(role.id);
        }
    }
}