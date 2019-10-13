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
    getSigns(name, msg);
  }
  if("camp" === command) {
    campingSim(msg);
  }

  if("summonNormal" === command){
    getNormalSummon(name, msg);
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

  function getNormalSummon(nSummon, msg){
  var limited = [
      { "name": "Baiken" },
      { "name": "Diene" },
      { "name": "Dizzy" },
      { "name": "Kikirat v2" },
      { "name": "Luna" },
      { "name": "Nilgal" },
      { "name": "Sol" },
      { "name": "Seaside Bellona" },
      { "name": "Serila" },
      { "name": "Zeno" },
      { "name": "Mega-Phantasma" },
      { "name": "Giga-Phantasma" },
      { "name": "Tera-Phantasma" },
      { "name": "Ras" },
      { "name": "Mercedes" },
      { "name": "Yuna" }
    ]
  var limitedArtifact = [
      { "name": "Tear of the Desert" },
      { "name": "Iela Violin" },
      { "name": "Shepherds of Chaos" },
      { "name": "Santa Muerte" },
      { "name": "Rainbow Scale" },
      { "name": "Radiant Forever" },
      { "name": "Portrait of the Saviors" },
      { "name": "Torn Sleeve" },
      { "name": "One Year of Gratitude" },
      { "name": "Necro & Undine" },
      { "name": "Midnight Bloom" },
      { "name": "Crimson Seed" },
      { "name": "Card of Small Miracles" },
      { "name": "Ambrote" },
      { "name": "Sword of Ezera" },
      { "name": "Reingar's Special Drink" },
      { "name": "Proof of Valor" },
      { "name": "Otherworldly Machinery" },
      { "name": "Junkyard Dog" },
      { "name": "Chatty" },
      { "name": "Love Potion" }
    ]
  
  var sc = [
      { "name": "Chaos Inquisitor" },
      { "name": "Falconer Kluri" },
      { "name": "Righteous Thief Roozid" },
      { "name": "Chaos Sect Axe" },
      { "name": "Captain Rikoris" },
      { "name": "Commander Lorina" },
      { "name": "Mascot Hazel" },
      { "name": "Angelic Montmorancy" },
      { "name": "Researcher Carrot" }
    ]
  let summonGenerate = '';
  var precision = 100;
  var a = (Math.random() * (100 * precision - 1 * precision) + 1 * precision) / (1*precision);
  if(a > 0 && a < 48.25){
    summonGenerate = 'artifact';
  }
  else{
    summonGenerate = 'hero';
  }
  axios.get('https://api.epicsevendb.com/api/' + summonGenerate)
  .then(function (response) {
    // handle success
    var content = response.data.results;
    const fiveStarContent = [];
    const fourStarContent = [];
    const threeStarContent = [];
    const fiveStarMLContent = [];
    const fourStarMLContent = [];
    const threeStarMLContent = [];

    for( var i=content.length - 1; i>=0; i--){
      for( var j=0; j<limited.length; j++){
          if(content[i] && (content[i].name === limited[j].name)){
           content.splice(i, 1);
         }
       }
   }
    for( var i=content.length - 1; i>=0; i--){
      for( var j=0; j<limitedArtifact.length; j++){
          if(content[i] && (content[i].name === limitedArtifact[j].name)){
          content.splice(i, 1);
        }
      }
    }
      for( var i=content.length - 1; i>=0; i--){
        for( var j=0; j<sc.length; j++){
            if(content[i] && (content[i].name === sc[j].name)){
            content.splice(i, 1);
          }
        }
    }

    content.forEach(function(z){
      if(z.rarity == 5 && z.element !== 'dark' && z.element !== 'light'){
        fiveStarContent.push(z);
      }
      else if(z.rarity == 4 && z.element !== 'dark' && z.element !== 'light'){
        fourStarContent.push(z);
      }
      else if(z.rarity == 3 && z.element !== 'dark' && z.element !== 'light'){
        threeStarContent.push(z);
      }
    });
    content.forEach(function(x){
      if(x.rarity == 5 && x.element == 'dark' || x.rarity == 5 && x.element == 'light'){
        fiveStarMLContent.push(x);
      }
      else if(x.rarity == 4 && x.element == 'dark' || x.rarity == 4 && x.element == 'light'){
        fourStarMLContent.push(x);
      }
      else if(x.rarity == 3 && x.element == 'dark' || x.rarity == 3 && x.element == 'light'){
        threeStarMLContent.push(x);
      }
    });
  
    let star = '';
    let f = [];
    if(summonGenerate == 'hero'){
      var precision1 = 100;
      let b = (Math.random() * (51.75 * precision1 - 1 * precision1) + 1 * precision1) / (precision1);
      console.log(b + " hero summon");
      switch(true){
        case b < 0.15:  
            f = fiveStarMLContent[Math.floor(Math.random() * fiveStarMLContent.length)];
            star = f.fileId;
          console.log("5 star ml");
          break;
        case b < 0.50: 
            f = fourStarMLContent[Math.floor(Math.random() * fourStarMLContent.length)];
            star = f.fileId;
          console.log("4 star ml");
          break;
        case b < 1.25:
            f = fiveStarContent[Math.floor(Math.random() * fiveStarContent.length)];
            star = f.fileId;
          console.log("5 star");
          break;
        case b < 4.35:
            f = threeStarMLContent[Math.floor(Math.random() * threeStarMLContent.length)];
            star = f.fileId;
          console.log("3 star ml");
          break;
        case b < 4.50:
            f = fourStarContent[Math.floor(Math.random() * fourStarContent.length)];
            star = f.fileId;
          console.log("4 star");
          break;
        default:
           f = threeStarContent[Math.floor(Math.random() * threeStarContent.length)];
            star = f.fileId;
            console.log("3 star")        
      }
    }
    else{
      var precision2 = 100;
      var c = Math.floor(Math.random() * (48.25 * precision2 - 1 * precision2) + 1 * precision2) / (1*precision2);
      console.log(c + " artifact");
      switch(true){
        case c < 1.75:
            f = fiveStarContent[Math.floor(Math.random() * fiveStarContent.length)];
            star = f.fileId;
          console.log("5 star artifact");
          break;
        case c < 6.50:
              f = fourStarContent[Math.floor(Math.random() * fourStarContent.length)];
              star = f.fileId;
          console.log("4 star artifact");
          break;
        default:
              f = threeStarContent[Math.floor(Math.random() * threeStarContent.length)];
              star = f.fileId;
            console.log("3 star artifact")        
      }
    }
    var embed = new Discord.RichEmbed()
    embed.setTitle(star)
    embed.attachFile('https://assets.epicsevendb.com/'+ summonGenerate + '/' + star + '/full.png');
    console.log(star);
    msg.channel.send(embed);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
  //console.log(axios.response);
}

bot.login(token);