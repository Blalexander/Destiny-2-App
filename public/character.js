let queryTarget2 = $(".js-search-form").find("#type");
let membsType = queryTarget2.val();
let membsId = 0;
let displayName = "";
let account = {};
let overall = {};
let newObj = {};
let extendedObj = {};
let objVals = [];
let objKeys = [];
let activityArray = [];
let occurrenceOfSingleWep = {};
let occurrenceOfTwoWeps = {};
let occurrenceOfThreeWeps = {};
let refreshCounter = 0;
let activitiesEntered = 0;
let activitiesUsed = 0;
let clickedChar = 0;
let clickedWep = 0;
let activeChar = 0;
let charTab = 0;
let count = 0;
let qq = 0;



const titanBackground = "https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-titan-4k.jpg";
const hunterBackground = "https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-Hunter-4k.jpg";
const warlockBackground = "https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-warlock-4k.jpg";





//drop-down Membership Type selector
$("#type").click(event => {
  event.preventDefault();
  membsType = queryTarget2.val();
  console.log(membsType);
});

let fillErUp = [];
let array1 = [];
let array2 = [];
let array3 = [];
let array4 = [];
let arrayObj = {};
let q = 0;
let highestYet = 0;
let needsThis = "";
function doSomeMath() {
  for(needsMath in occurrenceOfSingleWep) {
    needsThis = needsMath;
    for(needsExtract in occurrenceOfSingleWep[needsMath]) {
      array1.push(needsExtract);
      array2.push(needsThis);
      array3.push(occurrenceOfSingleWep[needsThis][needsExtract]);
    }
  }
}

function doSomeMore() {
  let iterator = 0;
  for(i=4;i<array1.length;i+=16) {
    array4[iterator] = array3[i];
    iterator++;
  }
}

$("#displayWepTrends").submit(event => {
  event.preventDefault();
  doSomeMath();
  doSomeMore();
  console.log(array1, array2, array3, array4);
// function loadWepStats() {
  console.log(refreshCounter);
  console.log(occurrenceOfSingleWep);
  $("#weaponClusters").html("");
  let highestSingleWep = 0;
  let highestSingleWepName = 0;

  Object.keys(occurrenceOfSingleWep).forEach(function(a,b) {
    if(occurrenceOfSingleWep[a].occurrences > highestSingleWep) {
      highestSingleWep = occurrenceOfSingleWep[a].occurrences;
      highestSingleWepName = a;
      highestSingleWepName1 = occurrenceOfSingleWep[a].secondaryWepKey;
    }
  })

  let singleWepIcon = manifest[highestSingleWepName];

  let singleMathResult = occurrenceOfSingleWep[highestSingleWepName].lossCount/occurrenceOfSingleWep[highestSingleWepName].occurrences;


for(index in occurrenceOfSingleWep) {
    singleWepIcon = manifest[index];
    singleWepIcon1 = manifest[occurrenceOfSingleWep[index].secondaryWepKey];
  
    singleWepFreq = occurrenceOfSingleWep[index].occurrences;
    singleWepWins = occurrenceOfSingleWep[index].lossCount;

    singleWepKAssists = (occurrenceOfSingleWep[index].assists/occurrenceOfSingleWep[index].kills*100).toFixed(2);
    singleWepKd = (occurrenceOfSingleWep[index].kills/occurrenceOfSingleWep[index].deaths).toFixed(2);
    singleWepKda = ((occurrenceOfSingleWep[index].kills+occurrenceOfSingleWep[index].assists)/occurrenceOfSingleWep[index].deaths).toFixed(2);
    singleWepNadeKills = (occurrenceOfSingleWep[index].grenadeKills/occurrenceOfSingleWep[index].kills*100).toFixed(2);
    singleWepMeleeKills = (occurrenceOfSingleWep[index].meleeKills/occurrenceOfSingleWep[index].kills*100).toFixed(2);
    singleWepSuperKills = (occurrenceOfSingleWep[index].superKills/occurrenceOfSingleWep[index].kills*100).toFixed(2);
    singleWeaponKills = (occurrenceOfSingleWep[index].weaponKills/occurrenceOfSingleWep[index].kills*100).toFixed(2);
    singleWeaponPrecisionKills = (occurrenceOfSingleWep[index].weaponPrecisionKills/occurrenceOfSingleWep[index].weaponKills*100).toFixed(2);
    singleMathResult = ((1-(occurrenceOfSingleWep[index].lossCount/occurrenceOfSingleWep[index].occurrences))*100).toFixed(2);
    singleScorePKill = (occurrenceOfSingleWep[index].averageScorePerKill/occurrenceOfSingleWep[index].occurrences).toFixed(2);
    singleScorePLife = (occurrenceOfSingleWep[index].averageScorePerLife/occurrenceOfSingleWep[index].occurrences).toFixed(2);
    singleEfficiency = (occurrenceOfSingleWep[index].efficiency/occurrenceOfSingleWep[index].occurrences).toFixed(2);


    if(singleMathResult>100) {
      singleMathResult = 100;
    }
    else if(singleMathResult<0) {
      singleMathResult = 0;
    }


    $('#weaponClusters').append(`
    <button class="singleWepDiv" value="${index}"><div class="weaponDiv"><img src="https://www.bungie.net${singleWepIcon[1]
    }"><p class="singleWepName">${
    singleWepIcon[0]
    }</p></div></button>`);
    
    $('#weaponClusters2').append(`
    <div class="testClass"><p id="wepDisplayName">${singleWepIcon[0]}</p><p id="wepDisplayType">${singleWepIcon[2]}</p>
    <img src="https://www.bungie.net${singleWepIcon[1]}" alt="weaponStatsImg"></div>
    <div class="statHolder" id="${index}">
    <p class="stats timesUsed">Times Used: ${occurrenceOfSingleWep[index].occurrences}</p>
    <div class="lines line1"></div>
    <p class="stats winRate">Win Rate: ${singleMathResult}%</p>
    <div class="lines line2"></div>
    <p class="stats kD">K/D: ${singleWepKd}</p>
    <div class="lines line3"></div>
    <p class="stats kaD">KA/D: ${singleWepKda}</p>
    <div class="lines line4"></div>
    <p class="stats efficiency">Efficiency: ${singleEfficiency}</p>
    <div class="lines line5"></div>
    <p class="stats averageScorePerKill">Average Score per Kill: ${singleScorePKill}</p>
    <div class="lines line6"></div>
    <p class="stats averageScorePerLife">Average Score per Life: ${singleScorePLife}</p>
    <div class="lines line7"></div>
    <p class="stats killsVAssists">Kills vs Assists: ${singleWepKAssists}%</p>
    <div class="lines line8"></div>
    <p class="stats weaponKills">Weapon Kills: ${singleWeaponKills}%</p>
    <div class="lines line9"></div>
    <p class="stats weaponPrecisionKills">Weapon Precision Kills: ${singleWeaponPrecisionKills}%</p>
    <div class="lines line10"></div>
    <p class="stats grenadeKills">Grenade Kills: ${singleWepNadeKills}%</p>
    <div class="lines line11"></div>
    <p class="stats meleeKills">Melee Kills: ${singleWepMeleeKills}%</p>
    <div class="lines line12"></div>
    <p class="stats superKills">Super Kills: ${singleWepSuperKills}%</p>
    <div class="lines line13"></div>
    </div>`);
  }
  

  $('.singleWepDiv').mouseenter(function(event) {
    let a = $(event.currentTarget).val();
    $('#weaponClusters2').html("");


    singleWepIcon = manifest[a];
    singleWepIcon1 = manifest[occurrenceOfSingleWep[a].secondaryWepKey];
  
    singleWepFreq = occurrenceOfSingleWep[a].occurrences;
    singleWepWins = occurrenceOfSingleWep[a].lossCount;

    singleWepKAssists = (occurrenceOfSingleWep[a].assists/occurrenceOfSingleWep[a].kills*100).toFixed(2);
    singleWepKd = (occurrenceOfSingleWep[a].kills/occurrenceOfSingleWep[a].deaths).toFixed(2);
    singleWepKda = ((occurrenceOfSingleWep[a].kills+occurrenceOfSingleWep[a].assists)/occurrenceOfSingleWep[a].deaths).toFixed(2);
    singleWepNadeKills = (occurrenceOfSingleWep[a].grenadeKills/occurrenceOfSingleWep[a].kills*100).toFixed(2);
    singleWepMeleeKills = (occurrenceOfSingleWep[a].meleeKills/occurrenceOfSingleWep[a].kills*100).toFixed(2);
    singleWepSuperKills = (occurrenceOfSingleWep[a].superKills/occurrenceOfSingleWep[a].kills*100).toFixed(2);
    singleWeaponKills = (occurrenceOfSingleWep[a].weaponKills/occurrenceOfSingleWep[a].kills*100).toFixed(2);
    singleWeaponPrecisionKills = (occurrenceOfSingleWep[a].weaponPrecisionKills/occurrenceOfSingleWep[a].weaponKills*100).toFixed(2);
    singleMathResult = ((1-(occurrenceOfSingleWep[a].lossCount/occurrenceOfSingleWep[a].occurrences))*100).toFixed(2);
    singleScorePKill = (occurrenceOfSingleWep[a].averageScorePerKill/occurrenceOfSingleWep[a].occurrences).toFixed(2);
    singleScorePLife = (occurrenceOfSingleWep[a].averageScorePerLife/occurrenceOfSingleWep[a].occurrences).toFixed(2);
    singleEfficiency = (occurrenceOfSingleWep[a].efficiency/occurrenceOfSingleWep[a].occurrences).toFixed(2);


    if(singleMathResult>100) {
      singleMathResult = 100;
    }
    else if(singleMathResult<0) {
      singleMathResult = 0;
    }

    $('#weaponClusters2').html(`
    <div class="testClass"><p id="wepDisplayName">${singleWepIcon[0]}</p><p id="wepDisplayType">${singleWepIcon[2]}</p>
    <img src="https://www.bungie.net${singleWepIcon[1]}" alt="weaponStatsImg"></div>
    <div class="statHolder" id="${a}">
    <p class="stats timesUsed">Times Used: ${occurrenceOfSingleWep[a].occurrences}</p>
    <div class="lines line1"></div>
    <p class="stats winRate">Win Rate: ${singleMathResult}%</p>
    <div class="lines line2"></div>
    <p class="stats kD">K/D: ${singleWepKd}</p>
    <div class="lines line3"></div>
    <p class="stats kaD">KA/D: ${singleWepKda}</p>
    <div class="lines line4"></div>
    <p class="stats efficiency">Efficiency: ${singleEfficiency}</p>
    <div class="lines line5"></div>
    <p class="stats averageScorePerKill">Average Score per Kill: ${singleScorePKill}</p>
    <div class="lines line6"></div>
    <p class="stats averageScorePerLife">Average Score per Life: ${singleScorePLife}</p>
    <div class="lines line7"></div>
    <p class="stats killsVAssists">Kills vs Assists: ${singleWepKAssists}%</p>
    <div class="lines line8"></div>
    <p class="stats weaponKills">Weapon Kills: ${singleWeaponKills}%</p>
    <div class="lines line9"></div>
    <p class="stats weaponPrecisionKills">Weapon Precision Kills: ${singleWeaponPrecisionKills}%</p>
    <div class="lines line10"></div>
    <p class="stats grenadeKills">Grenade Kills: ${singleWepNadeKills}%</p>
    <div class="lines line11"></div>
    <p class="stats meleeKills">Melee Kills: ${singleWepMeleeKills}%</p>
    <div class="lines line12"></div>
    <p class="stats superKills">Super Kills: ${singleWepSuperKills}%</p>
    <div class="lines line13"></div>
    </div>`);
  })


  // $("#deleteProfile").html(
  //   `<button type="submit" id="deleteButton">Untrack Account</button>`
  // );

  // $("#displayProfile").html(
  //   `<button type="submit" id="updateButton">Get Full Stats</button>`
  // );

  // $("#checkTest").html(
  //   `<button type="submit" id="checkTestBut">CHECKING</button>`
  // );


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
        "weaponObject": occurrenceOfSingleWep
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


//////////////////////////////////////////////////////////////////////////////////////

  //saves searched profile to account for long-term stats
  $("#saveProfile").submit(event => {
    event.preventDefault();
    console.log(occurrenceOfSingleWep);
  
    const settings = {
      url:"/loadouts",
      method: "POST",
      dataType: "JSON",
      data: {
        "character": membsId,
        // "userId": ,
        "weaponObject": occurrenceOfSingleWep
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
});


  //will display the saved profile
$("#displayProfile").submit(event => {
    event.preventDefault();
    activityArray = [];
    // occurrenceOfSingleWep = {};
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
      processActivityStats(extendedObj); //infinite loop somewhere here + initial errors in console
    },
    error: function(data) {
      console.log("Error", data);
    }
  };
  $.ajax(settings3);  
}

////////////////////////////////////////////////////////////////////////////////////
// });

function processActivityStats1(dataA) {
  console.log(dataA);
  // activityArray = [];  will reset completely on every entry

  for(i=0;i<dataA.Response.activities.length;i++) {
    activityArray.push(dataA.Response.activities[i].activityDetails.instanceId);
  }
  console.log(activityArray);

  // if(activityArray.length >= 75) {
    //if activity array.length == 75 then //
    for(i=0;i<activityArray.length;i++) {
      let realEntry = activityArray[i];
      forEachInstanceId1(realEntry, sortThroughGamesPlayed1);
    }
  // }
}

function forEachInstanceId1(entry, callback) {
  $.ajax({
    url: "/bungie4",
    type: "GET",
    data: {
      instId: entry
    },
    success: callback
  });
}

function sortThroughGamesPlayed1(data) {
  // console.log(data);
  let gameId = data.Response.activityDetails.instanceId;
  overall[gameId] = data; //save overall to account OR save occuranceOfSingleWep to account
  // console.log(overall);
  let players = data.Response.entries;
  for(i=0;i<players.length;i++) {
    if(players[i].extended.weapons) {
      storePlayerInfo(players[i]);
    }
  }
}





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
  $(".js-search-results").prepend(`<h2 id="characterName">${displayName}</h2>`);
  // $(".js-search-results").append(`<form id="saveProfile"><button type="submit" id="saveButton">Track Account</button></form>`);


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

  getActivityStats();
  // getActivityStats2();
  // getActivityStats3();

}

function getActivityStats() {
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
    success: function(data) {
      newObj["charOneGameHistory"] = {data};
      // processActivityStats(data);
      getActivityStats2();
    }
  });
}

function getActivityStats2() {
  let charaId = account.character2.id;
  console.log(charaId, membsType, membsId);
  $.ajax({
    url: "/bungie3",
    type: "GET",
    data: {
      membsType: membsType,
      membsId: membsId,
      characterId: charaId
    },
    success: function(data) {
      newObj["charTwoGameHistory"] = {data};
      // processActivityStats(data);
      getActivityStats3();
    }
  });
}

function getActivityStats3() {
  let charaId = account.character3.id;
  console.log(charaId, membsType, membsId);
  $.ajax({
    url: "/bungie3",
    type: "GET",
    data: {
      membsType: membsType,
      membsId: membsId,
      characterId: charaId
    },
    success: function(data) {
      newObj["charThreeGameHistory"] = {data};
      processActivityStats(newObj);
    }
  });
}

function processActivityStats(currentObj) {
  console.log(currentObj);
  // activityArray = [];

  for(entry in currentObj) {
    console.log(entry);
    for(game in currentObj[entry].data.Response.activities) {
      console.log(game);
      let newEntry = currentObj[entry].data.Response.activities[game].activityDetails.instanceId
      activityArray.push(newEntry);
      // if(activityArray.length = 15) {
      //   theDaySaver();
      // }
    // if(activityArray.length = 15) { //automatically sending at 1
      // theDaySaver(activityArray);
      
    }
  }
  console.log(activityArray);

  // if(k = 15) { //automatically sending at 5, so this IF statement being automatically triggered
  setTimeout(theDaySaver(), 3000);
  // }

  // let qq = 0;
  // while(qq<activityArray.length) { //will send constant duplicate copies
  //   let realEntry = activityArray[i];
  //   forEachInstanceId(realEntry, sortThroughGamesPlayed);
  // }

  // if(activityArray.length >= 75) {
    //if activity array.length == 75 then //
    // for(i=0;i<activityArray.length;i++) {
    //   let realEntry = activityArray[i];
    //   forEachInstanceId(realEntry, sortThroughGamesPlayed);
    // }
  // }
}

function theDaySaver() {
  // if(activityArray.length = 15) {
    let realEntry = activityArray[qq];
    forEachInstanceId(realEntry); //74 items being sent, so the 15 initially plus 30, 20, and 10
  // }
  // else {
    // console.log("Done!", activityArray);
  // }
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
      console.log(data);
    }
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
  qq++;
  if(qq < activityArray.length) {
    theDaySaver();
  }
}

//creates objects holding respective stats for each weapon used
function storePlayerInfo(data) {
  refreshCounter += 1;

  if(data.characterId == account.character1.id || data.characterId == account.character2.id || data.characterId == account.character3.id) {
    let primaryWepKey = data.extended.weapons[0].referenceId;

    if(occurrenceOfSingleWep[primaryWepKey] != null) {
      if(occurrenceOfSingleWep[primaryWepKey].refId == data.extended.weapons[0].referenceId) {
        occurrenceOfSingleWep[primaryWepKey].occurrences++; //make refid gameid + unique
        occurrenceOfSingleWep[primaryWepKey].lossCount += data.standing;
        occurrenceOfSingleWep[primaryWepKey].kills += data.values.kills.basic.value;
        occurrenceOfSingleWep[primaryWepKey].deaths += data.values.deaths.basic.value;
        occurrenceOfSingleWep[primaryWepKey].assists += data.values.assists.basic.value;
        occurrenceOfSingleWep[primaryWepKey].averageScorePerKill += data.values.averageScorePerKill.basic.value;
        occurrenceOfSingleWep[primaryWepKey].averageScorePerLife += data.values.averageScorePerLife.basic.value;
        occurrenceOfSingleWep[primaryWepKey].efficiency += data.values.efficiency.basic.value;
        occurrenceOfSingleWep[primaryWepKey].weaponKills += data.extended.weapons[0].values.uniqueWeaponKills.basic.value;
        occurrenceOfSingleWep[primaryWepKey].weaponPrecisionKills += data.extended.weapons[0].values.uniqueWeaponPrecisionKills.basic.value;
        occurrenceOfSingleWep[primaryWepKey].grenadeKills += data.extended.values.weaponKillsGrenade.basic.value;
        occurrenceOfSingleWep[primaryWepKey].assists += data.extended.values.weaponKillsMelee.basic.value;
        occurrenceOfSingleWep[primaryWepKey].assists += data.extended.values.weaponKillsSuper.basic.value;
      }
    
      else if(occurrenceOfSingleWep[primaryWepKey].refId == data.extended.weapons[1].referenceId) {
        occurrenceOfSingleWep[primaryWepKey].occurrences++;
        occurrenceOfSingleWep[primaryWepKey].lossCount += data.standing;
        occurrenceOfSingleWep[primaryWepKey].kills += data.values.kills.basic.value;
        occurrenceOfSingleWep[primaryWepKey].deaths += data.values.deaths.basic.value;
        occurrenceOfSingleWep[primaryWepKey].assists += data.values.assists.basic.value;
        occurrenceOfSingleWep[primaryWepKey].averageScorePerKill += data.values.averageScorePerKill.basic.value;
        occurrenceOfSingleWep[primaryWepKey].averageScorePerLife += data.values.averageScorePerLife.basic.value;
        occurrenceOfSingleWep[primaryWepKey].efficiency += data.values.efficiency.basic.value;
        occurrenceOfSingleWep[primaryWepKey].weaponKills += data.extended.weapons[1].values.uniqueWeaponKills.basic.value;
        occurrenceOfSingleWep[primaryWepKey].weaponPrecisionKills += data.extended.weapons[1].values.uniqueWeaponPrecisionKills.basic.value;
        occurrenceOfSingleWep[primaryWepKey].grenadeKills += data.extended.values.weaponKillsGrenade.basic.value;
        occurrenceOfSingleWep[primaryWepKey].assists += data.extended.values.weaponKillsMelee.basic.value;
        occurrenceOfSingleWep[primaryWepKey].assists += data.extended.values.weaponKillsSuper.basic.value;
      }

      else if(occurrenceOfSingleWep[primaryWepKey].refId == data.extended.weapons[2].referenceId) {
        occurrenceOfSingleWep[primaryWepKey].occurrences++;
        occurrenceOfSingleWep[primaryWepKey].lossCount += data.standing;
        occurrenceOfSingleWep[primaryWepKey].kills += data.values.kills.basic.value;
        occurrenceOfSingleWep[primaryWepKey].deaths += data.values.deaths.basic.value;
        occurrenceOfSingleWep[primaryWepKey].assists += data.values.assists.basic.value;
        occurrenceOfSingleWep[primaryWepKey].averageScorePerKill += data.values.averageScorePerKill.basic.value;
        occurrenceOfSingleWep[primaryWepKey].averageScorePerLife += data.values.averageScorePerLife.basic.value;
        occurrenceOfSingleWep[primaryWepKey].efficiency += data.values.efficiency.basic.value;
        occurrenceOfSingleWep[primaryWepKey].weaponKills += data.extended.weapons[2].values.uniqueWeaponKills.basic.value;
        occurrenceOfSingleWep[primaryWepKey].weaponPrecisionKills += data.extended.weapons[2].values.uniqueWeaponPrecisionKills.basic.value;
        occurrenceOfSingleWep[primaryWepKey].grenadeKills += data.extended.values.weaponKillsGrenade.basic.value;
        occurrenceOfSingleWep[primaryWepKey].assists += data.extended.values.weaponKillsMelee.basic.value;
        occurrenceOfSingleWep[primaryWepKey].assists += data.extended.values.weaponKillsSuper.basic.value;
      }
    }

    else if(data.extended.weapons.length == 1 || data.extended.weapons.length == 2 || data.extended.weapons.length == 3) {
      occurrenceOfSingleWep[primaryWepKey] = {refId: data.extended.weapons[0].referenceId, wepType: manifest[primaryWepKey][2], wepSlot: manifest[primaryWepKey][3], lossCount: data.standing, occurrences: 1, kills: data.values.kills.basic.value, deaths: data.values.deaths.basic.value, assists: data.values.assists.basic.value, averageScorePerKill: data.values.averageScorePerKill.basic.value, averageScorePerLife: data.values.averageScorePerLife.basic.value, efficiency: data.values.efficiency.basic.value, weaponKills: data.extended.weapons[0].values.uniqueWeaponKills.basic.value, weaponPrecisionKills: data.extended.weapons[0].values.uniqueWeaponPrecisionKills.basic.value, grenadeKills: data.extended.values.weaponKillsGrenade.basic.value, meleeKills: data.extended.values.weaponKillsMelee.basic.value, superKills: data.extended.values.weaponKillsSuper.basic.value};
    }
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

  $(".weaponForm").submit(event => {
    event.preventDefault();

    //creates display weapon trends button
    // $("#displayWepTrends").html(
    //   `<button type="submit" id="wepTrendsButton">Display Weapon Trends</button>`
    // );

    //creates the save button
    $("#saveLoadout").html(
      `<button type="submit" id="saveButton">Save Account</button>`
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
    let sbHeader = document.getElementById("searchBarHeader");
    sbHeader.classList.remove("onLoadCentering");
    let sb = document.getElementById("sb");
    sb.classList.remove("sbOnLoadCentering");
    activityArray = [];
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