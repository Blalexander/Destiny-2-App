'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const jsonParser = bodyParser.json();

const { Loadout } = require("./models");


router.get('/:character', (req, res) => {
  console.log(req.params);
  Loadout
    .find({ character: req.params.character}) //remove colon from :character and get req works
    .then(loadout => {
      res.json({loadout})
    })
    // .catch(res.status(500).json({ message: 'Something went wrong' }));
})



router.post('/', jsonParser, (req, res) => {
  console.log(req.body);
  // Loadout.collection.insert({character: req.body.character, weaponobject: req.body.weaponObject}, onInsert);
  let insertionObj = {character: req.body.character, weapons: req.body.weaponObject};
  Loadout.collection.insert(insertionObj, onInsert);


  // Loadout.collection.insert(req.body.weaponObject, onInsert);


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

router.patch('/:characterId', (req, res) => {
  // if (!(req.params.id && req.body.characterId && req.params.id === req.body.characterId)) {
  //   return res.status(400).json({
  //     error: 'Request path id and request body id values must match'
  //   });
  // }

  // const updated = []; //finish update fields
  // const updateableFields = ['occurrences', 'winCount'];
  // updateableFields.forEach(field => {
  //   if (field in req.body.weaponObject) {
  //     updated[field] = req.body.weaponObject[field];
  //   }
  // });
  console.log(req.params);
  Loadout
    .findOneAndUpdate({"character": req.params.characterId}, {$set: {"occurrences": req.body.weaponObject.occurrences, "winCount": req.body.weaponObject.winCount}}, {new: true})
    // .find({"character":req.param.characterId})
    .then(updatedLoadout => res.json(updatedLoadout))

    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});

router.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = router;