const axios = require("axios");
const express = require("express");
const router = express.Router();
const qs = require("querystring");

router.get("/", (req, res) => {
  console.log(req.query.search)
  axios
    .get(
      `https://www.bungie.net/Platform/Destiny2/${req.query.membsType}/Account/${req.query.membsId}/Character/${req.query.characterId}/Stats/Activities/?mode=5&count=35`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "62261ab05c7b4f078c05a94f18124761"
        }
      }
    )
    .then(payload => {
      res.json(payload.data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: "Something went wrong while querying Bungie"
      });
    });
});

module.exports = router;