'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const jsonParser = bodyParser.json();

const { Loadout } = require("./models");


router.get('/:character', (req, res) => {
  console.log(req.params);
  let useableId = req.params.character;
  useableId = useableId.replace(":", "");
  Loadout
    .find({ "character": useableId}) //remove colon from :character and get req works
    .then(loadout => {
      res.json({loadout})
    })
    // .catch(res.status(500).json({ message: 'Something went wrong' }));
})

router.post('/', jsonParser, (req, res) => { //POST functioning
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

router.put('/:character', jsonParser, (req, res) => {
  let useableId = req.params.character;
  useableId = useableId.replace(":", "");
  console.log(req.params, req.body, useableId);

  // const updated = {};
  // const updateableFields = ['occurrences', 'winCount'];
  // updateableFields.forEach(field => {
  //   if (field in req.body.weaponObject) {
  //     updated[field] = req.body.weaponObject[field];
  //   }
  // });


  Loadout
    .updateOne({character: useableId}, {$set: {character: useableId, weapons: req.body.weaponObject}})
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