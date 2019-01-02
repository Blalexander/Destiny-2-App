let queryTarget2 = $(".js-search-form").find("#type");
let membsType = queryTarget2.val();
let membsId = 0;
let displayName = "";
let account = {};
let overall = {};
let objVals = [];
let objKeys = [];
let activityArray = [];
let occurrenceOfSingleWep = {};
let occurrenceOfTwoWeps = {};
let occurrenceOfThreeWeps = {};
let activitiesEntered = 0;
let activitiesUsed = 0;
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
  console.log(occurrenceOfSingleWep);
  $("#weaponClusters").html("");
  let highestSingleWep = 0;
  let highestSingleWepName = 0;
  let highestDoubleWep = 0;
  let firstDoubleWepName = 0;
  let highestTripleWep = 0;
  let firstTripleWepName = 0;

  Object.keys(occurrenceOfSingleWep).forEach(function(a,b) {
    if(occurrenceOfSingleWep[a].occurrences > highestSingleWep) {
      highestSingleWep = occurrenceOfSingleWep[a].occurrences;
      highestSingleWepName = a;
      highestSingleWepName1 = occurrenceOfSingleWep[a].secondaryWepKey;
    }
  })

  // Object.keys(occurrenceOfTwoWeps).forEach(function(a,b) {
  //   if(occurrenceOfTwoWeps[a].occurrences > highestDoubleWep) {
  //     highestDoubleWep = occurrenceOfTwoWeps[a].occurrences;
  //     firstDoubleWepName = a;
  //     secondDoubleWepName = occurrenceOfTwoWeps[a].secondaryWepKey;
  //   }
  // })

  // Object.keys(occurrenceOfThreeWeps).forEach(function(a,b) {
  //   if(occurrenceOfThreeWeps[a].occurrences > highestTripleWep) {
  //     highestTripleWep = occurrenceOfThreeWeps[a].occurrences;
  //     firstTripleWepName = a;
  //     secondTripleWepName = occurrenceOfThreeWeps[a].secondaryWepKey;
  //     thirdTripleWepName = occurrenceOfThreeWeps[a].tertiaryWepKey;
  //   }
  // })

  // console.log(highestSingleWepName, highestSingleWep);
  // console.log(firstDoubleWepName, secondDoubleWepName);
  // console.log(firstTripleWepName, secondTripleWepName, thirdTripleWepName);
  // console.log(occurrenceOfSingleWep, occurrenceOfTwoWeps, occurrenceOfThreeWeps);

  let counter = 1;
  let singleWepIcon = manifest[highestSingleWepName];
  // let singleWepIcon1 = manifest[highestSingleWepName1];

  // let firstDoubleWepIcon = manifest[firstDoubleWepName];
  // let secondDoubleWepIcon = manifest[secondDoubleWepName];
  // let firstTripleWepIcon = manifest[firstTripleWepName];
  // let secondTripleWepIcon = manifest[secondTripleWepName];
  // let thirdTripleWepIcon = manifest[thirdTripleWepName];

  let singleMathResult = occurrenceOfSingleWep[highestSingleWepName].lossCount/occurrenceOfSingleWep[highestSingleWepName].occurrences;
  // let doubleMathResult = occurrenceOfTwoWeps[firstDoubleWepName].lossCount/occurrenceOfTwoWeps[firstDoubleWepName].occurrences;
  // let tripleMathResult = occurrenceOfThreeWeps[firstTripleWepName].lossCount/occurrenceOfThreeWeps[firstTripleWepName].occurrences;

  let singleWepFreq = 0;
  let singleWepWins = 0;
//trim MathResults down to 2 or 3 spaces

for(index in occurrenceOfSingleWep) {

  // singleWepIcon = manifest[index];
  // if(occurrenceOfSingleWep[index].secondaryWepKey) {
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
    <div class="statHolder" id="${index}">
    <img src="https://www.bungie.net${singleWepIcon[1]}" alt="weaponStatsImg">
    <p class="stats">Times Used: ${occurrenceOfSingleWep[index].occurrences}</p>
    <p class="stats">Win Rate: ${singleMathResult}%</p>
    <p class="stats">K/D: ${singleWepKd}</p>
    <p class="stats">KA/D: ${singleWepKda}</p>
    <p class="stats">Efficiency: ${singleEfficiency}</p>
    <p class="stats">Average Score per Kill: ${singleScorePKill}</p>
    <p class="stats">Average Score per Life: ${singleScorePLife}</p>
    <p class="stats">Kills vs Assists: ${singleWepKAssists}%</p>
    <p class="stats">Weapon Kills: ${singleWeaponKills}%</p>
    <p class="stats">Weapon Precision Kills: ${singleWeaponPrecisionKills}%</p>
    <p class="stats">Grenade Kills: ${singleWepNadeKills}%</p>
    <p class="stats">Melee Kills: ${singleWepMeleeKills}%</p>
    <p class="stats">Super Kills: ${singleWepSuperKills}%</p></div>`);
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
    <div class="statHolder" id="${a}">
    <img src="https://www.bungie.net${singleWepIcon[1]}" alt="weaponStatsImg">
    <p class="stats">Times Used: ${occurrenceOfSingleWep[a].occurrences}</p>
    <p class="stats">Win Rate: ${singleMathResult}%</p>
    <p class="stats">K/D: ${singleWepKd}</p>
    <p class="stats">KA/D: ${singleWepKda}</p>
    <p class="stats">Efficiency: ${singleEfficiency}</p>
    <p class="stats">Average Score per Kill: ${singleScorePKill}</p>
    <p class="stats">Average Score per Life: ${singleScorePLife}</p>
    <p class="stats">Kills vs Assists: ${singleWepKAssists}%</p>
    <p class="stats">Weapon Kills: ${singleWeaponKills}%</p>
    <p class="stats">Weapon Precision Kills: ${singleWeaponPrecisionKills}%</p>
    <p class="stats">Grenade Kills: ${singleWepNadeKills}%</p>
    <p class="stats">Melee Kills: ${singleWepMeleeKills}%</p>
    <p class="stats">Super Kills: ${singleWepSuperKills}%</p></div>`);
  })

  // var clicked = false, clickY;
  // $("#weaponClusters").on({
  //     'mousemove': function(e) {
  //         clicked && updateScrollPos(e);
  //     },
  //     'mousedown': function(e) {
  //         clicked = true;
  //         clickY = e.pageY;
  //     },
  //     'mouseup': function() {
  //         clicked = false;
  //         $('#weaponClusters').css('cursor', 'auto');
  //     }
  // });
  
  // var updateScrollPos = function(e) {
  //     $('#weaponClusters').css('cursor', 'row-resize');
  //     $("#weaponClusters").scrollLeft($("#weaponClusters").scrollLeft() + (e.pageY - clickY));
  // }

  // $('.singleWepDiv').mouseleave(function(event) {
  //   $('#weaponClusters2').html("");
  // })


  $("#deleteProfile").html(
    `<button type="submit" id="deleteButton">Untrack Account</button>`
  );

  $("#displayProfile").html(
    `<button type="submit" id="updateButton">Get Full Stats</button>`
  );

  $("#checkTest").html(
    `<button type="submit" id="checkTestBut">CHECKING</button>`
  );


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
      url:`/loadouts/:${membsId}`,
      method: "PUT",
      dataType: "JSON",
      data: {
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


  //will display the saved profile
  $("#displayProfile").submit(event => {
    event.preventDefault();
    activityArray = [];
    occurrenceOfSingleWep = {};
    console.log("activity array cleared");
    sortAllTimeData();
  });

  function sortAllTimeData() {
    let firstCharacter = account.character1.id;
    let secondCharacter = account.character2.id;
    let thirdCharacter = account.character3.id;

    const settings1 = {
      url:"/bungie6",
      type: "GET",
      data: {
        membsType: membsType,
        membsId: membsId,
        characterId: firstCharacter,
      },
      success: function(data) {
        console.log("Success!", data);
        processActivityStats1(data);
      },
      error: function(data) {
        console.log("Error", data);
      }
    };
    $.ajax(settings1);

    const settings2 = {
      url:"/bungie6",
      type: "GET",
      data: {
        membsType: membsType,
        membsId: membsId,
        characterId: secondCharacter,
      },
      success: function(data) {
        console.log("Success!", data);
        processActivityStats1(data);
      },
      error: function(data) {
        console.log("Error", data);
      }
    };
    $.ajax(settings2);

    const settings3 = {
      url:"/bungie6",
      type: "GET",
      data: {
        membsType: membsType,
        membsId: membsId,
        characterId: thirdCharacter,
      },
      success: function(data) {
        console.log("Success!", data);
        processActivityStats1(data);
      },
      error: function(data) {
        console.log("Error", data);
      }
    };
    $.ajax(settings3);
  }

////////////////////////////////////////////////////////////////////////////////////
//account object holding all stats and separate weapons (easiest to configure with least weapon specificity)
//weapon object holding all stats (possibly many, many objects.  possibly not useful unless high amount of data.)
});

function processActivityStats1(dataA) {
  console.log(dataA);
  // activityArray = [];

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
  $(".js-search-results").append(`<form id="saveProfile"><button type="submit" id="saveButton">Track Account</button></form>`);


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
  getActivityStats2(processActivityStats);
  getActivityStats3(processActivityStats);

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

function getActivityStats2(callback) {
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
    success: callback
  });
}

function getActivityStats3(callback) {
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
    success: callback
  });
}

function processActivityStats(dataA) {
  console.log(dataA);
  // activityArray = [];

  for(i=0;i<dataA.Response.activities.length;i++) {
    activityArray.push(dataA.Response.activities[i].activityDetails.instanceId);
  }
  console.log(activityArray);

  // if(activityArray.length >= 75) {
    //if activity array.length == 75 then //
    for(i=0;i<activityArray.length;i++) {
      let realEntry = activityArray[i];
      forEachInstanceId(realEntry, sortThroughGamesPlayed);
    }
  // }
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

//creates weapon cluster object for seeing how many times two weapons are used in tandem with each other and weapon counter object to keep track of individual weapon occurrences
function storePlayerInfo(data) {
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
      occurrenceOfSingleWep[primaryWepKey] = {refId: data.extended.weapons[0].referenceId, lossCount: data.standing, occurrences: 1, kills: data.values.kills.basic.value, deaths: data.values.deaths.basic.value, assists: data.values.assists.basic.value, averageScorePerKill: data.values.averageScorePerKill.basic.value, averageScorePerLife: data.values.averageScorePerLife.basic.value, efficiency: data.values.efficiency.basic.value, weaponKills: data.extended.weapons[0].values.uniqueWeaponKills.basic.value, weaponPrecisionKills: data.extended.weapons[0].values.uniqueWeaponPrecisionKills.basic.value, grenadeKills: data.extended.values.weaponKillsGrenade.basic.value, meleeKills: data.extended.values.weaponKillsMelee.basic.value, superKills: data.extended.values.weaponKillsSuper.basic.value};
    }


    // if(occurrenceOfThreeWeps[primaryWepKey] != null && occurrenceOfThreeWeps[primaryWepKey].secondaryWepKey != null && occurrenceOfThreeWeps[primaryWepKey].tertiaryWepKey) {
    //   occurrenceOfThreeWeps[primaryWepKey].occurrences++;
    //   occurrenceOfThreeWeps[primaryWepKey].lossCount += data.values.standing.basic.value;
    // } 

    // else if(data.extended.weapons.length == 3) {
    //   occurrenceOfThreeWeps[primaryWepKey] = {secondaryWepKey: data.extended.weapons[1].referenceId, tertiaryWepKey: data.extended.weapons[2].referenceId, lossCount: data.values.standing.basic.value, occurrences: 1};
    // }
  }
}

//have thumbnails of loadout displayed + bground


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