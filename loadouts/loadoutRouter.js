'use strict';

const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");

const router = express.Router();
const jsonParser = bodyParser.json();

const jwtAuth = passport.authenticate("jwt", { session: false });

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, loadoutization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  if (req.method === "OPTIONS") {
    return res.send(204);
  }
  next();
});

const { Loadout } = require("./models");


//Import loadouts from user
router.post('/', jsonParser, (req, res) => {
  console.log(req.body);
  const requiredFields = ["itemHash", "itemName", "itemThumbnail", "itemType", "itemSlot"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Loadout
    .create({
      itemHash: req.body.itemHash,
      itemName: req.body.itemName,
      itemThumbnail: req.body.itemThumbnail,
      itemType: req.body.itemType,
      itemSlot: req.body.itemSlot
    })
    .then(loadout => res.status(201).json(loadout))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

module.exports = router;