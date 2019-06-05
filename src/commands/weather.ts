import * as Discord from "discord.js";
import { IBotCommand } from "../api";
const weath = require('weather-js');



export default class weather implements IBotCommand {

    private readonly _command = "weather";


    help(): string {

        return "This command returns the weather of a location supplied by the user";

    } isThisCommand(command: string): boolean {

        return command === this._command;

    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        if (args.length < 1) {
            msgObject.reply("please enter a location");
            return;
        }
        weath.find({ search: args.join(" "), degreeType: 'F' }, function (err, result) {
            if (err) {
                console.log(err)
            }
            if (result.length === 0 || result === undefined) {
                msgObject.reply("please enter a valid location!")
                return;
            }
            var current = result[0].current;
            var location = result[0].location;

           //rounding the converted numbers to the nearest whole number for easier display 
            let kmConvert = parseInt(current.winddisplay) * 1.6093440;
            kmConvert = Math.round(kmConvert);
            let curTemp = (current.temperature-32)/1.8;
            curTemp = Math.round(curTemp)
            let feelTemp = (current.feelslike-32)/1.8;
            feelTemp= Math.round(feelTemp); 

            let weathEmbed = new Discord.RichEmbed()
                .setTitle("**Weather**")
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageURL)
                .setColor('RANDOM')
                .addField('Timezone', `UTC-${location.timezone}` )
                .addField("Temperature", `${current.temperature} Degrees F° / ${curTemp } Degrees C°` )
                .addField("Feels like", `${current.feelslike} Degrees F° / ${feelTemp} Degrees C°`)
                .addField("Winds", `${kmConvert} kph / ${current.winddisplay}`, true)
                .addField("Humidity", `${current.humidity}%`)
                .setTimestamp()

            msgObject.channel.send(weathEmbed)
                .catch(console.log)
        })
    }

}

