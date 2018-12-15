'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const loadoutSchema = mongoose.Schema({
  itemHash: String,
  itemName: String,
  itemThumbnail: String,
  itemType: String,
  itemSlot: String
});

// {type: String, required: true}
// const loadoutSchema = mongoose.Schema({
//   uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: String,
//   items: {itemSlotSchema}
// });

// loadoutSchema.methods.serialize = function() {
//   return {
//     id: this._id,
//     itemHash: this.itemHash,
//     itemName: this.itemName,
//     itemThumbnail: this.itemThumbnail,
//     itemType: this.itemType,
//     itemSlot: this.itemSlot
//   };
// };

const Loadout = mongoose.model("Loadout", loadoutSchema);

module.exports = { Loadout };