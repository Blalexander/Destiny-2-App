function searchByUsername(searchTerm, callback) {
  var searchTerm = searchTerm.replace("#", "%23");
  console.log("Hello from SearchByUsername!");

  // let url = `/bungie?displayName=${searchTerm}`;
  // $.getJSON(url, function(data) {
  //   console.log(data);
  // });

  // let bungieEP = `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/${searchTerm}/ `;

  $.ajax({
    url: "/bungie",
    type: "GET",
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
  let bungieEP = `https://www.bungie.net/Platform/Destiny2/${membsType}/Account/${membsId}/Stats/?components=205`;

  $.ajax({
    url: "/bungie2",
    type: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    //   "X-API-Key": "62261ab05c7b4f078c05a94f18124761"
    // },
    success: callback
  });
}

function displayFromDestinyId(data) {
  console.log("displayFromDestinyId functioning");
  console.log(data);
  let mergedAll = data.Response.mergedAllCharacters;
  let mergedAllTime = mergedAll.results.allPvP.allTime;
  console.log(mergedAll);
  $(".js-search-results2").html(`<p>Total Kills: ${
    mergedAllTime.kills.basic.displayValue
  }</p><br>
  <p>Total Deaths: ${mergedAllTime.deaths.basic.displayValue}</p><br>
  <p>K/D ratio: ${mergedAllTime.killsDeathsRatio.basic.displayValue}</p><br>
  <p>KA/D ratio: ${mergedAllTime.killsDeathsAssists.basic.displayValue}</p>`);
}

function getProfiles(data, callback) {
  $.ajax({
    url: "/bungie3",
    type: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    //   "X-API-Key": "62261ab05c7b4f078c05a94f18124761"
    // },
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
      `<div><img src="https://www.bungie.net${emblem}" alt="characterEmblem"><p class="classy">Character level: ${charLevel} </p><p class="classy">Light level: ${lightLevel} </p></div>`
    );
  }
}

function watchSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find(".js-query");
    let query = queryTarget.val();
    console.log(query);
    searchByUsername(query, displayFromUsername);
  });
}

$(watchSubmit);
