const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
  savedUsers: String
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
