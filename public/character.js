let queryTarget2 = $(".js-search-form").find("#type");
let membsType = queryTarget2.val();
// console.log(membsType);

$("#type").click(event => {
  event.preventDefault();
  membsType = queryTarget2.val();
  console.log(membsType);
})


function searchByUsername(searchTerm, callback) {
  var searchTerm = searchTerm.replace("#", "%23");
  console.log("Hello from SearchByUsername!");

  $.ajax({
    url: `/bungie`,
    type: "GET",
    data: {
      membsType: membsType, 
      search: searchTerm
    },
    success: callback
  });
}

function displayFromUsername(data) {
  console.log("displayFromUsername functioning");
  console.log(data);
  let destinyMembershipId = data.Response[0].membershipId;
  getProfiles(destinyMembershipId, displayProfiles);
}

function getProfiles(data, callback) {
  // let destinyMembershipId = data.Response[0].membershipId;

  $.ajax({
    url: "/bungie2",
    type: "GET",
    data: {
      membsId: data,
      membsType: membsType
    },
    success: callback
  });
}

function displayProfiles(data) {
  console.log("displayProfiles functioning");
  console.log(data);
  let character = data.Response.characters.data;
  console.log(character);

  let newArray = [];
  for (index in character) {
    console.log(index);
    newArray.push(index);
  }

  console.log(newArray);

  for (i = 0; i < newArray.length; i++) {
    let characterId = newArray[i];
    let emblem = character[characterId].emblemBackgroundPath;
    let charLevel = character[characterId].baseCharacterLevel;
    let lightLevel = character[characterId].light;

    console.log(emblem);
    $(".js-search-results").append(
      `<button><img src="https://www.bungie.net${emblem}" alt="characterEmblem"><p class="classy">Character level: ${charLevel} </p><p class="classy">Light level: ${lightLevel} </p></button>`
    );
  }

  // getStats(displayStats);
}

function callLoadout(membsId, membsType, callback) {
  // let bungieEP = `https://www.bungie.net/Platform/Destiny2/${membsType}/Account/${membsId}/Stats/?components=205`;

  $.ajax({
    url: "/bungie2",
    type: "GET",
    success: callback
  });
}

function displayLoadout(data) {
  console.log("displayLoadout functioning");
  console.log(data);
  $(".js-search-results2").html(`<div class="kinetic weapon">Kinetic</div><div class="energy weapon">Energy</div><div class="power weapon">Power</div>
  <div class="head armor">Head</div><div class="shoulder armor">Shoulder</div><div class="chest armor">Chest</div><div class="leg armor">Legs</div><div class="class armor">Class</div>`);
}

// function getStats(callback) {
//   $.ajax({
//     url: "/bungie4",
//     type: "GET",
//     success: callback
//   });
// }

// function displayStats(info) {
//   let data = info.Response.activities;

//   for (i = 0; i < data.length; i++) {
//     $(".js-search-results3").append(
//       `<p>Date: ${data[i].period}</p><p>score: ${
//         data[i].values.score.basic.displayValue
//       }</p><p>kills: ${data[i].values.kills.basic.displayValue}</p><p>deaths: ${
//         data[i].values.deaths.basic.displayValue
//       }</p><p>assists: ${
//         data[i].values.assists.basic.displayValue
//       }</p><p>K/D: ${
//         data[i].values.killsDeathsRatio.basic.displayValue
//       }</p><p>KA/D: ${
//         data[i].values.killsDeathsAssists.basic.displayValue
//       }</p><p>efficiency: ${data[i].values.efficiency.basic.displayValue}</p>`
//     );
//   }
// }

function watchSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find(".js-query");
    let query = queryTarget.val();
    console.log(query);
    membsType = queryTarget2.val();
    $(".js-search-results").html("");
    $(".js-search-results2").html("");
    // saveProfile(query);
    searchByUsername(query, displayFromUsername);
  });
}

// function saveProfile(userName) {
//   let name = userName;
//   console.log(name);
//   $("#saveUser").click(event => {
//     event.preventDefault();
//     console.log(name);
//   });
// }

$(watchSubmit);
// $(saveProfile);

// $(".js-search-results2").html(`<p>Total Kills: ${
//   mergedAllTime.kills.basic.displayValue
// }</p><br>
// <p>Kills per game: ${mergedAllTime.kills.pga.displayValue}</p><br>
// <p>Total Deaths: ${mergedAllTime.deaths.basic.displayValue}</p><br>
// <p>Deaths per game: ${mergedAllTime.deaths.pga.displayValue}</p><br>
// <p>K/D ratio: ${mergedAllTime.killsDeathsRatio.basic.displayValue}</p><br>
// <p>KA/D ratio: ${mergedAllTime.killsDeathsAssists.basic.displayValue}</p><br>
// <p>Average kill distance: ${
//   mergedAllTime.averageKillDistance.basic.displayValue
// }m</p><br>
// <p>Average lifespan: ${
//   mergedAllTime.averageLifespan.basic.displayValue
// }</p><br>
// <p>Efficiency: ${mergedAllTime.efficiency.basic.displayValue}</p><br>
// <p>Best weapon: ${mergedAllTime.weaponBestType.basic.displayValue}</p><br>
// <p>Win/Loss ratio: ${mergedAllTime.winLossRatio.basic.displayValue}</p><br>`);
// }
