let queryTarget2 = $(".js-search-form").find("#type");
let membsType = queryTarget2.val();
let membsId = 0;
let displayName = "";
let nameRequest = {};
let charactersAndEquipment = {};
let account = {};
let overall = {};
let allCharGameHistories = {};
let extendedObj = {};
let testArrayForKeys = [];
let objVals = [];
let objKeys = [];
let activityArray = [];
let averagesArray = [];
let averagesNames = [];
let weaponStatBank = {};
let weaponTypes = ["Sidearm", "Auto Rifle", "Pulse Rifle", "Combat Bow", "Scout Rifle", "Hand Cannon", "Sniper Rifle", "Submachine Gun", "Trace Rifle", "Linear Fusion Rifle", "Grenade Launcher", "Shotgun", "Rocket Launcher", "Sword", "Machine Gun"];
let refreshCounter = 0;
let currentCounter = 0;
let activitiesEntered = 0;
let activitiesUsed = 0;
let clickedChar = 0;
let clickedWep = 0;
let activeChar = 0;
let charTab = 0;
let count = 0;
let qq = 0;
let cumulativeValue = 0;



const titanBackground = "https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-titan-4k.jpg";
const hunterBackground = "https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-Hunter-4k.jpg";
const warlockBackground = "https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-warlock-4k.jpg";




//GOALS:
//WEAPON RANKS AGAINST EACH OTHER
//WEAPON COMPARISON AGAINST AVERAGE
//GEAR VALUES / WEAKNESSES
//POSSIBLE INTEGRATION WITH REAL-WORLD STATS?

//WHEN SEARCH USED, CHECK IF PROFILE IN DATABASES
//IF IT IS: UPDATE IT.
//IF IT IS NOT: SAVE PROFILE TO GLOBAL DB.
//DELETE PROFILE AFTER X AMOUNT OF TIME (OR ON ANOTHER DELETE CONDITION)





//   FOR(KEY IN OBJECT) {ARRAY.PUSH(OBJECT.KEY), ARRAY2.PUSH(OBJECT.KEY.VALUE)}



//drop-down Membership Type selector
$("#type").click(event => {
  event.preventDefault();
  membsType = queryTarget2.val();
  console.log(membsType);
});

//first API query that gathers Bungie ID
function searchByUsername(searchTerm, callback) {
  var searchTerm = searchTerm.replace("#", "%23");
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
  console.log("nameRequest: ", data);
  nameRequest = data;
  membsId = data.Response[0].membershipId;
  displayName = data.Response[0].displayName;
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//extracts and stores information for character tabs
function displayProfiles(data) {
  console.log("charactersAndEquipment: ", data);
  charactersAndEquipment = data;
  // let testArrayForKeys = [];
  let characterTypeValues = ["Titan", "Hunter", "Warlock"];

  for (characterIds in charactersAndEquipment.Response.characters.data) {
    testArrayForKeys.push(characterIds);
  }

  console.log("testArrayForKeys: ", testArrayForKeys);


  $(".js-search-results").prepend(`<h2 id="characterName">${displayName}</h2>`);

  for (i=0;i<testArrayForKeys.length;i++) {
    let whichCharacter = testArrayForKeys[i];
    let characterAccessor = charactersAndEquipment.Response.characters.data[whichCharacter];
    let whatType = characterAccessor.classType;

      $(".js-search-results").append(
        `<form class="characterForm" action="#"><button class="${characterTypeValues[whatType]} characterButton" type="submit" value="${i}"><img src="https://www.bungie.net${characterAccessor.emblemPath}" alt="characterEmblem"><p class="classy">Character level: ${characterAccessor.baseCharacterLevel} </p><p class="classy">Light level: ${characterAccessor.light} </p><p>ID: ${testArrayForKeys[i]}</p></button></form>`
      );
  }

  getActivityStats();
}


//   FOR(KEY IN OBJECT) {ARRAY.PUSH(OBJECT.KEY), ARRAY2.PUSH(OBJECT.KEY.VALUE)}
//MAKE PROMISES FOR GETACTIVITYSTATS TO MAKE LOOK CLEANER AND PRACTICE?
function getActivityStats() {
  let charaId = testArrayForKeys[0];
  console.log("Character ID: ", charaId, "Membership Type: ", membsType, "Membership ID: ", membsId);
  $.ajax({
    url: "/bungie3",
    type: "GET",
    data: {
      membsType: membsType,
      membsId: membsId,
      characterId: charaId
    },
    success: function(data) {
      allCharGameHistories["charOneGameHistory"] = {data};
      // processActivityStats(data);
      getActivityStats2();
    }
  });
}

function getActivityStats2() {
  let charaId = testArrayForKeys[1];
  console.log("Character ID: ", charaId, "Membership Type: ", membsType, "Membership ID: ", membsId);
  $.ajax({
    url: "/bungie3",
    type: "GET",
    data: {
      membsType: membsType,
      membsId: membsId,
      characterId: charaId
    },
    success: function(data) {
      allCharGameHistories["charTwoGameHistory"] = {data};
      // processActivityStats(data);
      getActivityStats3();
    }
  });
}

function getActivityStats3() {
  let charaId = testArrayForKeys[2];
  console.log("Character ID: ", charaId, "Membership Type: ", membsType, "Membership ID: ", membsId);
  $.ajax({
    url: "/bungie3",
    type: "GET",
    data: {
      membsType: membsType,
      membsId: membsId,
      characterId: charaId
    },
    success: function(data) {
      allCharGameHistories["charThreeGameHistory"] = {data};
      processActivityStats(allCharGameHistories);
    }
  });
}

function processActivityStats(currentObj) {
  console.log("allCharGameHistories: ", currentObj);

  for(entry in currentObj) {
    console.log("Entry: ", entry);
    for(game in currentObj[entry].data.Response.activities) {
      console.log("Game: ", game);
      let newEntry = currentObj[entry].data.Response.activities[game].activityDetails.instanceId
      activityArray.push(newEntry);
    }
  }
  console.log("activityArray: ", activityArray);
  setTimeout(theDaySaver(), 3000);
}

function theDaySaver() {
  let realEntry = activityArray[qq];
  forEachInstanceId(realEntry); 
}

function forEachInstanceId(entry) {
  $.ajax({
    url: "/bungie4",
    type: "GET",
    data: {
      instId: entry
    },
    success: function(data) {
      sortThroughGamesPlayed(data);
    },
    error: function(data) {
      console.log("Error in forEachInstanceId", data);
    }
  });
}

function sortThroughGamesPlayed(data) {
  console.log("Response from Bungie4", data);

  currentCounter++;
  if(currentCounter == 15) {
    saveEverything();
    // sortEverything();
  }

  let players = data.Response.entries;
  for(i=0;i<players.length;i++) {
    if(players[i].extended.weapons) {
      storePlayerInfo(players[i]);
    }
  }
  qq++;
  if(qq < activityArray.length) {
    theDaySaver();
  }
}

let emptyArray = [];

function sortEverything() {
  for(index in weaponStatBank) {
    saveEverything(weaponStatBank[index]);
  }
}

function saveEverything(theObj) {
  console.log("Save Everything");

  const settings = {
    url:"/loadouts",
    method: "POST",
    dataType: "JSON",
    data: {
      "weaponObject": weaponStatBank
    },
    success: function(data) {
      console.log("Success!", data);
    },
    error: function(data) {
      console.log("Error", data);
    }
  };

  $.ajax(settings);
}

//creates objects holding respective stats for each weapon used
function storePlayerInfo(data) {
  refreshCounter += 1;

  if(data.characterId == testArrayForKeys[0] || data.characterId == testArrayForKeys[1] || data.characterId == testArrayForKeys[2]) {
    let primaryWepKey = data.extended.weapons[0].referenceId;
    let OoSW = weaponStatBank[primaryWepKey];

    if(weaponStatBank[primaryWepKey] != null) {
      if(OoSW.refId == data.extended.weapons[0].referenceId) {
        OoSW.occurrences++; //make refid gameid + unique
        OoSW.lossCount += data.standing;
        OoSW.kills += data.values.kills.basic.value;
        OoSW.deaths += data.values.deaths.basic.value;
        OoSW.assists += data.values.assists.basic.value;
        OoSW.averageScorePerKill += data.values.averageScorePerKill.basic.value;
        OoSW.averageScorePerLife += data.values.averageScorePerLife.basic.value;
        OoSW.efficiency += data.values.efficiency.basic.value;
        OoSW.weaponKills += data.extended.weapons[0].values.uniqueWeaponKills.basic.value;
        OoSW.weaponPrecisionKills += data.extended.weapons[0].values.uniqueWeaponPrecisionKills.basic.value;
        OoSW.grenadeKills += data.extended.values.weaponKillsGrenade.basic.value;
        OoSW.assists += data.extended.values.weaponKillsMelee.basic.value;
        OoSW.assists += data.extended.values.weaponKillsSuper.basic.value;
      }
    
      else if(OoSW.refId == data.extended.weapons[1].referenceId) {
        OoSW.occurrences++;
        OoSW.lossCount += data.standing;
        OoSW.kills += data.values.kills.basic.value;
        OoSW.deaths += data.values.deaths.basic.value;
        OoSW.assists += data.values.assists.basic.value;
        OoSW.averageScorePerKill += data.values.averageScorePerKill.basic.value;
        OoSW.averageScorePerLife += data.values.averageScorePerLife.basic.value;
        OoSW.efficiency += data.values.efficiency.basic.value;
        OoSW.weaponKills += data.extended.weapons[1].values.uniqueWeaponKills.basic.value;
        OoSW.weaponPrecisionKills += data.extended.weapons[1].values.uniqueWeaponPrecisionKills.basic.value;
        OoSW.grenadeKills += data.extended.values.weaponKillsGrenade.basic.value;
        OoSW.assists += data.extended.values.weaponKillsMelee.basic.value;
        OoSW.assists += data.extended.values.weaponKillsSuper.basic.value;
      }

      else if(OoSW.refId == data.extended.weapons[2].referenceId) {
        OoSW.occurrences++;
        OoSW.lossCount += data.standing;
        OoSW.kills += data.values.kills.basic.value;
        OoSW.deaths += data.values.deaths.basic.value;
        OoSW.assists += data.values.assists.basic.value;
        OoSW.averageScorePerKill += data.values.averageScorePerKill.basic.value;
        OoSW.averageScorePerLife += data.values.averageScorePerLife.basic.value;
        OoSW.efficiency += data.values.efficiency.basic.value;
        OoSW.weaponKills += data.extended.weapons[2].values.uniqueWeaponKills.basic.value;
        OoSW.weaponPrecisionKills += data.extended.weapons[2].values.uniqueWeaponPrecisionKills.basic.value;
        OoSW.grenadeKills += data.extended.values.weaponKillsGrenade.basic.value;
        OoSW.assists += data.extended.values.weaponKillsMelee.basic.value;
        OoSW.assists += data.extended.values.weaponKillsSuper.basic.value;
      }
    }

    else if(data.extended.weapons.length == 1 || data.extended.weapons.length == 2 || data.extended.weapons.length == 3) {
      weaponStatBank[primaryWepKey] = {characterReference: displayName, refId: data.extended.weapons[0].referenceId, wepType: manifest[primaryWepKey][2], wepSlot: manifest[primaryWepKey][3], lossCount: data.standing, occurrences: 1, kills: data.values.kills.basic.value, deaths: data.values.deaths.basic.value, assists: data.values.assists.basic.value, averageScorePerKill: data.values.averageScorePerKill.basic.value, averageScorePerLife: data.values.averageScorePerLife.basic.value, efficiency: data.values.efficiency.basic.value, weaponKills: data.extended.weapons[0].values.uniqueWeaponKills.basic.value, weaponPrecisionKills: data.extended.weapons[0].values.uniqueWeaponPrecisionKills.basic.value, grenadeKills: data.extended.values.weaponKillsGrenade.basic.value, meleeKills: data.extended.values.weaponKillsMelee.basic.value, superKills: data.extended.values.weaponKillsSuper.basic.value};
    }
  }
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// $("#displayWepTrends").submit(event => {
//   event.preventDefault();
function loadWepStats(dataInStore) {
  weaponStatBank = dataInStore[0].weapons;
  console.log("weaponStatBank: ", weaponStatBank);
  $("#weaponClusters").html("");
  let mostOccurrences = 0;
  let mostPopularWeapon = 0;

  Object.keys(weaponStatBank).forEach(function(a,b) {
    if(weaponStatBank[a].occurrences > mostOccurrences) {
      mostOccurrences = weaponStatBank[a].occurrences;
      mostPopularWeapon = a;
      // averagesArray.push(mostPopularWeapon);  implement later for descending order wep bank
    }
  })



  let manifestShortcut = manifest[mostPopularWeapon];
  let winRate = weaponStatBank[mostPopularWeapon].lossCount/weaponStatBank[mostPopularWeapon].occurrences;

  for(index in weaponStatBank) {
    manifestShortcut = manifest[index];
    wepFreq = weaponStatBank[index].occurrences;
    wepWins = weaponStatBank[index].lossCount;
    weaponKillsandAssists = (weaponStatBank[index].assists/weaponStatBank[index].kills*100).toFixed(2);
    kD = (weaponStatBank[index].kills/weaponStatBank[index].deaths).toFixed(2);
    kDa = ((weaponStatBank[index].kills+weaponStatBank[index].assists)/weaponStatBank[index].deaths).toFixed(2);
    grenadeKills = (weaponStatBank[index].grenadeKills/weaponStatBank[index].kills*100).toFixed(2);
    meleeKills = (weaponStatBank[index].meleeKills/weaponStatBank[index].kills*100).toFixed(2);
    superKills = (weaponStatBank[index].superKills/weaponStatBank[index].kills*100).toFixed(2);
    gunKills = (weaponStatBank[index].weaponKills/weaponStatBank[index].kills*100).toFixed(2);
    gunPrecisionKills = (weaponStatBank[index].weaponPrecisionKills/weaponStatBank[index].weaponKills*100).toFixed(2);
    winRate = ((1-(weaponStatBank[index].lossCount/weaponStatBank[index].occurrences))*100).toFixed(2);
    avScorePerKill = (weaponStatBank[index].averageScorePerKill/weaponStatBank[index].occurrences).toFixed(2);
    avScorePerLife = (weaponStatBank[index].averageScorePerLife/weaponStatBank[index].occurrences).toFixed(2);
    eff = (weaponStatBank[index].efficiency/weaponStatBank[index].occurrences).toFixed(2);


    if(winRate>100) {
      winRate = 100;
    }
    else if(winRate<0) {
      winRate = 0;
    }

    $('#weaponClusters2').append(`
    <div class="testClass"><p id="wepDisplayName">${manifestShortcut[0]}</p><p id="wepDisplayType">${manifestShortcut[2]}</p>
    <img src="https://www.bungie.net${manifestShortcut[1]}" alt="weaponStatsImg">
    <div class="statHolder">
    <p class="stats timesUsed">Times Used: ${weaponStatBank[index].occurrences}</p>
    <p class="stats winRate">Win Rate: ${winRate}%</p>
    <p class="stats kD">K/D: ${kD}</p>
    <p class="stats kaD">KA/D: ${kDa}</p>
    <p class="stats efficiency">Efficiency: ${eff}</p>
    <p class="stats averageScorePerKill">Average Score per Kill: ${avScorePerKill}</p>
    <p class="stats averageScorePerLife">Average Score per Life: ${avScorePerLife}</p>
    <p class="stats killsVAssists">Kills vs Assists: ${weaponKillsandAssists}%</p>
    <p class="stats weaponKills">Weapon Kills: ${gunKills}%</p>
    <p class="stats weaponPrecisionKills">Weapon Precision Kills: ${gunPrecisionKills}%</p>
    <p class="stats grenadeKills">Grenade Kills: ${grenadeKills}%</p>
    <p class="stats meleeKills">Melee Kills: ${meleeKills}%</p>
    <p class="stats superKills">Super Kills: ${superKills}%</p>
    </div></div>`);
  }


  $("#deleteProfile").submit(event => {
    event.preventDefault();
  
    const settings = {
      url:`/loadouts/:${membsId}`,
      method: "DELETE",
      dataType: "JSON",

      success: function(data) {
        console.log("Success!", data);
      },
      error: function(data) {
        console.log("Error", data);
      }
    };
  
    $.ajax(settings);
  });

  $("#checkTest").submit(event => {
    event.preventDefault();
  
    const settings = {
      // url:`/loadouts/:${membsId}`,
      url:"/loadouts",
      method: "PUT",
      dataType: "JSON",
      // header: {
      //   "Content-Type": "application/json"
      // },
      data: {
        "character": membsId,
        "weaponObject": weaponStatBank
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

  $("#saveProfile").submit(event => {
    event.preventDefault();
    console.log(weaponStatBank);
  
    const settings = {
      url:"/loadouts",
      method: "POST",
      dataType: "JSON",
      data: {
        "character": membsId,
        "weaponObject": weaponStatBank
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
}


  //will display the saved profile
$("#displayProfile").submit(event => {
    event.preventDefault();
    activityArray = [];
    // weaponStatBank = {};
    console.log("activity array cleared");
    sortAllTimeData();
});

function sortAllTimeData() {
  console.log("First Sort Firing");
  let firstCharacter = account.character1.id;



  const settings1 = {
    url:"/bungie6",
    type: "GET",
    data: {
      membsType: membsType,
      membsId: membsId,
      characterId: firstCharacter,
    },
    success: function(data) {
      extendedObj["charOneGameHistory"] = {data};
      secondSort();
    },
    error: function(data) {
      console.log("Error", data);
    }
  };
  $.ajax(settings1);
}

function secondSort() {
  console.log("Second Sort Firing");
  let secondCharacter = account.character2.id;

  const settings2 = {
    url:"/bungie6",
    type: "GET",
    data: {
      membsType: membsType,
      membsId: membsId,
      characterId: secondCharacter,
    },
    success: function(data) {
      extendedObj["charTwoGameHistory"] = {data};
      thirdSort();
    },
    error: function(data) {
      console.log("Error", data);
    }
  };
  $.ajax(settings2);
}

function thirdSort() {
  console.log("Third Sort Firing");
  let thirdCharacter = account.character3.id;

  const settings3 = {
    url:"/bungie6",
    type: "GET",
    data: {
      membsType: membsType,
      membsId: membsId,
      characterId: thirdCharacter,
    },
    success: function(data) {
      extendedObj["charThreeGameHistory"] = {data};
      processActivityStats(extendedObj); 
    },
    error: function(data) {
      console.log("Error", data);
    }
  };
  $.ajax(settings3);  
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function watchSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    $('#characterPage').show();
    $("#displayWepTrends").html(
    `<button type="submit" id="wepTrendsButton">Display Weapon Trends</button>`
    );
    let signupCentering = document.getElementById("loginSignupContainer");
    signupCentering.classList.remove("onLoadCentering");
    activityArray = [];
    currentCounter = 0;
    let queryTarget = $(event.currentTarget).find(".js-query");
    let query = queryTarget.val();
    console.log(query);
    getEverything(query);
    membsType = queryTarget2.val();
    $(".js-search-results").html("");
    $(".js-search-results2").html("");
    $(".js-search-results3").html("");
    $(".js-search-results4").html("");
    searchByUsername(query, setIdFromUsername);
  });
}

function getEverything(query) {
  console.log("Get Everything");

  const settings = {
    url:"/loadouts",
    method: "GET",
    dataType: "JSON",
    data: {
      "characterReference": query
    },
    success: function(data) {
      if(data[0].weapons) {
        console.log("Load Wep Stats", data);
        loadWepStats(data);
      }
      else {
        console.log("Search By Username", data);
        searchByUsername(query, setIdFromUsername);
      }
      console.log("Success!", data);
    },
    error: function(data) {
      console.log("Error", data);
    }
  };

  $.ajax(settings);
}

$(watchSubmit);

$(document).ready(function() {
  $('#characterPage').hide();
});