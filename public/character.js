let queryTarget2 = $(".js-search-form").find("#type");
let membsType = queryTarget2.val();
let membsId = 0;
let account = {};
let overall = {};
let objVals = [];
let objKeys = [];
let activityArray = [];
let occuranceOfSingleWep = {};
let occuranceOfTwoWeps = {};
let occuranceOfThreeWeps = {};
let clickedChar = 0;
let clickedWep = 0;
let activeChar = 0;
let charTab = 0;
let count = 0;


const titanBackground = "https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-titan-4k.jpg";
const hunterBackground = "https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-Hunter-4k.jpg";
const warlockBackground = "https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-warlock-4k.jpg";





//drop-down Membership Type selector
$("#type").click(event => {
  event.preventDefault();
  membsType = queryTarget2.val();
  console.log(membsType);
});





$("#displayWepTrends").submit(event => {
  event.preventDefault();
  $("#weaponClusters").html("");
  console.log(occuranceOfSingleWep);
  let highestSingleWep = 0;
  let highestSingleWepName = 0;
  let highestDoubleWep = 0;
  let firstDoubleWepName = 0;
  let highestTripleWep = 0;
  let firstTripleWepName = 0;

  Object.keys(occuranceOfSingleWep).forEach(function(a,b) {
    if(occuranceOfSingleWep[a].occurances > highestSingleWep) {
      highestSingleWep = occuranceOfSingleWep[a].occurances;
      highestSingleWepName = a;
      highestSingleWepName1 = occuranceOfSingleWep[a].secondaryWepKey;
    }
  })

  // Object.keys(occuranceOfTwoWeps).forEach(function(a,b) {
  //   if(occuranceOfTwoWeps[a].occurances > highestDoubleWep) {
  //     highestDoubleWep = occuranceOfTwoWeps[a].occurances;
  //     firstDoubleWepName = a;
  //     secondDoubleWepName = occuranceOfTwoWeps[a].secondaryWepKey;
  //   }
  // })

  // Object.keys(occuranceOfThreeWeps).forEach(function(a,b) {
  //   if(occuranceOfThreeWeps[a].occurances > highestTripleWep) {
  //     highestTripleWep = occuranceOfThreeWeps[a].occurances;
  //     firstTripleWepName = a;
  //     secondTripleWepName = occuranceOfThreeWeps[a].secondaryWepKey;
  //     thirdTripleWepName = occuranceOfThreeWeps[a].tertiaryWepKey;
  //   }
  // })

  // console.log(highestSingleWepName, highestSingleWep);
  // console.log(firstDoubleWepName, secondDoubleWepName);
  // console.log(firstTripleWepName, secondTripleWepName, thirdTripleWepName);
  // console.log(occuranceOfSingleWep, occuranceOfTwoWeps, occuranceOfThreeWeps);

  let counter = 1;
  let singleWepIcon = manifest[highestSingleWepName];
  let singleWepIcon1 = manifest[highestSingleWepName1];

  // let firstDoubleWepIcon = manifest[firstDoubleWepName];
  // let secondDoubleWepIcon = manifest[secondDoubleWepName];
  // let firstTripleWepIcon = manifest[firstTripleWepName];
  // let secondTripleWepIcon = manifest[secondTripleWepName];
  // let thirdTripleWepIcon = manifest[thirdTripleWepName];

  let singleMathResult = occuranceOfSingleWep[highestSingleWepName].winCount/occuranceOfSingleWep[highestSingleWepName].occurances;
  // let doubleMathResult = occuranceOfTwoWeps[firstDoubleWepName].winCount/occuranceOfTwoWeps[firstDoubleWepName].occurances;
  // let tripleMathResult = occuranceOfThreeWeps[firstTripleWepName].winCount/occuranceOfThreeWeps[firstTripleWepName].occurances;

  let singleWepFreq = 0;
  let singleWepWins = 0;
//trim MathResults down to 2 or 3 spaces

for(index in occuranceOfSingleWep) {

  // singleWepIcon = manifest[index];
  if(occuranceOfSingleWep[index].secondaryWepKey) {
    singleWepIcon = manifest[index];
    singleWepIcon1 = manifest[occuranceOfSingleWep[index].secondaryWepKey];
  
    singleWepFreq = occuranceOfSingleWep[index].occurances;
    singleWepWins = occuranceOfSingleWep[index].winCount;

    singleMathResult = (occuranceOfSingleWep[index].winCount/occuranceOfSingleWep[index].occurances).toFixed(2);

    $('#weaponClusters').append(`
    <div class="singleWepDiv"><div class="weaponDiv"><img src="https://www.bungie.net${singleWepIcon[1]
    }"><p class="singleWepName">${
    singleWepIcon[0]
    }</p></div>
    <div class="weaponDiv"><img src="https://www.bungie.net${singleWepIcon1[1]
    }" alt="secondWepIcon"><p class="singleWepName">${
    singleWepIcon1[0]
    }</p></div><p class="timesUsed">Times Used: ${occuranceOfSingleWep[index].occurances}</p>
    <p class="wins">Win Count: ${occuranceOfSingleWep[index].winCount}</p><p class="winRateDiv">Win Rate: ${singleMathResult}</p></div>`);
  }
}


  // for(index in occuranceOfThreeWeps) {

  //   tripleWepIcon1 = manifest[index];
  //   tripleWepIcon2 = manifest[occuranceOfThreeWeps[index].secondaryWepKey];
  //   tripleWepIcon3 = manifest[occuranceOfThreeWeps[index].tertiaryWepKey];
  //   tripleWepFreq = occuranceOfThreeWeps[index].occurances;
  //   tripleWepWins = occuranceOfThreeWeps[index].winCount;

  //   tripleMathResult = occuranceOfThreeWeps[index].winCount/occuranceOfThreeWeps[index].occurances;

  //   $('#weaponClusters').append(`
  //   <div class="singleWepDiv"><div class="weaponDiv"><img src="https://www.bungie.net${tripleWepIcon1[1]
  //   }"><p class="singleWepName">${
  //   tripleWepIcon1[0]
  //   }</p></div><div class="weaponDiv">
  //   <img src="https://www.bungie.net${tripleWepIcon2[1]
  //   }"><p class="singleWepName">${
  //   tripleWepIcon2[0]
  //   }</p></div><div class="weaponDiv">
  //   <img src="https://www.bungie.net${tripleWepIcon3[1]
  //   }"><p class="singleWepName">${
  //   tripleWepIcon3[0]
  //   }</p></div><p class="timesUsed">Times Used: ${occuranceOfThreeWeps[index].occurances}</p>
  //   <p class="wins">Win Count: ${occuranceOfThreeWeps[index].winCount}</p><p class="winRateDiv">Win Rate: ${tripleMathResult}</p></div>`);
  // }

  $("#saveLoadout").html(
    `<button type="submit" id="saveButton">Save loadout</button>`
  );

  $("#updateLoadout").html(
    `<button type="submit" id="updateButton">Update Loadout</button>`
  );


//////////////////////////////////////////////////////////////////////////////////////

  $("#saveLoadout").submit(event => {
    event.preventDefault();
    let weaponObject = occuranceOfSingleWep[highestSingleWepName];
    let wepName1 = highestSingleWepName;
    let characterId = membsId;
    console.log(weaponObject);
  
    const settings = {
      url:"/loadouts",
      method: "POST",
      dataType: "JSON",
      data: {
        "character": 5000,
        "primaryWepKey": wepName1,
        "weaponObject": weaponObject,
      },
      success: function(data) {
        console.log("Success!", data);
      },
      error: function(data) {
        console.log("Error", data);
      }
    };
  
    $.ajax(settings);
  });

  $("#updateLoadout").submit(event => {
    event.preventDefault();
    let weaponObject = occuranceOfSingleWep[highestSingleWepName];
    let wepName1 = highestSingleWepName;
    let characterId = membsId;
    console.log(weaponObject);
  
    const settings = {
      url:`/loadouts/5000`,
      method: "PATCH",
      contentTypes: "application/json",
      data: {
        "primaryWepKey": wepName1,
        "weaponObject": {secondaryWepKey: 1231242, winCount: 1002, occurances: 921312}
      },
      success: function(data) {
        console.log("Success!", data);
      },
      error: function(data) {
        console.log("Error", data);
      }
    };
  
    $.ajax(settings);
  });

////////////////////////////////////////////////////////////////////////////////////
//account object holding all stats and separate weapons (easiest to configure with least weapon specificity)
//weapon object holding all stats (possibly many, many objects.  possibly not useful unless high amount of data.)
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
      character[Object.keys(character)[0]].emblemPath; //add "Background" between emblem and path for larger emblem
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
      character[Object.keys(character)[1]].emblemPath;
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
      character[Object.keys(character)[2]].emblemPath;
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







//ALLOW DYNAMIC CHARAID so that when character selected, updates weps with relevant games
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
  activityArray = [];
  for(i=0;i<dataA.Response.activities.length;i++) {
    activityArray.push(dataA.Response.activities[i].activityDetails.instanceId);
  }
  console.log(activityArray);

  for(i=0;i<activityArray.length;i++) {
    let realEntry = activityArray[i];
    forEachInstanceId(realEntry, sortThroughGamesPlayed);
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

function sortThroughGamesPlayed(data) {
  console.log(data);
  let players = data.Response.entries;
  for(i=0;i<players.length;i++) {
    if(players[i].extended.weapons) {
      storePlayerInfo(players[i]);
    }
  }
}

//creates weapon cluster object for seeing how many times two weapons are used in tandem with each other and weapon counter object to keep track of individual weapon occurances
function storePlayerInfo(data) {

  //win rates are relatively low right now.  It seems like there's wins and losses (mostly wins) that are tracked, but weapons are untracked if they don't specifically get kills.  Since there's a smaller chance of getting kills with multiple weapons rather than a single weapon, there's proportionally a smaller winrate associated with those.  looking into this as a potential problem, though results are varied and hard to decipher without a deep look.
  if(data.characterId == account.character1.id || data.characterId == account.character2.id || data.characterId == account.character3.id) {
    let primaryWepKey = data.extended.weapons[0].referenceId;

    //figure out how to add duplicates instead of new entry
    

    if(occuranceOfSingleWep[primaryWepKey] != null) {
      occuranceOfSingleWep[primaryWepKey].occurances++;
      occuranceOfSingleWep[primaryWepKey].winCount += data.values.standing.basic.value;
      occuranceOfSingleWep[primaryWepKey].kills += data.values.kills.basic.value;
      occuranceOfSingleWep[primaryWepKey].deaths += data.values.deaths.basic.value;
      occuranceOfSingleWep[primaryWepKey].assists += data.values.assists.basic.value;
      occuranceOfSingleWep[primaryWepKey].grenadeKills += data.extended.values.weaponKillsGrenade.basic.value;
      occuranceOfSingleWep[primaryWepKey].assists += data.extended.values.weaponKillsMelee.basic.value;
      occuranceOfSingleWep[primaryWepKey].assists += data.extended.values.weaponKillsSuper.basic.value;

    }
    else if(data.extended.weapons.length == 1 || data.extended.weapons.length == 2 || data.extended.weapons.length == 3) {
      occuranceOfSingleWep[primaryWepKey] = {winCount: data.values.standing.basic.value, occurances: 1, kills: data.values.kills.basic.value, deaths: data.values.deaths.basic.value, assists: data.values.assists.basic.value, grenadeKills: data.extended.values.weaponKillsGrenade.basic.value, meleeKills: data.extended.values.weaponKillsMelee.basic.value, superKills: data.extended.values.weaponKillsSuper.basic.value};
    }

    if(occuranceOfSingleWep[primaryWepKey] != null && occuranceOfSingleWep[primaryWepKey].secondaryWepKey != null) {
      occuranceOfSingleWep[primaryWepKey].occurances++;
      occuranceOfSingleWep[primaryWepKey].winCount += data.values.standing.basic.value;
      occuranceOfSingleWep[primaryWepKey].kills += data.values.kills.basic.value;
      occuranceOfSingleWep[primaryWepKey].deaths += data.values.deaths.basic.value;
      occuranceOfSingleWep[primaryWepKey].assists += data.values.assists.basic.value;
      occuranceOfSingleWep[primaryWepKey].grenadeKills += data.extended.values.weaponKillsGrenade.basic.value;
      occuranceOfSingleWep[primaryWepKey].assists += data.extended.values.weaponKillsMelee.basic.value;
      occuranceOfSingleWep[primaryWepKey].assists += data.extended.values.weaponKillsSuper.basic.value;
    }

    else if(data.extended.weapons.length == 2) {
      if(primaryWepKey == data.extended.weapons[1].referenceId) { //if secondary key already exists
        let primaryWepKey = data.extended.weapons[1].referenceId;
        occuranceOfSingleWep[primaryWepKey] = {secondaryWepKey: data.extended.weapons[0].referenceId, winCount: data.values.standing.basic.value, occurances: 1, kills: data.values.kills.basic.value, deaths: data.values.deaths.basic.value, assists: data.values.assists.basic.value, grenadeKills: data.extended.values.weaponKillsGrenade.basic.value, meleeKills: data.extended.values.weaponKillsMelee.basic.value, superKills: data.extended.values.weaponKillsSuper.basic.value};
      }
      else {
      let primaryWepKey = data.extended.weapons[0].referenceId; //if secondary key does not exist
      occuranceOfSingleWep[primaryWepKey] = {secondaryWepKey: data.extended.weapons[1].referenceId, winCount: data.values.standing.basic.value, occurances: 1, kills: data.values.kills.basic.value, deaths: data.values.deaths.basic.value, assists: data.values.assists.basic.value, grenadeKills: data.extended.values.weaponKillsGrenade.basic.value, meleeKills: data.extended.values.weaponKillsMelee.basic.value, superKills: data.extended.values.weaponKillsSuper.basic.value};
      }
    }

    // if(occuranceOfThreeWeps[primaryWepKey] != null && occuranceOfThreeWeps[primaryWepKey].secondaryWepKey != null && occuranceOfThreeWeps[primaryWepKey].tertiaryWepKey) {
    //   occuranceOfThreeWeps[primaryWepKey].occurances++;
    //   occuranceOfThreeWeps[primaryWepKey].winCount += data.values.standing.basic.value;
    // } 

    // else if(data.extended.weapons.length == 3) {
    //   occuranceOfThreeWeps[primaryWepKey] = {secondaryWepKey: data.extended.weapons[1].referenceId, tertiaryWepKey: data.extended.weapons[2].referenceId, winCount: data.values.standing.basic.value, occurances: 1};
    // }
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
    }"  alt="weaponIcon"><p class="wepName">${
      currentWeps.kinetic.details[0]
    }</p><p>Kinetic</p></button>`
  );

  $(".js-search-results3").html(
    `<button class="weaponButton" type="submit" value=${
      currentWeps.energy.eHash
    }><img src="https://www.bungie.net${
      currentWeps.energy.details[1]
    }"  alt="weaponIcon"><p class="wepName">${
      currentWeps.energy.details[0]
    }</p><p>Energy</p></button>`
  );

  $(".js-search-results4").html(
    `<button class="weaponButton" type="submit" value=${
      currentWeps.power.pHash
    }><img src="https://www.bungie.net${
      currentWeps.power.details[1]
    }"  alt="weaponIcon"><p class="wepName">${
      currentWeps.power.details[0]
    }</p><p>Power</p></button>`
  );

  //each of the weapon tabs created ^ are buttons with unique values.  this watches for button submissions and updates recommended gear in response.
  $(".weaponForm").submit(event => {
    event.preventDefault();

    //creates display weapon trends button
    // $("#displayWepTrends").html(
    //   `<button type="submit" id="wepTrendsButton">Display Weapon Trends</button>`
    // );

    //creates the save button
    $("#saveLoadout").html(
      `<button type="submit" id="saveButton">Save loadout</button>`
    );

//     $(".js-search-results22").html("");
//     $(".js-search-results33").html("");
//     $(".js-search-results44").html("");

//     let buttonValue = $(event.currentTarget).find(".weaponButton");
//     clickedWep = buttonValue.val();
//     console.log(clickedWep);

//     let wepType = manifest[clickedWep][2];
//     let wepSlot = manifest[clickedWep][3];

//     console.log(wepType, wepSlot);

//     let suggestionTab1 = 0;
//     let suggestionTab2 = 0;
//     let suggestionTab3 = 0;

//     //considers if the weapon is Kinetic, Energy, or Power, and then assigns the proper containers based on that
//     if (wepSlot == 2) {
//       suggestionTab1 = ".js-search-results33";
//       suggestionTab2 = ".js-search-results44";
//       suggestionTab3 = ".js-search-results22";
//     }
//     if (wepSlot == 3) {
//       suggestionTab1 = ".js-search-results22";
//       suggestionTab2 = ".js-search-results44";
//       suggestionTab3 = ".js-search-results33";
//     }
//     if (wepSlot == 4) {
//       suggestionTab1 = ".js-search-results22";
//       suggestionTab2 = ".js-search-results33";
//       suggestionTab3 = ".js-search-results44";
//     }

//     //can be read as "if weapon == kinetic, show Energy and Power suggestions"
//     if (wepSlot == 2) {
//       $(suggestionTab1).html(
//         `<div class="weaponSuggestion"><img src="https://www.bungie.net${
//           goodEHC[1]
//         }"  alt="weaponIcon" class="suggestionIcon"><p class="wepName">${
//           goodEHC[0]
//         }</p><p>Energy</p></div>`
//       );

//       $(suggestionTab2).html(
//         `<div class="weaponSuggestion"><img src="https://www.bungie.net${
//           goodRL[1]
//         }"  alt="weaponIcon" class="suggestionIcon"><p class="wepName">${
//           goodRL[0]
//         }</p><p>Power</p></div>`
//       );

//       $(suggestionTab3).html(`<div class="weaponHolder"><img src="https://www.bungie.net${
//         currentWeps.kinetic.details[1]
//       }"  alt="weaponIcon"><p class="wepName">${
//         currentWeps.kinetic.details[0]
//       }</p><p>Kinetic</p></div>`)
//     }

//     //can be read as "if weapon == energy, show Kinetic and Power suggestions"
//     if (wepSlot == 3) {
//       $(suggestionTab1).html(
//         `<div class="weaponSuggestion"><img src="https://www.bungie.net${
//           goodKHC[1]
//         }"  alt="weaponIcon" class="suggestionIcon"><p class="wepName">${
//           goodKHC[0]
//         }</p><p>Kinetic</p></div>`
//       );

//       $(suggestionTab2).html(
//         `<div class="weaponSuggestion"><img src="https://www.bungie.net${
//           goodRL[1]
//         }"  alt="weaponIcon" class="suggestionIcon"><p class="wepName">${
//           goodRL[0]
//         }</p><p>Power</p></div>`
//       );

//       $(suggestionTab3).html(`<div class="weaponHolder"><img src="https://www.bungie.net${
//         currentWeps.energy.details[1]
//       }"  alt="weaponIcon"><p class="wepName">${
//         currentWeps.energy.details[0]
//       }</p><p>Energy</p></div>`)
//     }

//     //same as the last two, but for "Power" ^
//     if (wepSlot == 4) {
//       $(suggestionTab1).html(
//         `<div class="weaponSuggestion"><img src="https://www.bungie.net${
//           goodKSG[1]
//         }"  alt="weaponIcon" class="suggestionIcon"><p class="wepName">${
//           goodKSG[0]
//         }</p><p>Kinetic</p></div>`
//       );

//       $(suggestionTab2).html(
//         `<div class="weaponSuggestion"><img src="https://www.bungie.net${
//           goodEHC[1]
//         }"  alt="weaponIcon" class="suggestionIcon"><p class="wepName">${
//           goodEHC[0]
//         }</p><p>Energy</p></div>`
//       );

//       $(suggestionTab3).html(`<div class="weaponHolder"><img src="https://www.bungie.net${
//         currentWeps.power.details[1]
//       }"  alt="weaponIcon"><p class="wepName">${
//         currentWeps.power.details[0]
//       }</p><p>Power</p></div>`)
//     }
  });
}





function watchSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
  $('#characterPage').show();
  $("#displayWepTrends").html(
    `<button type="submit" id="wepTrendsButton">Display Weapon Trends</button>`
  );
    let queryTarget = $(event.currentTarget).find(".js-query");
    let query = queryTarget.val();
    console.log(query);
    membsType = queryTarget2.val();
    $(".js-search-results").html("");
    $(".js-search-results2").html("");
    $(".js-search-results3").html("");
    $(".js-search-results4").html("");
    searchByUsername(query, setIdFromUsername);
  });
}

$(watchSubmit);

$(document).ready(function() {
  $('#characterPage').hide();
});