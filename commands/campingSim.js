const axios = require('axios');

function getCampingSim(msg) {
    var charCampingList = [];
    var characters = msg.content.split(' ').slice(-4);

    characters.forEach(element => {
        axios.get('https://api.epicsevendb.com/api/hero/' + element)
            .then(function (response) {
                charCampingList[element] = response.data.results[0].camping;
        })
        .catch(function(error) {
            console.log(error)
        })
        .finally(function() {
            charCampingList.forEach((element, name) => {
                console.log(name);
            });
        });
    });
}

module.exports = getCampingSim;