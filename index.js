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
  .addField("Level 50 Full Star Awaken", "Stats")
  .addField("CP", data.lv50FiveStarFullyAwakened.cp, true)
  .addField("ATK", data.lv50FiveStarFullyAwakened.atk, true)
  .addField("HP", data.lv50FiveStarFullyAwakened.hp, true)
  .addField("SPD", data.lv50FiveStarFullyAwakened.spd, true)
  .addField("DEF", data.lv50FiveStarFullyAwakened.def, true)
  .addField("CHC", data.lv50FiveStarFullyAwakened.chc, true)
  .addField("CHD", data.lv50FiveStarFullyAwakened.chd, true)
  .addField("EFF", data.lv50FiveStarFullyAwakened.eff, true)
  .addField("EFR", data.lv50FiveStarFullyAwakened.efr, true)
  .addField("DAC", data.lv50FiveStarFullyAwakened.dac, true)
  .addField("Level 60 Full Star Awaken", "Stats")
  .addField("CP", data.lv60SixStarFullyAwakened.cp, true)
  .addField("ATK", data.lv60SixStarFullyAwakened.atk, true)
  .addField("HP", data.lv60SixStarFullyAwakened.hp, true)
  .addField("SPD", data.lv60SixStarFullyAwakened.spd, true)
  .addField("DEF", data.lv60SixStarFullyAwakened.def, true)
  .addField("CHC", data.lv60SixStarFullyAwakened.chc, true)
  .addField("CHD", data.lv60SixStarFullyAwakened.chd, true)
  .addField("EFF", data.lv60SixStarFullyAwakened.eff, true)
  .addField("EFR", data.lv60SixStarFullyAwakened.efr, true)
  .addField("DAC", data.lv60SixStarFullyAwakened.dac, true)
  .setColor(color)
  .attachFile('https://assets.epicsevendb.com/hero/' + hero + '/full.png');
  return embed;
}

bot.login(token);