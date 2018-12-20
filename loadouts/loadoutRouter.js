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
      occurances: req.body.weaponObject.occurances,
      winCount: req.body.weaponObject.winCount
    })
    .then(loadout => res.status(201).json(loadout))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.put('/:characterId', (req, res) => {
  // if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
  //   res.status(400).json({
  //     error: 'Request path id and request body id values must match'
  //   });
  // }

  const updated = {}; //finish update fields
  const updateableFields = ['occurances', 'winCount'];
  updateableFields.forEach(field => {
    if (field in req.body.weaponObject) {
      updated[field] = req.body.weaponObject[field];
    }
  });

  Loadout
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedLoadout => res.status(204))
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});

router.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = router;