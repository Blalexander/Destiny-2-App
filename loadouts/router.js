"use strict";

const express = require("express");
const passport = require("passport");
const { Loadout } = require("./models");

const router = express.Router();

const jwtAuth = passport.authenticate("jwt", { session: false });

//Import loadouts from user
