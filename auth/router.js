"use strict";
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const config = require("../config");
const router = express.Router();

const createAuthToken = user => {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.email,
    expiresIn: config.JWT_EXPIRY,
    algorithm: "HS256"
  });
};

const localAuth = passport.authenticate("local", { session: false });
router.use(bodyParser.json());

// @route   POST api/auth/login
// @desc    The user provides email and password to login
// @access  
router.post("/login", localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  res.json({
    authToken,
    user: req.user._id
  });
});

const jwtAuth = passport.authenticate("jwt", { session: false });

// @route   POST 
// The user exchanges a valid JWT for a new one with a later expiration
router.post("/refresh", jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = { router };
