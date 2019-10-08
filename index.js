const Discord = require('discord.js');
require('dotenv').config();
const bot = new Discord.Client();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const axios = require('axios');
const token = process.env.BOT_TOKEN;

bot.on('ready', () =>{
	console.log('This bot is online');
})

bot.on('message', msg=>{
    var fullCommand = msg.content;
    var command = fullCommand.substr(0,fullCommand.indexOf(' '));
    var name = fullCommand.substr(fullCommand.indexOf(' ') + 1, fullCommand.indexOf(' ') + 1);
	if("?hero" === command){
		axios.get('https://api.epicsevendb.com/api/hero/kayron')
  .then(function (response) {
    // handle success
    msg.reply(fullCommand);
    msg.reply(command);
    msg.reply(name);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
		msg.reply('Sup kim chi')
	}
})



bot.login(token);