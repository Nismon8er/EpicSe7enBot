const Discord = require('discord.js');
const axios = require('axios');

function getNormalSummons(msg){
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
        var precision1 = 51.75;
        let b = (Math.random() * (51.75 * precision1 - 1 * precision1) + 1 * precision1) / (precision1);
        switch(true){
          case b < 0.15:  
              f = fiveStarMLContent[Math.floor(Math.random() * fiveStarMLContent.length)];
              star = f.fileId;
            break;
          case b < 0.50: 
              f = fourStarMLContent[Math.floor(Math.random() * fourStarMLContent.length)];
              star = f.fileId;
            break;
          case b < 1.25:
              f = fiveStarContent[Math.floor(Math.random() * fiveStarContent.length)];
              star = f.fileId;
            break;
          case b < 4.35:
              f = threeStarMLContent[Math.floor(Math.random() * threeStarMLContent.length)];
              star = f.fileId;
            break;
          case b < 4.50:
              f = fourStarContent[Math.floor(Math.random() * fourStarContent.length)];
              star = f.fileId;
            break;
          default:
             f = threeStarContent[Math.floor(Math.random() * threeStarContent.length)];
              star = f.fileId;        
        }
      }
      else{
        var precision2 = 48.25;
        var c = Math.floor(Math.random() * (48.25 * precision2 - 1 * precision2) + 1 * precision2) / (1*precision2);
        switch(true){
          case c < 1.75:
              f = fiveStarContent[Math.floor(Math.random() * fiveStarContent.length)];
              star = f.fileId;
            break;
          case c < 6.50:
                f = fourStarContent[Math.floor(Math.random() * fourStarContent.length)];
                star = f.fileId;
            break;
          default:
                f = threeStarContent[Math.floor(Math.random() * threeStarContent.length)];
                star = f.fileId;       
        }
      }
      var embed = new Discord.RichEmbed()
      embed.setTitle(star)
      embed.attachFile('https://assets.epicsevendb.com/'+ summonGenerate + '/' + star + '/full.png');
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

  module.exports = getNormalSummons;