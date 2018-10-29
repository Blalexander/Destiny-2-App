const axios = require("axios");
const express = require("express");
const router = express.Router();
const qs = require("querystring");

router.get("/", (req, res) => {
  axios
    .get(
      `https://www.bungie.net/Platform/Destiny2/${req.query.membsType}/Profile/${req.query.membsId}/?components=200,205`,
      {
        // params: {
        //   displayName: req.query.displayName
        // },
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
