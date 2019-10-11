const axios = require('axios');

function getCampingSim(msg) {
    var charCampingList = [];
    var characters = msg.content.split(' ').slice(-4);

    
    const char1 = axios.get('https://api.epicsevendb.com/api/hero/' + characters[0]);
    const char2 = axios.get('https://api.epicsevendb.com/api/hero/' + characters[1]);
    const char3 = axios.get('https://api.epicsevendb.com/api/hero/' + characters[2]);
    const char4 = axios.get('https://api.epicsevendb.com/api/hero/' + characters[3]);

    Promise.all([char1, char2, char3, char4])
        .then(function(values) {
            values.forEach((element, i) => {
                charCampingList[characters[i]] = element.data.results[0].camping;
            });

            characters.forEach((element, i) => {
                charCampingList[element].options.forEach((element, j) => {
                    
                })
            });
            console.log(charCampingList);
        });
}

module.exports = getCampingSim;