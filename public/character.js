let queryTarget2 = $(".js-search-form").find("#type");
let membsType = queryTarget2.val();
let membsId = 0;
let account = {};
let clickedChar = 0;
let clickedWep = 0;
let activeChar = 0;
let charTab = 0;
let goodKHC = manifest[153979397];
let goodKSG = manifest[636912560];
let goodEHC = manifest[153979396];
let goodESG = manifest[346136302];
let goodRL = manifest[3740842661];
let goodGL = manifest[218335759];

//drop-down Membership Type selector
$("#type").click(event => {
  event.preventDefault();
  membsType = queryTarget2.val();
  console.log(membsType);
});

//first API query that gathers Bungie ID
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

//sets the Bungie ID
function displayFromUsername(data) {
  console.log("displayFromUsername functioning");
  console.log(data);
  membsId = data.Response[0].membershipId;
  getProfiles(membsId, displayProfiles);
}

//second API query that gets Destiny ID and general info for characters
function getProfiles(data, callback) {
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

//extracts and stores information for character tabs
function displayProfiles(data) {
  console.log("displayProfiles functioning");
  console.log(data);
  let character = data.Response.characters.data;
  let equipment = data.Response.characterEquipment.data;
  console.log(character);

  account = {
    character1: {
      id: "",
      level: "",
      light: "",
      emblemB: "",
      weapons: {
        kinetic: { kHash: "", details: "" },
        energy: { eHash: "", details: "" },
        power: { pHash: "", details: "" }
      }
    },
    character2: {
      id: "",
      level: "",
      light: "",
      emblemB: "",
      weapons: {
        kinetic: { kHash: "", details: "" },
        energy: { eHash: "", details: "" },
        power: { pHash: "", details: "" }
      }
    },
    character3: {
      id: "",
      level: "",
      light: "",
      emblemB: "",
      weapons: {
        kinetic: { kHash: "", details: "" },
        energy: { eHash: "", details: "" },
        power: { pHash: "", details: "" }
      }
    }
  };

  for (index in character) {
    account.character1.id = character[Object.keys(character)[0]].characterId;
    account.character1.level =
      character[Object.keys(character)[0]].baseCharacterLevel;
    account.character1.light = character[Object.keys(character)[0]].light;
    account.character1.emblemB =
      character[Object.keys(character)[0]].emblemBackgroundPath;
    account.character1.weapons.kinetic.kHash =
      equipment[account.character1.id].items[0].itemHash;
    account.character1.weapons.energy.eHash =
      equipment[account.character1.id].items[1].itemHash;
    account.character1.weapons.power.pHash =
      equipment[account.character1.id].items[2].itemHash;
    account.character1.weapons.kinetic.details =
      manifest[account.character1.weapons.kinetic.kHash];
    account.character1.weapons.energy.details =
      manifest[account.character1.weapons.energy.eHash];
    account.character1.weapons.power.details =
      manifest[account.character1.weapons.power.pHash];

    account.character2.id = character[Object.keys(character)[1]].characterId;
    account.character2.level =
      character[Object.keys(character)[1]].baseCharacterLevel;
    account.character2.light = character[Object.keys(character)[1]].light;
    account.character2.emblemB =
      character[Object.keys(character)[1]].emblemBackgroundPath;
    account.character2.weapons.kinetic.kHash =
      equipment[account.character2.id].items[0].itemHash;
    account.character2.weapons.energy.eHash =
      equipment[account.character2.id].items[1].itemHash;
    account.character2.weapons.power.pHash =
      equipment[account.character2.id].items[2].itemHash;
    account.character2.weapons.kinetic.details =
      manifest[account.character2.weapons.kinetic.kHash];
    account.character2.weapons.energy.details =
      manifest[account.character2.weapons.energy.eHash];
    account.character2.weapons.power.details =
      manifest[account.character2.weapons.power.pHash];

    account.character3.id = character[Object.keys(character)[2]].characterId;
    account.character3.level =
      character[Object.keys(character)[2]].baseCharacterLevel;
    account.character3.light = character[Object.keys(character)[2]].light;
    account.character3.emblemB =
      character[Object.keys(character)[2]].emblemBackgroundPath;
    account.character3.weapons.kinetic.kHash =
      equipment[account.character3.id].items[0].itemHash;
    account.character3.weapons.energy.eHash =
      equipment[account.character3.id].items[1].itemHash;
    account.character3.weapons.power.pHash =
      equipment[account.character3.id].items[2].itemHash;
    account.character3.weapons.kinetic.details =
      manifest[account.character3.weapons.kinetic.kHash];
    account.character3.weapons.energy.details =
      manifest[account.character3.weapons.energy.eHash];
    account.character3.weapons.power.details =
      manifest[account.character3.weapons.power.pHash];
  }

  console.log(account);

  for (i = 0; i < 3; i++) {
    let characterId = account[Object.keys(account)[i]].id;
    let emblem = account[Object.keys(account)[i]].emblemB;
    let lightLevel = account[Object.keys(account)[i]].light;
    let charLevel = account[Object.keys(account)[i]].level;
    charTab = i;

    createCharacterTabs(emblem, lightLevel, characterId, charLevel, charTab);
  }

  $(".characterForm").submit(event => {
    event.preventDefault();
    $(".js-search-results2").html("");
    $(".js-search-results3").html("");
    $(".js-search-results4").html("");
    $(".js-search-results22").html("");
    $(".js-search-results33").html("");
    $(".js-search-results44").html("");

    let buttonVal = $(event.currentTarget).find(".characterButton");
    clickedChar = buttonVal.val();
    console.log(clickedChar);

    if (clickedChar == 0) {
      displayWepVals(account.character1.weapons);
    } else if (clickedChar == 1) {
      displayWepVals(account.character2.weapons);
    } else if (clickedChar == 2) {
      displayWepVals(account.character3.weapons);
    }
  });
}

//creates the character tabs
function createCharacterTabs(
  emblem,
  lightLevel,
  characterId,
  charLevel,
  charTab
) {
  $(".js-search-results").append(
    `<form class="characterForm" action="#"><button class="characterButton" type="submit" value="${charTab}"><img src="https://www.bungie.net${emblem}" alt="characterEmblem"><p class="classy">Character level: ${charLevel} </p><p class="classy">Light level: ${lightLevel} </p><p>ID: ${characterId}</p></button></form>`
  );
}

//creates the weapon tabs
function displayWepVals(currentWeps) {
  $(".js-search-results2").html(
    `<button class="weaponButton" type="submit" value=${
      currentWeps.kinetic.kHash
    }><img src="https://www.bungie.net${
      currentWeps.kinetic.details[1]
    }" alt="weaponIcon"><p class="wepName">${
      currentWeps.kinetic.details[0]
    }</p><p>Kinetic</p></button>`
  );

  $(".js-search-results3").html(
    `<button class="weaponButton" type="submit" value=${
      currentWeps.energy.eHash
    }><img src="https://www.bungie.net${
      currentWeps.energy.details[1]
    }" alt="weaponIcon"><p class="wepName">${
      currentWeps.energy.details[0]
    }</p><p>Energy</p></button>`
  );

  $(".js-search-results4").html(
    `<button class="weaponButton" type="submit" value=${
      currentWeps.power.pHash
    }><img src="https://www.bungie.net${
      currentWeps.power.details[1]
    }" alt="weaponIcon"><p class="wepName">${
      currentWeps.power.details[0]
    }</p><p>Power</p></button>`
  );

  $(".weaponForm").submit(event => {
    event.preventDefault();

    $(".js-search-results22").html("");
    $(".js-search-results33").html("");
    $(".js-search-results44").html("");

    let buttonValue = $(event.currentTarget).find(".weaponButton");
    clickedWep = buttonValue.val();
    console.log(clickedWep);

    let wepType = manifest[clickedWep][2];
    let wepSlot = manifest[clickedWep][3];

    console.log(wepType, wepSlot);

    let suggestionTab1 = 0;
    let suggestionTab2 = 0;
    let wepSuggestion1 = 0;
    let wepSuggestion2 = 0;

    if (wepSlot == 2) {
      suggestionTab1 = ".js-search-results33";
      suggestionTab2 = ".js-search-results44";
    }
    if (wepSlot == 3) {
      suggestionTab1 = ".js-search-results22";
      suggestionTab2 = ".js-search-results44";
    }
    if (wepSlot == 4) {
      suggestionTab1 = ".js-search-results22";
      suggestionTab2 = ".js-search-results33";
    }

    if (wepSlot == 2) {
      $(suggestionTab1).html(
        `<div class="weaponSuggestion"><img src="https://www.bungie.net${
          goodEHC[1]
        }" alt="weaponIcon"><p class="wepName">${
          goodEHC[0]
        }</p><p>Energy</p></div>`
      );

      $(suggestionTab2).html(
        `<div class="weaponSuggestion"><img src="https://www.bungie.net${
          goodRL[1]
        }" alt="weaponIcon"><p class="wepName">${
          goodRL[0]
        }</p><p>Power</p></div>`
      );
    }

    if (wepSlot == 3) {
      $(suggestionTab1).html(
        `<div class="weaponSuggestion"><img src="https://www.bungie.net${
          goodKHC[1]
        }" alt="weaponIcon"><p class="wepName">${
          goodKHC[0]
        }</p><p>Kinetic</p></div>`
      );

      $(suggestionTab2).html(
        `<div class="weaponSuggestion"><img src="https://www.bungie.net${
          goodRL[1]
        }" alt="weaponIcon"><p class="wepName">${
          goodRL[0]
        }</p><p>Power</p></div>`
      );
    }

    if (wepSlot == 4) {
      $(suggestionTab1).html(
        `<div class="weaponSuggestion"><img src="https://www.bungie.net${
          goodKSG[1]
        }" alt="weaponIcon"><p class="wepName">${
          goodKSG[0]
        }</p><p>Kinetic</p></div>`
      );

      $(suggestionTab2).html(
        `<div class="weaponSuggestion"><img src="https://www.bungie.net${
          goodEHC[1]
        }" alt="weaponIcon"><p class="wepName">${
          goodEHC[0]
        }</p><p>Energy</p></div>`
      );
    }
  });
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
    $(".js-search-results3").html("");
    $(".js-search-results4").html("");
    searchByUsername(query, displayFromUsername);
  });
}

$(watchSubmit);
