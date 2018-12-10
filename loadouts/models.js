"use strict";

const mongoose = require("mongoose");

const itemSlotSchema = mongoose.Schema({
  itemHash: { type: String, required: true },
  itemName: { type: String, required: true },
  itemThumbnail: { type: String, required: true },
  itemType: { type: String, required: true },
  itemSlot: { type: String, required: true }
});


const loadoutSchema = mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  items: [itemSlotSchema]
});

const Loadout = mongoose.model('Loadout', loadoutSchema);

module.exports = { Loadout };