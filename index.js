const Discord = require('discord.js');
require('dotenv').config();
const bot = new Discord.Client();
const axios = require('axios');
<<<<<<< HEAD
const token = process.env.TOKEN;
=======
const token = process.env.BOT_TOKEN;
>>>>>>> f9e52384f5b79fb2396d0ccb73dcf3ae6210bab6

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
<<<<<<< HEAD
  }

  if("artifact" === command){
    axios.get('https://api.epicsevendb.com/api/artifact/' + name)
  .then(function (response) {
    // handle success
    var fullData = response.data.results[0];
    var dataBase = response.data.results[0].skillDescription.base;
    var dataMax = response.data.results[0].skillDescription.max;
    var fullSkill = attribute === 'skillDescription' ? fullData.skillDescription : '';
    var exclusive = fullData.exclusive;
    console.log(fullData);
    msg.channel.send(getArtifactStats(name, exclusive, fullSkill, dataBase, dataMax));
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
  }
=======
	}
>>>>>>> f9e52384f5b79fb2396d0ccb73dcf3ae6210bab6
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
<<<<<<< HEAD
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
=======
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
>>>>>>> f9e52384f5b79fb2396d0ccb73dcf3ae6210bab6
  .setColor(color)
  .attachFile('https://assets.epicsevendb.com/hero/' + hero + '/full.png');
  return embed;
}
<<<<<<< HEAD


function getArtifactStats(artifact, exclusive, data, base, max){
  var color = "RANDOM";
  switch (exclusive){
    case "mage":
      color = "BLUE";
      break;
    case "soul-weaver":
      color = "BLUE";
      break;
    case "knight":
      color = "GREEN";
      break;
    case "warrior":
      color = "GOLD";
      break;
    case "theif":
      color = "PURPLE";
      break;
    case "ranger":
      color = "GREEN";
      break;
    case "common":
      color = "ORANGE";
      break;
    default:
      color = "RANDOM";
  }
  var embed = new Discord.RichEmbed()
  .addField("Base", "Stats")
  .addField("Decription",base, true)
  .addField("Max", "Stats")
  .addField("Decription",max, true)
  .setColor(color)
  .attachFile('https://assets.epicsevendb.com/artifact/' + artifact + '/full.png');
  return embed;
}
=======
>>>>>>> f9e52384f5b79fb2396d0ccb73dcf3ae6210bab6

bot.login(token);