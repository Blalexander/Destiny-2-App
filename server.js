"use strict";

const express = require("express");
const morgan = require("morgan");

const myRouter = require("./myRouter");
const app = express();

app.use(morgan("common"));
app.use(express.static("public"));
app.use("/loadout", myRouter);
// app.listen(process.env.PORT || 8080);

// if (require.main === module) {
app.listen(process.env.PORT || 8080, () => {
  console.info(`App listening on port ${process.env.PORT || 8080}`);
});
// }

module.exports = app;