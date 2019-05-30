import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import { IBotCommand } from "./api";

const discBot: Discord.Client = new Discord.Client();

let commands : IBotCommand[] = [];

loadCommands(`${__dirname}/commands`);

discBot.on("ready", () => {
    //lets us know the bot is online
    console.log("Ready to go");
})

discBot.on("message", msg => {
    //ignore the message if it was sent by the bot
    if(msg.author.bot){return;}

    //ignore messages that don't start with the prefix
    if(!msg.content.startsWith(ConfigFile.config.prefix)){return;}

    commandHandler(msg);
})

async function commandHandler(msg: Discord.Message){

    //Split the string into the command and all of the args
    let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "");
    let args = msg.content.split(" ").slice(1);

    for(const commandsClass of commands){

        //attempt to execute code 
        try{
            
            //Iterates through the command array and checks if the command class is the correct one
            if(!commandsClass.isThisCommand(command)){
                //Go to the next iteration of the loop if this isn't the correct command class
                continue;
            }
            //Pause execution while we run command's code
            await commandsClass.runCommand(args, msg,discBot);
        }
        catch (exception){
            //if there is an error, logs the exception
            console.log(exception);
        }
    }
}

function loadCommands(commandsPath: string){
    //Exit if there are no commands
    if(!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0){ return; }

    //Loop through command array 
    for(const commandName of ConfigFile.config.commands as string[]){

        const commandsClass = require(`${commandsPath}/${commandName}`).default;

        const command = new commandsClass() as IBotCommand;

        commands.push(command);
    }
}

discBot.login(ConfigFile.config.token);