import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import ytdl = require("ytdl-core");

export default class play implements IBotCommand {

    private readonly _command = "play";

    help(): string {

        return "This command makes the bot join the voice channel and plays music, or resumes playing music if paused or stopped.";

    } isThisCommand(command: string): boolean {

        return command === this._command;

    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client):  Promise<void> {

        const voiceChannel = msgObject.member.voiceChannel;
        const musicArgs = msgObject.content.split(" ");
        if (!voiceChannel) {
            msgObject.reply("you need to be in a voice channel to play music!");
        }
        if (musicArgs.length < 1) {
            msgObject.channel.send("stuck here");
            if (voiceChannel && voiceChannel.type == 'voice') {

                try {
                    voiceChannel.join();

                }
                catch (e) {
                    console.log(e);
                    msgObject.reply("Unable to join channel!");
                }
            }
        }

    }


}