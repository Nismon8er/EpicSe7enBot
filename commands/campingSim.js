const Discord = require('discord.js');
const axios = require('axios');

//Need to work on making this cleaner
function getCampingSim(msg) {
    let reactions = [];
    let listOfOptions = [];
    let subTotal = {
        character0: [],
        character1: [],
        character2: [],
        character3: []
    };
    let totals = [];

    let characters = msg.content.split(' ').slice(1, 5);

    if(characters.length !== 4 || msg.content.split(' ').length > 5) {
        msg.channel.send("Please enter exactly 4 units.");
        return;
    }
    
    const char1 = axios.get('https://api.epicsevendb.com/api/hero/' + characters[0].toLowerCase());
    const char2 = axios.get('https://api.epicsevendb.com/api/hero/' + characters[1].toLowerCase());
    const char3 = axios.get('https://api.epicsevendb.com/api/hero/' + characters[2].toLowerCase());
    const char4 = axios.get('https://api.epicsevendb.com/api/hero/' + characters[3].toLowerCase());

    Promise.all([char1, char2, char3, char4])
        .then((values) => {
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

            let embed = new Discord.RichEmbed().setTitle("Camping Simulator")
            .addField(capitalize(characters[firstChoice].replace("-", " ").toLowerCase()), capitalize(subTotal["character" + firstChoice]["largestNum"]["name"].replace("-", " ")) + ": " + subTotal["character" + firstChoice]["largestNum"]["total"], true)
            .addField(capitalize(characters[secondChoice].replace("-", " ").toLowerCase()), capitalize(subTotal["character" + secondChoice]["largestNum"]["name"].replace("-", " ")) + ":  " + subTotal["character" + secondChoice]["largestNum"]["total"], true)
            .addBlankField()
            .addField("Total Points", (subTotal["character" + firstChoice]["largestNum"]["total"] + subTotal["character" + secondChoice]["largestNum"]["total"]));

            msg.channel.send(embed);
        }, (err) => msg.channel.send("There was an " + err.response.status + " error when executing this command. Please make sure to type the command and hero name correctly: \n Example: ?camp bellona kayron auxiliary-lots silver-blade-aramintha"))
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    
    return s.charAt(0).toUpperCase() + s.slice(1)
}

module.exports = getCampingSim;