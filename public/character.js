let queryTarget2 = $(".js-search-form").find("#type");
let membsType = queryTarget2.val();
let membsId = 0;
let account = {};
let overall = {};
let objVals = [];
let objKeys = [];
let wepCountObj = {};
let wepClusterObj = {};
let clickedChar = 0;
let clickedWep = 0;
let activeChar = 0;
let charTab = 0;
let count = 0;


const titanBackground = "https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-titan-4k.jpg";
const hunterBackground = "https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-Hunter-4k.jpg";
const warlockBackground = "https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-warlock-4k.jpg";


//if classType == 0 == Titan ...... if classType == 1 == Hunter ...... if classType == 2 == Warlock


//placeholders for real suggestions
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

$("#displayWepTrends").submit(event => {
  event.preventDefault();
  console.log(wepCountObj);
  let highestWepVal = 0;
  let highestWepName = 0;
  let middleWepVal = 0;
  let middleWepName = 0;
  let lowestWepVal = 0;
  let lowestWepName = 0;

  Object.keys(wepCountObj).forEach(function(a,b) {
    if(wepCountObj[a] > highestWepVal) {
      highestWepVal = wepCountObj[a];
      highestWepName = a;
    }
  })

  Object.keys(wepCountObj).forEach(function(a,b) {
    if(wepCountObj[a] > middleWepVal && wepCountObj[a] < highestWepVal) {
      middleWepVal = wepCountObj[a];
      middleWepName = a;
    }
  })

  Object.keys(wepCountObj).forEach(function(a,b) {
    if(wepCountObj[a] > lowestWepVal && wepCountObj[a] < middleWepVal) {
      lowestWepVal = wepCountObj[a];
      lowestWepName = a;
    }
  })

  console.log(highestWepName, highestWepVal);
  console.log(middleWepName, middleWepVal);
  console.log(lowestWepName, lowestWepVal);
  console.log(wepClusterObj);

  let highWepIcon = manifest[highestWepName];
  let midWepIcon = manifest[middleWepName];
  let lowWepIcon = manifest[lowestWepName];


  $('#weaponClusters').html(`<div class="highWepPic"><img src="https://www.bungie.net${highWepIcon[1]
  }"><p class="highWepName">${
    highWepIcon[0]
  }</p></div><div class="midWepPic"><img src="https://www.bungie.net${midWepIcon[1]
  }"><p class="midWepName">${
    midWepIcon[0]
  }</p></div><div class="lowWepPic"><img src="https://www.bungie.net${lowWepIcon[1]
  }"><p class="lowWepName">${
    lowWepIcon[0]
  }</p></div>`)
});

//first API query that gathers Bungie ID
function searchByUsername(searchTerm, callback) {
  // window.location.replace("/character.html");
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
function setIdFromUsername(data) {
  console.log("setIdFromUsername functioning");
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
      classType: "",
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
      classType: "",
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
      classType: "",
      emblemB: "",
      weapons: {
        kinetic: { kHash: "", details: "" },
        energy: { eHash: "", details: "" },
        power: { pHash: "", details: "" }
      }
    }
  };

  //i know this is horrific looking, but for now it did what i wanted it to do (which is set values from API call#2 and manifest definitions into each character object)
  for (index in character) {
    account.character1.id = character[Object.keys(character)[0]].characterId;
    account.character1.level =
      character[Object.keys(character)[0]].baseCharacterLevel;
    account.character1.light = character[Object.keys(character)[0]].light;
    account.character1.classType = character[Object.keys(character)[0]].classType;
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
    account.character2.classType = character[Object.keys(character)[1]].classType;
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
    account.character3.classType = character[Object.keys(character)[2]].classType;
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

  //for loop that sends information to character tabs
  for (i = 0; i < 3; i++) {
    let characterId = account[Object.keys(account)[i]].id;
    let emblem = account[Object.keys(account)[i]].emblemB;
    let lightLevel = account[Object.keys(account)[i]].light;
    let charLevel = account[Object.keys(account)[i]].level;
    let charType = account[Object.keys(account)[i]].classType;
    charTab = i;

    createCharacterTabs(emblem, lightLevel, characterId, charLevel, charType, charTab);
  }

  //the character tabs created ^ are buttons with unique values.  this watches for button submissions and updates what weapons are shown in response.
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
      setBackground(titanBackground);
    } else if (clickedChar == 1) {
      displayWepVals(account.character2.weapons);
      setBackground(hunterBackground);
    } else if (clickedChar == 2) {
      displayWepVals(account.character3.weapons);
      setBackground(warlockBackground);
    }
  });

  getActivityStats(processActivityStats);
}

function getActivityStats(callback) {
  let charaId = account.character1.id;
  console.log(charaId, membsType, membsId);
  $.ajax({
    url: "/bungie3",
    type: "GET",
    data: {
      membsType: membsType,
      membsId: membsId,
      characterId: charaId
    },
    success: callback
  });
}

function processActivityStats(dataA) {
  console.log(dataA);
  let activityArray = [];
  for(i=0;i<dataA.Response.activities.length;i++) {
    activityArray.push(dataA.Response.activities[i].activityDetails.instanceId);
  }
  console.log(activityArray);

  // activityArray.forEach(forEachInstanceId());

  // for(entry in activityArray) {
  //   let realEntry = entry[entry];
  //   forEachInstanceId(realEntry, printFunc);
  // }

  for(i=0;i<activityArray.length;i++) {
    let realEntry = activityArray[i];
    forEachInstanceId(realEntry, printFunc);
  }
}

function forEachInstanceId(entry, callback) {
  $.ajax({
    url: "/bungie4",
    type: "GET",
    data: {
      instId: entry
    },
    success: callback
  });
}

function printFunc(data) {
  console.log(data);
  let players = data.Response.entries;
  for(i=0;i<players.length;i++) {
    if(players[i].extended.weapons) {
      storePlayerInfo(players[i]);
    }
  }
  // console.log(wepCountObj);
}

function storePlayerInfo(data) {
  let primaryWepCounter = data.extended.weapons[0].referenceId;

  if(wepClusterObj[primaryWepCounter] != null && wepClusterObj[primaryWepCounter].seco != null) {
      wepClusterObj[primaryWepCounter].occurances++;
  }

  else if(data.extended.weapons.length == 2) {
    wepClusterObj[primaryWepCounter] = {seco: data.extended.weapons[1].referenceId, occurances: 1};
  }

  if(primaryWepCounter in wepCountObj) {
    wepCountObj[primaryWepCounter] += 1;
  }
  else {
    wepCountObj[primaryWepCounter] = 1;
  }
}

function setBackground(bGround) {
  if (bGround == titanBackground) {
    document.body.style.backgroundImage = "url('https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-titan-4k.jpg')";
  }
  else if (bGround == hunterBackground) {
    document.body.style.backgroundImage = "url('https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-Hunter-4k.jpg')";
  }
  else if (bGround == warlockBackground) {
    document.body.style.backgroundImage = "url('https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-warlock-4k.jpg')";
  }
  else {
    document.body.style.backgroundImage = "url('https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-Guardians-4k.jpg')";
  }
}

//creates the character tabs
function createCharacterTabs(
  emblem,
  lightLevel,
  characterId,
  charLevel,
  charType,
  charTab
) {
  if(charType == 0) {
    $(".js-search-results").append(
      `<form class="characterForm" action="#"><button class="titan characterButton" type="submit" value="${charTab}"><img src="https://www.bungie.net${emblem}" alt="characterEmblem"><p class="classy">Character level: ${charLevel} </p><p class="classy">Light level: ${lightLevel} </p><p>ID: ${characterId}</p></button></form>`
    );
  }
  else if(charType == 1) {
    $(".js-search-results").append(
      `<form class="characterForm" action="#"><button class="hunter characterButton" type="submit" value="${charTab}"><img src="https://www.bungie.net${emblem}" alt="characterEmblem"><p class="classy">Character level: ${charLevel} </p><p class="classy">Light level: ${lightLevel} </p><p>ID: ${characterId}</p></button></form>`
    );
  }
  else if(charType == 2) {
    $(".js-search-results").append(
      `<form class="characterForm" action="#"><button class="warlock characterButton" type="submit" value="${charTab}"><img src="https://www.bungie.net${emblem}" alt="characterEmblem"><p class="classy">Character level: ${charLevel} </p><p class="classy">Light level: ${lightLevel} </p><p>ID: ${characterId}</p></button></form>`
    );
  }
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

  //each of the weapon tabs created ^ are buttons with unique values.  this watches for button submissions and updates recommended gear in response.
  $(".weaponForm").submit(event => {
    event.preventDefault();

    //creates the save button
    $("#saveLoadout").html(
      `<button type="Submit" id="saveButton">Save loadout</button>`
    );

    $("#displayWepTrends").html(
      `<button type="Submit" id="wepTrendsButton">Display Weapon Trends</button>`
    );

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

    //considers if the weapon is Kinetic, Energy, or Power, and then assigns the proper containers based on that
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

    //can be read as "if weapon == kinetic, show Energy and Power suggestions"
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

    //can be read as "if weapon == energy, show Kinetic and Power suggestions"
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

    //same as the last two, but for "Power" ^
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
    searchByUsername(query, setIdFromUsername);
    // window.location.replace("/character.html");
    //if input box != empty, pass info
    //have watchsubmit check value of inout box and if it is not an empty string, take value and pass as a request paramter in an ajax request
    //on route that handles route, route that handles optional parameter, and if exists do whatever
    //set value in response header.  res.set   
  });
}

$(watchSubmit);
