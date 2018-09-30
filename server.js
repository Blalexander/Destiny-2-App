const express = require("express");
const morgan = require("morgan");

const router1 = require("./router1"); 
const app = express();

app.use(morgan("common"));
app.use(express.json());

app.use("/loadout", router1); 

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});