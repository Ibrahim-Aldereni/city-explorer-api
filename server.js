//////////////////////////////////// imports ////////////////////////////////////
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const weatherData = require("./data/weather.json");

///////////////////////////////////////// init ///////////////////////////////////////
const server = express();
server.use(cors());
const PORT = process.env.PORT || 3001;

////////////////////////////////////////// routes ////////////////////////////////////
//localhost:3001
server.get("/", homePage);

//localhost:3001/weather?searchQuery=...
server.get("/weather", weatherByCity);

//localhost:3001/weather2?searchQuery=...
server.get("/weather2", weatherFromApi);

//localhost:3001...
server.get("*", notFound);

/////////////////////////////////////////// functions /////////////////////////////////
function homePage(req, res) {
  res.send("This is Home page");
}

function weatherByCity(req, res) {
  let searchQuery = req.query.searchQuery;

  class Data {
    constructor(item) {
      (this.date = item.datetime),
        (this.description = item.weather.description);
    }
  }

  let result = weatherData
    .find((item) => {
      if (searchQuery == item.city_name) {
        return item;
      }
    })
    .data.map((item) => {
      return new Data(item);
    });
  res.send(result);
}

function weatherFromApi(req, res) {
  let cityName = req.query.searchQuery;
  let key = process.env.WEATHER_API_KEY;

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${key}`;
  axios
    .get(url)
    .then((response) => {
      let result = response.data.data.map((item) => {
        return new Data(item);
      });
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send("Error city not found");
    });

  class Data {
    constructor(item) {
      (this.date = item.datetime),
        (this.description = item.weather.description);
    }
  }
}

function notFound(req, res) {
  res.status(404).send("Sorry, this page not found");
}

/////////////////////////////////////////////// listen //////////////////////////////////////
server.listen(PORT, () => {
  console.log(`Listing on port: ${PORT}`);
});
