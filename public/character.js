function searchByUsername(searchTerm, callback) {
  var searchTerm = searchTerm.replace("#", "%23");
  console.log("Hello from SearchByUsername!");

  $.ajax({
    url: `/bungie`,
    type: "GET",
    // data: {
    //   search: searchTerm
    // },
    success: callback
  });
}

function displayFromUsername(data) {
  console.log("displayFromUsername functioning");
  console.log(data);
  let destinyMembershipId = data.Response[0].membershipId;
  let destinyMembershipType = data.Response[0].membershipType;
  searchByDestinyId(
    destinyMembershipId,
    destinyMembershipType,
    displayFromDestinyId
  );
  getProfiles(destinyMembershipId, displayProfiles);
}

function searchByDestinyId(membsId, membsType, callback) {
  // let bungieEP = `https://www.bungie.net/Platform/Destiny2/${membsType}/Account/${membsId}/Stats/?components=205`;

  $.ajax({
    url: "/bungie2",
    type: "GET",
    success: callback
  });
}

function displayFromDestinyId(data) {
  console.log("displayFromDestinyId functioning");
  console.log(data);
  let mergedAll = data.Response.mergedAllCharacters;
  let mergedAllTime = mergedAll.results.allPvP.allTime;
  console.log(mergedAll);
  $(".js-search-results2").html(`<div>`);
}

function getProfiles(data, callback) {
  $.ajax({
    url: "/bungie3",
    type: "GET",
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

  getStats(displayStats);
}

function getStats(callback) {
  $.ajax({
    url: "/bungie4",
    type: "GET",
    success: callback
  });
}

function displayStats(info) {
  let data = info.Response.activities;

  for (i = 0; i < data.length; i++) {
    $(".js-search-results3").append(
      `<p>Date: ${data[i].period}</p><p>score: ${
        data[i].values.score.basic.displayValue
      }</p><p>kills: ${data[i].values.kills.basic.displayValue}</p><p>deaths: ${
        data[i].values.deaths.basic.displayValue
      }</p><p>assists: ${
        data[i].values.assists.basic.displayValue
      }</p><p>K/D: ${
        data[i].values.killsDeathsRatio.basic.displayValue
      }</p><p>KA/D: ${
        data[i].values.killsDeathsAssists.basic.displayValue
      }</p><p>efficiency: ${data[i].values.efficiency.basic.displayValue}</p>`
    );
  }
}

function watchSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find(".js-query");
    let query = queryTarget.val();
    console.log(query);
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
