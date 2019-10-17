const Discord = require('discord.js');
require('dotenv').config();
const bot = new Discord.Client();
const axios = require('axios');
const token = process.env.BOT_TOKEN;
const campingSim = require('./commands/campingSim');
const signs = require('./commands/signs');
const normalSummons = require('./commands/normalSummons');

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

  if("artifact" === command){
    axios.get('https://api.epicsevendb.com/api/artifact/' + name)
  .then(function (response) {
    // handle success
    var exclusive = response.data.results[0].exclusive[0];
    var dataBase = response.data.results[0].skillDescription.base;
    var dataMax = response.data.results[0].skillDescription.max;
    msg.channel.send(getArtifactStats(name, exclusive, dataBase, dataMax));
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

  if("summon" === command){
    normalSummons(msg);
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

function getArtifactStats(artifact, exclusive, base, max){
  switch (exclusive){
    case "mage":
      color = "BLUE";
      break;
    case "soul-weaver":
      color = "GREEN";
      break;
    case "knight":
      color = "DARK_BLUE";
      break;
    case "warrior":
      color = "RED";
      break;
    case "theif":
      color = "PURPLE";
      break;
    case "ranger":
      color = "DARK_GREEN";
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