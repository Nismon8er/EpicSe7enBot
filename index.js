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
  var parsedMessage = parseMessage(msg.content);
  var fullCommand = parsedMessage;
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

function parseMessage(message){
  return message.split(' ');
}

function getAllStats(hero, element, data){
  var color = getColorByElement(element);
  var embed = new Discord.RichEmbed()
  .addField("Level 60 Full Star Awaken", "Stats")
  .addField("COMBAT POWER", data.lv60SixStarFullyAwakened.cp, true)
  .addField("ATTACK", data.lv60SixStarFullyAwakened.atk, true)
  .addField("HP", data.lv60SixStarFullyAwakened.hp, true)
  .addField("SPEED", data.lv60SixStarFullyAwakened.spd, true)
  .addField("DEFENSE", data.lv60SixStarFullyAwakened.def, true)
  .addField("CRIT CHANCE", decimalToPercent(data.lv60SixStarFullyAwakened.chc), true)
  .addField("CRIT DAMAGE", decimalToPercent(data.lv60SixStarFullyAwakened.chd), true)
  .addField("EFFECTIVENESS", decimalToPercent(data.lv60SixStarFullyAwakened.eff), true)
  .addField("EFFECT RESISTANCE", decimalToPercent(data.lv60SixStarFullyAwakened.efr), true)
  .addField("DUAL ATTACK CHANCE", decimalToPercent(data.lv60SixStarFullyAwakened.dac), true)
  .setColor(color)
  .setThumbnail('https://assets.epicsevendb.com/hero/' + hero + '/icon.png');
  return embed;
}

function getAllMaterials(hero, element, data){
  var allMaterialsArray = new Object();
  for(var i = 0; i < data.length; i++){
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
  var color = getColorByElement(element)
  var embed = new Discord.RichEmbed()
  .setTitle("Total Materials Needed For " + toTitleCase(hero) + "'s Full Skill Enhancement")
  .setThumbnail("https://assets.epicsevendb.com/attribute/cm_icon_pro" + element + ".png")
  .setColor(color);
  for(var key in allMaterialsArray){
    embed.addField(toTitleCase(key), allMaterialsArray[key], true);
  }
  return embed;  
}

function getColorByElement(element){
  switch (element){
    case "fire":
      return color = "RED";
    case "ice":
      return color = "BLUE";
    case "earth":
      return color = "GREEN";
    case "light":
      return color = "GOLD";
    case "dark":
      return color = "PURPLE";
    default:
      return color = "RANDOM";
  }
}

function toTitleCase(word) {
	word = word.toLowerCase().split('-');
	for (var i = 0; i < word.length; i++) {
		word[i] = word[i].charAt(0).toUpperCase() + word[i].slice(1);
	}
	return word.join('-');
};

function getHelpCommandsList(){
  var embed = new Discord.RichEmbed()
  .setTitle("List of possible commands")
  .setColor("RANDOM")
  .addField("Command Prefix", "?")
  .addField("Possible Command Type", "hero, artifact, item")
  .addField("Hero Commands", "skill-materials")
  .addField("Example", "?hero ken skill-materials");
  return embed;  
}

function decimalToPercent(num){
  return (num * 100) + '%';
}

bot.login(token);