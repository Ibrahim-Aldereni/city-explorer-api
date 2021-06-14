require("dotenv").config();
const express = require("express");
const cors = require("cors");
const weatherData = require("./data/weather.json");

const server = express();
server.use(cors());
const PORT = process.env.PORT || 3001;

//localhost:3001
server.get("/", (req, res) => {
  res.send("This is Home page");
});

//localhost:3001/weather?lat=..&long=..&searchQuery=...    //`lat`, `lon` and `searchQuery` information.
server.get("/weather", (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;

  let result = "";
  if (
    lat == weatherData.lat &&
    lon == weatherData.lon &&
    searchQuery == weatherData.city_name
  ) {
    result = weatherData.data;
  } else {
    result = "Error city not found";
  }
  res.send(result);
});

//localhost:3001...
server.get("*", (req, res) => {
  res.status(404).send("Sorry, this page not found");
});

server.listen(PORT, () => {
  console.log(`Listing on port: ${PORT}`);
});
