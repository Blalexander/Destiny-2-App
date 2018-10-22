const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  axios
    .get(
      `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/${searchTerm}/`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "62261ab05c7b4f078c05a94f18124761"
        }
      }
    )
    .then(payload => {
      res.json(payload.data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: "Something went wrong while querying Bungie"
      });
    });
});

function searchByUsername(searchTerm, callback) {
  var searchTerm = searchTerm.replace("#", "%23");
  let bungieEP = `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/${searchTerm}/ `;

  $.ajax({
    url: bungieEP,
    type: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": "62261ab05c7b4f078c05a94f18124761"
    },
    success: callback
  });
}

// function displayFromUsername(data) {
//   console.log("displayFromUsername functioning");
//   console.log(data);
//   let destinyMembershipId = data.Response[0].membershipId;
//   searchByBungieId(destinyMembershipId, displayFromBungieId);
// }

// function searchByBungieId(membId, callback) {
//   let bungieEP = `https://www.bungie.net/Platform/User/GetMembershipsById/${membId}/0/`;

//   $.ajax({
//     url: bungieEP,
//     type: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "X-API-Key": "62261ab05c7b4f078c05a94f18124761"
//     },
//     success: callback
//   });
// }

// function displayFromBungieId(info) {
//   console.log(info);
//   let membsId = info.Response.destinyMemberships[0].membershipId;
//   let membsType = info.Response.destinyMemberships[0].membershipType;
//   console.log(membsId);
//   searchByDestinyId(membsId, membsType, displayFromDestinyId);
// }

// function searchByDestinyId(membsId, membsType, callback) {
//   let bungieEP = `https://www.bungie.net/Platform/Destiny2/${membsType}/Account/${membsId}/Stats/?components=205`;

//   $.ajax({
//     url: bungieEP,
//     type: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "X-API-Key": "62261ab05c7b4f078c05a94f18124761"
//     },
//     success: callback
//   });
// }

// function displayFromDestinyId(data) {
//   console.log("displayFromDestinyId functioning");
//   console.log(data);
//   let character = data.Response.characters;
//   let mergedAll = data.Response.mergedAllCharacters;
//   let mergedAllTime = mergedAll.results.allPvP.allTime;
//   console.log(character);
//   console.log(mergedAll);
//   for (i = 0; i < character.length; i++) {
//     $(".js-search-results").append(`<p>${character[i].characterId}</p>`);
//   }
//   $(".js-search-results2").html(`<p>Total Kills: ${
//     mergedAllTime.kills.basic.displayValue
//   }</p><br>
//   <p>Total Deaths: ${mergedAllTime.deaths.basic.displayValue}</p><br>
//   <p>K/D ratio: ${mergedAllTime.killsDeathsRatio.basic.displayValue}</p><br>
//   <p>KA/D ratio: ${mergedAllTime.killsDeathsAssists.basic.displayValue}</p>`);
// }

// function watchSubmit() {
//   $(".js-search-form").submit(event => {
//     event.preventDefault();
//     let queryTarget = $(event.currentTarget).find(".js-query");
//     let query = queryTarget.val();
//     console.log(query);
//     searchByUsername(query, displayFromUsername);
//   });
// }

// $(watchSubmit);

// $('.js-search-results').append(`<div class="accountSelector"><p>${name[i].displayName}</p></div>`);
//     if (name[i].hasOwnProperty('blizzardDisplayName')) {
//       $('.js-search-results').append(`<p class="otherIDs">-Blizzard ID: ${name[i].blizzardDisplayName}</p>`);
//     }
//     if (name[i].hasOwnProperty('xboxDisplayName')) {
//       $('.js-search-results').append(`<p class="otherIDs">-Xbox Gamertag: ${name[i].xboxDisplayName}</p>`);
//     }
//     if (name[i].hasOwnProperty('psnDisplayName')) {
//       $('.js-search-results').append(`<p class="otherIDs">-PSN name: ${name[i].psnDisplayName}</p>`);
//     }

// switch (name[i].blizzardDisplayName || name[i].xboxDisplayName || name[i].psnDisplayName) {
//   case name[i].displayName:
//     $('.js-search-results').append(`<div class="accountSelector">
//     <p>${name[i].displayName}</p></div>`);
//   case name[i].blizzardDisplayName:
//     $('.accountSelector').append(`<p class="otherIDs">Blizzard ID: ${name[i].blizzardDisplayName}</p>`);
//   case name[i].xboxDisplayName:
//     $('.accountSelector').append(`<p class="otherIDs">Xbox Gamertag: ${name[i].xboxDisplayName}</p>`);
//   case name[i].psnDisplayName:
//     $('.accountSelector').append(`<p class="otherIDs">PSN name: ${name[i].psnDisplayName}</p>`);
//   default:
//     break;
//   }
// if(name[i].blizzardDisplayName) {
//   $('.accountSelector').append(`<p class="otherIDs">Blizzard ID: ${name[i].blizzardDisplayName}</p>`);
// }
// else if(name[i].xboxDisplayName) {
//   $('.accountSelector').append(`<p class="otherIDs">Xbox Gamertag: ${name[i].xboxDisplayName}</p>`);
// }
// else if(name[i].psnDisplayName) {
//   $('.accountSelector').append(`<p class="otherIDs">PSN name: ${name[i].psnDisplayName}</p>`);
// }
// let name = data.Response;
// let dropDown = {};
// for(i=0;i<name.length;i++) {
//   let newName = name[i].displayName;
//   let newId = name[i].membershipId;
//   dropDown[newName] = newId;
// }
// console.log(dropDown);
// for(index in dropDown) {
//   list1.options[list1.options.length] = new Option(index, dropDown[index]);
// }
// $('#characterSelect').on('select', function(event) {
//   event.preventDefault();
//   list1 = $('#characterSelect');
//   let dropVal = list1.val();
//   console.log(dropVal);
//   searchByBungieId(dropVal, displayFromBungieId);
// })
module.exports = router;
