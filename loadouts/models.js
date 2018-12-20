'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// const weaponSchema = mongoose.Schema({
//   occurances: Number,
//   secondaryWepKey: Number,
//   winCount: Number
// });

const loadoutSchema = mongoose.Schema({
  character: Number,
  // weapons: { type: mongoose.Schema.Types.ObjectId, ref: 'Weapons' }
  primaryWepKey: Number,
  secondaryWepKey: Number,
  occurances: Number,
  winCount: Number
});

// let Weapons = mongoose.model("Weapons", weaponSchema);
const Loadout = mongoose.model("Loadout", loadoutSchema);
module.exports = { Loadout };