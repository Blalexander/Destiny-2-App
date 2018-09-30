const express = require("express");
const router = express.Router(); 
const {Loadouts} = require("./models");

// Loadouts.create("titan sunbreaker", "sunbreaker content");
// Loadouts.create("titan sentinal", "sentinal content");

router.get("/", (req, res) => {
    res.json(Loadouts.get());
});

module.exports = router;