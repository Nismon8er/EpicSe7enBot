const Discord = require('discord.js');
require('dotenv').config();
const bot = new Discord.Client();
const axios = require('axios');
const token = process.env.BOT_TOKEN;
const campingSim = require('./commands/campingSim');
const signs = require('./commands/signs');

bot.on('ready', () =>{
	console.log('This bot is online');
})

bot.on('message', msg=>{
    var fullCommand = msg.content.split(' ');
    var command = fullCommand[0].slice(1);
    var name = fullCommand[1];
    var attribute = fullCommand[2] ? fullCommand[2] : '';
	if("hero" === command){
		axios.get('https://api.epicsevendb.com/api/hero/' + name)
  .then(function (response) {
    var fullData = response.data.results[0];
    var element = fullData.element;
    // handle success
    if("" === attribute){
      var fullStats = fullData.stats;
      msg.channel.send(getAllStats(name, element, fullStats));
    }else if("skill-materials" === attribute){
      var fullSkills = fullData.skills;
      msg.channel.send(getAllMaterials(name,element,fullSkills));
    }
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
    signs(name, msg);
  }
  if("camp" === command) {
    campingSim(msg);
  }
})

function getAllStats(hero, element, data){
  var color = getColorByElement(element);
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
  .addField("COMBAT POWER", data.lv60SixStarFullyAwakened.cp, true)
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
  .setThumbnail('https://assets.epicsevendb.com/hero/' + hero + '/icon.png');
  return embed;
}

function getAllMaterials(hero, element, data){
  var allMaterialsArray = new Object();
  for(var i = 0; i < 3; i++){
    var enhancementsArray = data[i].enhancement
    var numOfEnhancements = enhancementsArray.length;
    for(var j = 0; j < numOfEnhancements; j++){
      var resourceArray = data[i].enhancement[j].resources
      var numOfResources = resourceArray.length;
      for(var k = 0; k < numOfResources; k++){
        if(allMaterialsArray[data[i].enhancement[j].resources[k].item] === undefined){
          allMaterialsArray[data[i].enhancement[j].resources[k].item] = parseInt(data[i].enhancement[j].resources[k].qty);
        }else{
          allMaterialsArray[data[i].enhancement[j].resources[k].item] += parseInt(data[i].enhancement[j].resources[k].qty);
        }
        
      }
    }
  }
  // return allMaterialsArray;
  var color = getColorByElement(element)
  var embed = new Discord.RichEmbed()
  .setTitle("Total Matrials Needed For " + toTitleCase(hero) + "'s Full Skill Enhancement")
  .setColor(color);
  for(var key in allMaterialsArray){
    embed.addField(toTitleCase(key), allMaterialsArray[key]);
  }
  return embed;  
}

function getColorByElement(element){
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
  return color;
}

function toTitleCase(word) {
	word = word.toLowerCase().split('-');
	for (var i = 0; i < word.length; i++) {
		word[i] = word[i].charAt(0).toUpperCase() + word[i].slice(1);
	}
	return word.join('-');
};

bot.login(token);