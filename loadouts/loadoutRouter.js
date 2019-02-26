'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const jsonParser = bodyParser.json();

const { Loadout } = require("./models");


router.get('/', (req, res) => {
  console.log(req.body);
  console.log(req.params);

  let useableId = req.body.character;
  console.log(useableId);
  // useableId = useableId.replace("%23", "#");

  // useableId = useableId.replace(":", "");
  Loadout
    .find({ "characterReference": useableId}) //remove colon from :character and get req works
    // .then(loadout => {
    //   var obj = loadout.weapons;
    //   obj.map(rObj => {
    //     var rrObj = {};
    //     rrObj[rObj.key] = rObj.value;
    //     res.json({rrObj})
    //   })
    // })

    .then(loadout => {
      res.json(loadout[0].weapons)
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: 'Something went wrong' });
  })
});

router.post('/', jsonParser, (req, res) => { //POST functioning
  console.log(req.body);
  // Loadout.collection.insert({character: req.body.character, weaponobject: req.body.weaponObject}, onInsert);
  let insertionObj = {weapons: req.body.weaponObject}; 
  Loadout.collection.insert(insertionObj, onInsert);
  // for(req.body in req.body.weaponObject) {
  //   console.log(req.body);
  // Loadout.collection.createIndex({
  //   characterReference: req.body.characterReference, assists: req.body.assists, averageScorePerKill: req.body.averageScorePerKill, averageScorePerLife: req.body.averageScorePerLife, deaths: req.body.deaths, efficiency: req.body.efficiency, grenadeKills: req.body.grenadeKills, kills: req.body.kills, lossCount: req.body.lossCount, meleeKills: req.body.meleeKills, occurrences: req.body.occurrences, refId: req.body.refId, superKills: req.body.superKills, weaponKills: req.body.weaponKills, weaponPrecisionKills: req.body.weaponPrecisionKills
  // }, {unique: true})
  // .then(loadout => {
  //   res.status(201).json(loadout.serialize())
  // })
  // .catch(err => {
  //   console.error(err);
  //   res.status(500).json({ message: 'Internal server error' });
  // });
    // characterReference: index.characterReference, assists: index.assists, averageScorePerKill: index.averageScorePerKill, averageScorePerLife: index.averageScorePerLife, deaths: index.deaths, efficiency: index.efficiency, grenadeKills: index.grenadeKills, kills: index.kills, lossCount: index.lossCount, meleeKills: index.meleeKills, occurrences: index.occurrences, refId: index.refId, superKills: index.superKills, weaponKills: index.weaponKills, weaponPrecisionKills: index.weaponPrecisionKills


  function onInsert(err, docs) {
    if (err) {
      console.log("Error!", err);
    } else {
      console.info("loadouts were successfully stored.", docs.length);
    }
  }


    // .create({
    //   character: req.body.character,
    //   weaponobject: req.body.weaponObject
    // })
    // .then(loadout => res.status(201).json(loadout))
    // .catch(err => {
    //   console.error(err);
    //   res.status(500).json({ error: "Something went wrong" });
    // });
});

router.put('/', jsonParser, (req, res) => {
  // let useableId = req.body.character;
  // useableId = useableId.replace(":", "");
  console.log(req.body);

  // const updated = {};
  // const updateableFields = ['occurrences', 'winCount'];
  // updateableFields.forEach(field => {
  //   if (field in req.body.weaponObject) {
  //     updated[field] = req.body.weaponObject[field];
  //   }
  // });


  Loadout.collection
    .updateOne({"character": req.body.character}, {$set: {"character": req.body.character, "weapons": req.body.weaponObject}})
    // .find({"character":req.param.characterId})
    .then(updatedLoadout => res.json(updatedLoadout))
    // .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});

router.delete('/:character', (req, res) => { //DELETE functioning
  let useableId = req.params.character;
  useableId = useableId.replace(":", "");
  Loadout
    .findOneAndDelete({ character: useableId })
    .then(() => {
      console.log(`Deleted id \`${useableId}\``);
      res.status(204).end()
    })
});

router.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = router;