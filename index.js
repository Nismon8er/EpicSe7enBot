const Discord = require('discord.js');
require('dotenv').config();
const bot = new Discord.Client();
const axios = require('axios');
const token = process.env.BOT_TOKEN;

bot.on('ready', () =>{
	console.log('This bot is online');
})

bot.on('message', msg=>{
    var fullCommand = msg.content.split(' ');
    var command = fullCommand[0].slice(1);
    var name = fullCommand[1];
    var attribute = fullCommand[2];
	if("hero" === command){
		axios.get('https://api.epicsevendb.com/api/hero/' + name)
  .then(function (response) {
    // handle success
    var fullData = response.data.results[0];
    var fullStats = attribute === 'stats' ? fullData.stats : '';
    var element = fullData.element;
    msg.channel.send(getAllStats(name, element, fullStats));
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
	}
})

function getAllStats(hero, element, data){
  var color = "RANDOM";
  switch (element){
    case "fire":
      color = "RED";
      break;
    case "ice":
      color = "BLUE";
      break;
    case "earth":
      color = "GREEN";
      break;
    case "light":
      color = "GOLD";
      break;
    case "dark":
      color = "PURPLE";
      break;
    default:
      color = "RANDOM";
  }
  var embed = new Discord.RichEmbed()
  .addField("Level 1 No Star Awaken", "Stats")
  .addField("COMBAT POWER", data.lv1BaseStarNoAwaken.cp, true)
  .addField("ATTACK", data.lv1BaseStarNoAwaken.atk, true)
  .addField("HP", data.lv1BaseStarNoAwaken.hp, true)
  .addField("SPEED", data.lv1BaseStarNoAwaken.spd, true)
  .addField("DEFENSE", data.lv1BaseStarNoAwaken.def, true)
  .addField("CRIT CHANCE", data.lv1BaseStarNoAwaken.chc, true)
  .addField("CRIT DAMAGE", data.lv1BaseStarNoAwaken.chd, true)
  .addField("EFFECTIVENESS", data.lv1BaseStarNoAwaken.eff, true)
  .addField("EFFECT RESISTANCE", data.lv1BaseStarNoAwaken.efr, true)
  .addField("DUAL ATTACK CHANCE", data.lv1BaseStarNoAwaken.dac, true)
  .addBlankField()
  .addField("Level 60 Full Star Awaken", "Stats")
  .addField("CP", data.lv60SixStarFullyAwakened.cp, true)
  .addField("ATTACK", data.lv60SixStarFullyAwakened.atk, true)
  .addField("HP", data.lv60SixStarFullyAwakened.hp, true)
  .addField("SPEED", data.lv60SixStarFullyAwakened.spd, true)
  .addField("DEFENSE", data.lv60SixStarFullyAwakened.def, true)
  .addField("CRIT CHANCE", data.lv60SixStarFullyAwakened.chc, true)
  .addField("CRIT DAMAGE", data.lv60SixStarFullyAwakened.chd, true)
  .addField("EFFECTIVENESS", data.lv60SixStarFullyAwakened.eff, true)
  .addField("EFFECT RESISTANCE", data.lv60SixStarFullyAwakened.efr, true)
  .addField("DUAL ATTACK CHANCE", data.lv60SixStarFullyAwakened.dac, true)
  .setColor(color)
  .attachFile('https://assets.epicsevendb.com/hero/' + hero + '/full.png');
  return embed;
}

bot.login(token);