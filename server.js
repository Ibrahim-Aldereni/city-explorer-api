"use strict";
//////////////////////////////////// imports ////////////////////////////////////
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const weatherFunctions = require("./Modules/Weather.js");
const moviesFromApi = require("./Modules/Movies.js");

///////////////////////////////////////// init ///////////////////////////////////////
const server = express();
server.use(cors());
const PORT = process.env.PORT || 3001;

////////////////////////////////////////// routes ////////////////////////////////////
//localhost:3001
server.get("/", homePage);

//localhost:3001/weather?searchQuery=...
server.get("/weather", weatherFunctions.weatherByCity);

//localhost:3001/weather2?searchQuery=...
server.get("/weather2", weatherFunctions.weatherFromApi);

//localhost:3001/movies?searchQuery=...
server.get("/movies", moviesFromApi);

//localhost:3001...
server.get("*", notFound);

/////////////////////////////////////////// functions /////////////////////////////////
function homePage(req, res) {
  res.send("This is Home page");
}

function notFound(req, res) {
  res.status(404).send("Sorry, this page not found");
}

/////////////////////////////////////////////// listen //////////////////////////////////////
server.listen(PORT, () => {
  console.log(`Listing on port: ${PORT}`);
});
