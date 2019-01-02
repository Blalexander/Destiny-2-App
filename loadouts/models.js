'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// const weaponSchema = mongoose.Schema({
//   occurrences: Number,
//   secondaryWepKey: Number,
//   winCount: Number
// });

const loadoutSchema = mongoose.Schema({
  character: String,
  emailIdentifier: String,
  weaponObject: {assists: Number, averageScorePerKill: Number, averageScorePerLife: Number, deaths: Number, efficiency: Number, grenadeKills: Number, kills: Number, lossCount: Number, meleeKills: Number, occurrences: Number, refId: Number, superKills: Number, weaponKills: Number, weaponPrecisionKills: Number}
});

loadoutSchema.pre('find', function(next) {
  this.populate('loadout');
  next();
})

loadoutSchema.pre('findOne', function(next) {
  this.populate('loadout');
  next();
})

loadoutSchema.methods.serialize = function() {
  return {
    character: this.character,
    emailIdentifier: this.emailIdentifier,
    weaponObject: this.weaponObject
  };
};


// let Weapons = mongoose.model("Weapons", weaponSchema);
const Loadout = mongoose.model("Loadout", loadoutSchema);
module.exports = { Loadout };