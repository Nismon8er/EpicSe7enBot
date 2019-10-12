const Discord = require('discord.js');
const axios = require('axios');

//TODO: Add zodiac sign thumbnails
function getSigns(sign, msg) {
    let hero = "";
    let image = "";
    let color = "";
    switch (sign.toLowerCase()) {
      case "aries":
        hero = "cecilia";
        image = "1_aries.png";
        color = "#FF0000";
        break;
      case "taurus":
        hero = "zeno";
        image = "2_taurus.png";
        color = "#008000";
        break;
      case "gemini":
        hero = "lots";
        image = "3_gemini.png";
        color = "#FFFF00";
        break;
      case "cancer":
        hero = "doris";
        image = "4_cancer.png";
        color = "#C0C0C0";
        break;
      case "leo":
        hero = "kise";
        image = "5_leo.png";
        color = "#FFD700";
        break;
      case "virgo":
        hero = "rin";
        image = "6_virgo.png";
        color = "#556B2F";
        break;
      case "libra":
        hero = "rose";
        image = "7_libra.png";
        color = "#cc66ff";
        break;
      case "scorpio":
        hero = "coli";
        image = "8_scorpio.png";
        color = "#000000";
        break;
      case "sagittarius":
        hero = "chloe";
        image = "9_sagittarius.png";
        color = "#6600cc";
        break;
      case "capicorn":
        hero = "ken";
        image = "10_capicorn.png";
        color = "#663300";
        break;
      case "aquarius":
        hero = "basar";
        image = "11_aquarius.png";
        color = "#0000ff";
        break;
      case "pisces":
        hero = "elson";
        image = "12_pisces.png";
        color = "#00ff00";
        break;
      default:
        hero = "";
        image = "";
        color = "";
    }
  
    if(hero === "") {
      msg.channel.send("The zodiac sign was either incorrect or was not inputted. Please try again.");
    }
    else {
      axios.get('https://api.epicsevendb.com/api/hero/' + hero)
      .then(function (response) {
        let results = response.data.results[0].awakening;
    
        let embed = new Discord.RichEmbed().setTitle("Zodiac Sign: " + sign).setColor(color).setThumbnail("https://assets.epicsevendb.com/zodiac-sign/" + image);
        let stars = "";
    
        results.forEach((element, i) => {
          let key = Object.keys(element.statsIncrease[0]);
          let stat = " " + ((key != "spd") ? element.statsIncrease[0][key] * 100 + "%" : element.statsIncrease[0][key]);
          stars += String.fromCharCode(9733);
    
          if(i === 2) {
            key = ""
            stat = "Skill Upgrade";
          }
    
          embed.addField(stars, key.toString().toUpperCase() + stat, true);
        });
    
        msg.channel.send(embed);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        msg.channel.send("There was an error trying to execute that command!");
      });
    }
  }

  module.exports = getSigns;