const Discord = require('discord.js');
const axios = require('axios');

//Need to work on making this cleaner
function getCampingSim(msg) {
    var reactions = [];
    var listOfOptions = [];
    var subTotal = {
        character0: [],
        character1: [],
        character2: [],
        character3: []
    };
    var totals = [];

    let characters = msg.content.split(' ').slice(-4);
    
    const char1 = axios.get('https://api.epicsevendb.com/api/hero/' + characters[0].toLowerCase());
    const char2 = axios.get('https://api.epicsevendb.com/api/hero/' + characters[1].toLowerCase());
    const char3 = axios.get('https://api.epicsevendb.com/api/hero/' + characters[2].toLowerCase());
    const char4 = axios.get('https://api.epicsevendb.com/api/hero/' + characters[3].toLowerCase());

    Promise.all([char1, char2, char3, char4])
        .then(function(values) {
            values.forEach((element, i) => {
                reactions[characters[i]] = element.data.results[0].camping.reactions;
                listOfOptions.push(element.data.results[0].camping.options);
            });

            //going through each options
            listOfOptions.forEach((character, i) => {
                let max = 0;

                //use option on the 3 other memebers in team
                character.forEach(option => {
                    let appliedCharacters = characters.slice();
                    appliedCharacters.splice(i, 1);

                    //get reaction from each members
                    appliedCharacters.forEach(reactChar => {
                        if(!subTotal["character"+i][option]) {
                            subTotal["character"+i][option] = reactions[reactChar][option];
                        }
                        else {
                            subTotal["character"+i][option] += reactions[reactChar][option];
                        }
                    });
                    
                    if(subTotal["character"+i][option] > max){
                        subTotal["character"+i]["largestNum"] = {
                            name: option,
                            total: subTotal["character"+i][option]
                        }
                        max = subTotal["character"+i][option];
                    }
                })
            });
     
            totals.push(subTotal["character0"]["largestNum"]["total"]);
            totals.push(subTotal["character1"]["largestNum"]["total"]);
            totals.push(subTotal["character2"]["largestNum"]["total"]);
            totals.push(subTotal["character3"]["largestNum"]["total"]);

            let firstChoice = totals.indexOf(Math.max.apply(null, totals));
            totals.splice(firstChoice, 1, -999);

            let secondChoice = totals.indexOf(Math.max.apply(null, totals));

            let embed = new Discord.RichEmbed().setTitle("Camping Simulator").addBlankField()
            .setThumbnail("https://assets.epicsevendb.com/hero/"+ characters[firstChoice].toLowerCase() +"/icon.png")
            .setImage("https://assets.epicsevendb.com/hero/" + characters[secondChoice].toLowerCase() + "/icon.png")
            .addField(characters[firstChoice], subTotal["character" + firstChoice]["largestNum"]["name"] + ": " + subTotal["character" + firstChoice]["largestNum"]["total"], true)
            .addField(characters[secondChoice], subTotal["character" + secondChoice]["largestNum"]["name"] + ":  " + subTotal["character" + secondChoice]["largestNum"]["total"], true)
            .addBlankField()
            .addField("Total Points", (subTotal["character" + firstChoice]["largestNum"]["total"] + subTotal["character" + secondChoice]["largestNum"]["total"]));

            msg.channel.send(embed);
        })
        .catch(function(error) {
            msg.channel.send("There was an error when executing this command. Please make sure to type the command correctly: \n Example: ?camp bellona kayron ras lots");
            throw error;
        });
}

module.exports = getCampingSim;