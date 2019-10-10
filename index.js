const Discord = require('discord.js');
require('dotenv').config();
const bot = new Discord.Client();
const axios = require('axios');
const token = process.env.BOT_TOKEN;
const campingSim = require('./commands/campingSim');

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
  
  if("signs" === command) {
    getSigns(name, msg);
  }
  if("camp" === command) {
    campingSim(msg);
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

function getSigns(sign, msg) {
  let hero = "";
  switch (sign) {
    case "aries":
      hero = "cecilia";
      break;
    case "taurus":
      hero = "zeno";
      break;
    case "gemini":
      hero = "lots";
      break;
    case "cancer":
      hero = "doris";
      break;
    case "leo":
      hero = "kise";
      break;
    case "virgo":
      hero = "rin";
      break;
    case "libra":
      hero = "rose";
      break;
    case "scorpio":
      hero = "coli";
      break;
    case "sagittarius":
      hero = "chloe";
      break;
    case "capicorn":
      hero = "ken";
      break;
    case "aquarius":
      hero = "basar";
      break;
    case "pisces":
      hero = "elson";
      break;
    default:
      hero = "";
  }

  if(hero === "") {
    msg.channel.send("The zodiac sign was either incorrect or was not inputted. Please try again.");
  }
  else {
    axios.get('https://api.epicsevendb.com/api/hero/' + hero)
    .then(function (response) {
      var results = response.data.results[0].awakening;
  
      var embed = new Discord.RichEmbed().setTitle("Zodiac Sign: " + sign);
      let stars = "";
  
      results.forEach((element, i) => {
        let key = Object.keys(element.statsIncrease[0]);
        let stat = " " + ((key != "spd") ? element.statsIncrease[0][key] * 100 + "%" : element.statsIncrease[0][key]);
        stars += String.fromCharCode(9733);
  
        if(i === 2) {
          key = ""
          stat = "Skill Upgrade";
        }
        if(i === 3) {
          embed.addBlankField();
        }
  
        embed.addField(stars, key.toString().toUpperCase() + stat, true);
      });
  
      msg.channel.send(embed);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      msg.channel.send("There was an error trying to execute that command!");
    })
    .finally(function () {
      // always executed
    });
  }
}

bot.login(token);