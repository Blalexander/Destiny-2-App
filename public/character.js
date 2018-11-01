let queryTarget2 = $(".js-search-form").find("#type");
let membsType = queryTarget2.val();
let membsId = 0;
let newArray = [];
let wepArray1 = [];
let wepArray2 = [];
let wepArray3 = [];
let clickedChar = 0;
let activeChar = 0;

// console.log(membsType);

$("#type").click(event => {
  event.preventDefault();
  membsType = queryTarget2.val();
  console.log(membsType);
});

// $(".characterButton").click(event => {
//   event.preventDefault();
//   console.log(characterId);
// });

function searchByUsername(searchTerm, callback) {
  var searchTerm = searchTerm.replace("#", "%23");
  console.log("Hello from SearchByUsername!");
  membsId = 0;

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
  membsId = data.Response[0].membershipId;
  getProfiles(membsId, displayProfiles);
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

  // let newArray = [];
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

    $(".js-search-results").append(
      `<form class="characterForm"><button class="characterButton" type="submit" value="${characterId}"><img src="https://www.bungie.net${emblem}" alt="characterEmblem"><p class="classy">Character level: ${charLevel} </p><p class="classy">Light level: ${lightLevel} </p><p>ID: ${characterId}</p></button></form>`
    );
  }
  $(".characterForm").submit(event => {
    event.preventDefault();
    let buttonVal = $(event.currentTarget).find(".characterButton");
    clickedChar = buttonVal.val();
    console.log(clickedChar);
  });

  callLoadout(displayLoadout);
}

function callLoadout(callback) {
  $.ajax({
    url: "/bungie3",
    type: "GET",
    data: {
      membsId: membsId,
      membsType: membsType
    },
    success: callback
  });
}

function displayLoadout(data) {
  console.log("displayLoadout functioning");
  console.log(data);
  let character1 = newArray[0];
  let character2 = newArray[1];
  let character3 = newArray[2];
  let equipment = data.Response.characterEquipment.data;
  let char1 = equipment[character1];
  let char2 = equipment[character2];
  let char3 = equipment[character3];

  wepArray1 = [];
  wepArray2 = [];
  wepArray3 = [];

  // if(clickedChar == )

  for (i = 0; i < 3; i++) {
    wepArray1.push(char1.items[i].itemHash);
  }
  for (i = 0; i < 3; i++) {
    wepArray2.push(char2.items[i].itemHash);
  }
  for (i = 0; i < 3; i++) {
    wepArray3.push(char3.items[i].itemHash);
  }

  // console.log(wepArray1, wepArray2, wepArray3);

  for (i = 0; i < 3; i++) {
    let wepHash = wepArray1[i];
    console.log(wepHash);
    getWepVals(wepHash, displayWepVals);
  }
  // $(".js-search-results2").html(``);
}

function getWepVals(wepHash, callback) {
  $.ajax({
    url: "/bungie4",
    type: "GET",
    data: {
      wepHash: wepHash
    },
    success: callback
  });
}

function displayWepVals(data) {
  console.log(data);
  let props = data.Response.displayProperties;
  if (data.Response.itemCategoryHashes[0] == 2) {
    $(".js-search-results2").html(
      `<button class="weaponButton" type="submit" value="kinetic"><img src="https://www.bungie.net${
        props.icon
      }" alt="weaponIcon"><p class="wepName">${
        props.name
      }</p><p>Kinetic</p></button>`
    );
  }
  if (data.Response.itemCategoryHashes[0] == 3) {
    $(".js-search-results3").html(
      `<button class="weaponButton" type="submit" value="energy"><img src="https://www.bungie.net${
        props.icon
      }" alt="weaponIcon"><p class="wepName">${
        props.name
      }</p><p>Energy</p></button>`
    );
  }
  if (data.Response.itemCategoryHashes[0] == 4) {
    $(".js-search-results4").html(
      `<button class="weaponButton" type="submit" value="power"><img src="https://www.bungie.net${
        props.icon
      }" alt="weaponIcon"><p class="wepName">${
        props.name
      }</p><p>Power</p></button>`
    );
  }
}

function watchSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find(".js-query");
    let query = queryTarget.val();
    console.log(query);
    membsType = queryTarget2.val();
    $(".js-search-results").html("");
    $(".js-search-results2").html("");
    newArray = [];
    // saveProfile(query);
    searchByUsername(query, displayFromUsername);
  });
}

$(watchSubmit);
// function saveProfile(userName) {
//   let name = userName;
//   console.log(name);
//   $("#saveUser").click(event => {
//     event.preventDefault();
//     console.log(name);
//   });
// }

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
