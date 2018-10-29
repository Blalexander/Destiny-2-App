const axios = require("axios");
const express = require("express");
const router = express.Router();
const qs = require("querystring");

router.get("/", (req, res) => {
  axios
    .get(
      `https://www.bungie.net/Platform/Destiny2/4/Account/4611686018470723268/Character/2305843009301006557/Stats/Activities/`,
      {
        params: {
          count: 25,
          mode: 5,
          page: 0
        },
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
