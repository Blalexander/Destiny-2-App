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
      weapons: req.body.weapons
    })
    .then(loadout => res.status(201).json(loadout))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = router;