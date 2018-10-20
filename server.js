"use strict";
require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const cors = require("cors");

const myRouter = require("./myRouter");
const app = express();

app.use(morgan("common"));
app.use(express.static("public"));
app.use("/loadout", myRouter);
app.use(express.static(path.resolve(__dirname, "public")));
// app.listen(process.env.PORT || 8080);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongoose
// .connect(db)
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// app.use(passport.initialize());

// require("./config/passport")(passport);

// if (require.main === module) {
app.listen(process.env.PORT || 8080, () => {
  console.info(`App listening on port ${process.env.PORT || 8080}`);
});
// }

module.exports = app;
