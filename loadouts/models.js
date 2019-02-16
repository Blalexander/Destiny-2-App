'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const loadoutSchema = mongoose.Schema({
  weapons: Object
});

// const loadoutSchema = mongoose.Schema({
//   characterReference: String, assists: Number, averageScorePerKill: Number, averageScorePerLife: Number, deaths: Number, efficiency: Number, grenadeKills: Number, kills: Number, lossCount: Number, meleeKills: Number, occurrences: Number, refId: Number, superKills: Number, weaponKills: Number, weaponPrecisionKills: Number
// });

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
    id: this._id, characterReference: this.characterReference, assists: this.assists, averageScorePerKill: this.averageScorePerKill, averageScorePerLife: this.averageScorePerLife, deaths: this.deaths, efficiency: this.efficiency, grenadeKills: this.grenadeKills, kills: this.kills, lossCount: this.lossCount, meleeKills: this.meleeKills, occurrences: this.occurrences, refId: this.refId, superKills: this.superKills, weaponKills: this.weaponKills, weaponPrecisionKills: this.weaponPrecisionKills
  };
};


// let Weapons = mongoose.model("Weapons", weaponSchema);
const Loadout = mongoose.model("Loadout", loadoutSchema);
module.exports = { Loadout };