const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
const config = require('./config')
$prefix = "+"


bot.commands = new Discord.Collection()
bot.color = '#ffffff';
bot.colorModeration =  '#FF0000';
bot.colorInformation = '#0097FF';
bot.colorUtile = '4D00FF';
bot.function = {
    createId: require("./Fonctions/createID"),
}

bot.login(config.token)
loadCommands(bot)
loadEvents(bot)


