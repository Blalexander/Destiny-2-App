'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const jsonParser = bodyParser.json();

const { Loadout } = require("./models");



router.post('/', jsonParser, (req, res) => {
  console.log(req.body);
  Loadout
    .create({
      character: req.body.character,
      primaryWepKey: req.body.primaryWepKey,
      secondaryWepKey: req.body.weaponObject.secondaryWepKey,
      occurrences: req.body.weaponObject.occurrences,
      winCount: req.body.weaponObject.winCount
    })
    .then(loadout => res.status(201).json(loadout))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
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