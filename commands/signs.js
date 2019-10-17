const Discord = require('discord.js');
const axios = require('axios');

//TODO: Add zodiac sign thumbnails
function getSigns(sign, msg) {
    let hero = "";
    let image = "";
    switch (sign) {
      case "aries":
        hero = "cecilia";
        image = "1_aries.png";
        break;
      case "taurus":
        hero = "zeno";
        image = "2_taurus.png";
        break;
      case "gemini":
        hero = "lots";
        image = "3_gemini.png";
        break;
      case "cancer":
        hero = "doris";
        image = "4_cancer.png";
        break;
      case "leo":
        hero = "kise";
        image = "5_leo.png";
        break;
      case "virgo":
        hero = "rin";
        image = "6_virgo.png";
        break;
      case "libra":
        hero = "rose";
        image = "7_libra.png";
        break;
      case "scorpio":
        hero = "coli";
        image = "8_scorpio.png";
        break;
      case "sagittarius":
        hero = "chloe";
        image = "9_sagittarius.png";
        break;
      case "capicorn":
        hero = "ken";
        image = "10_capicorn.png";
        break;
      case "aquarius":
        hero = "basar";
        image = "11_aquarius.png";
        break;
      case "pisces":
        hero = "elson";
        image = "12_pisces.png";
        break;
      default:
        hero = "";
        image = "";
    }
  
    if(hero === "") {
      msg.channel.send("The zodiac sign was either incorrect or was not inputted. Please try again.");
    }
    else {
      axios.get('https://api.epicsevendb.com/api/hero/' + hero)
      .then(function (response) {
        let results = response.data.results[0].awakening;
    
        let embed = new Discord.RichEmbed().setTitle("Zodiac Sign: " + sign).setThumbnail("https://assets.epicsevendb.com/zodiac-sign/" + image);
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