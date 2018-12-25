"use strict";
require("dotenv").config();

//Dependencies
const express = require("express");
const mongoose = require("mongoose");
// const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
const cors = require("cors");

//Routes
const bungieRoute = require("./routers/bungieRouter");
const bungieRoute2 = require("./routers/bungieRouter2");
const bungieRoute3 = require("./routers/bungieRouter3");
const bungieRoute4 = require("./routers/bungieRouter4");
const bungieRoute5 = require("./routers/bungieRouter5");
const bungieRoute6 = require("./routers/bungieRouter6");
const loadoutsRouter = require("./loadouts/loadoutRouter");


const { router: usersRouter } = require("./users");
const { router: authRouter, localStrategy, jwtStrategy } = require("./auth");
const jwtAuth = passport.authenticate("jwt", { session: false });
const { PORT, DATABASE_URL, TEST_DATABASE_URL } = require("./config");
const app = express();
// var MongoClient = require('mongodb').MongoClient;
// var db;

// MongoClient.connect("mongodb://blake:blake1@ds131903.mlab.com:31903/node-capstone", function(err, database) {
//   if(err) return console.error(err);

//   db = database;
// });


//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("common"));
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use("/bungie", bungieRoute);
app.use("/bungie2", bungieRoute2);
app.use("/bungie3", bungieRoute3);
app.use("/bungie4", bungieRoute4);
app.use("/bungie5", bungieRoute5);
app.use("/bungie6", bungieRoute6);
app.use("/loadouts", loadoutsRouter);

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use(express.static("public"));
mongoose.Promise = global.Promise;

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, loadoutization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  if (req.method === "OPTIONS") {
    return res.send(204);
  }
  next();
});

//Test Protected endpoint
app.get("/api/protected", jwtAuth, (req, res) => {
  return res.json({
    data: "Snoopy"
  });
});

let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      require.main === module ? DATABASE_URL : TEST_DATABASE_URL,
      { useNewUrlParser: true },
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(PORT, () => {
            console.log(`Your app is listening on port ${PORT}`);
            resolve();
          })
          .on("error", err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
