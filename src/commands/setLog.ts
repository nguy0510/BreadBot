import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class setlog implements IBotCommand {

    private readonly _command = "setlog";
    readonly _logChannel: string | undefined;

    help(): string {

        return "This command sets the log channel!";

    } isThisCommand(command: string): boolean {

        return command === this._command;

    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        const newUsers = [];

        if (!msgObject.member.hasPermission("ADMINISTRATOR")) {
            msgObject.channel.send(`Nice try ${msgObject.author.username}, you dummy you don't have permission to set the channel!`);
            return;
        }
        if (args.length < 1) {
            msgObject.channel.send(`Sorry ${msgObject.author.username}, you need to specify a channel for logs!`);
            return;
        }
        let channel = args.join(" ");
        let logChannel = msgObject.guild.channels.find('name', channel);
        if (!logChannel) {
            msgObject.channel.send(`The channel ${channel} does not exist, creating now`);
            try {
                logChannel = await msgObject.guild.createChannel(channel, {
                    type: 'text',
                    permissionOverwrites: [{
                        id: msgObject.guild.id,
                        deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES', 'READ_MESSAGES', 'VIEW_CHANNEL', 'MENTION_EVERYONE', 'MANAGE_ROLES_OR_PERMISSIONS'],
                        allow: []
                    }]
                })
                msgObject.channel.send(`${logChannel} has been created!`)
            } catch (e) {
                console.log(e);
            }
        }
        client.on('guildMemberAdd', (member) => {
            let logChannelID = logChannel.id;
            let loggChannel = msgObject.guild.channels.get(logChannelID)
            const guild = member.guild;
            if (!newUsers[guild.id])
                newUsers[guild.id] = new Discord.Collection();
            newUsers[guild.id].set(member.id, member.user);
            msgObject.channel.send(logChannelID);
        })
    }
}