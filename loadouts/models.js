'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const weaponSchema = mongoose.Schema({
  weaponObject: [{}]
});

const loadoutSchema = mongoose.Schema({
  character: { type: 'string', unique: true },
  weapons: { type: mongoose.Schema.Types.ObjectId, ref: 'Weapons' }
});

let Weapons = mongoose.model("Weapons", weaponSchema);
const Loadout = mongoose.model("Loadout", loadoutSchema);
module.exports = { Loadout, Weapons };