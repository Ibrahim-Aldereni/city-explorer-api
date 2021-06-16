"use strict";
const axios = require("axios");
const weatherData = require("../data/weather.json");

function weatherByCity(req, res) {
  let searchQuery = req.query.searchQuery;

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
}

class Data {
  constructor(item) {
    (this.date = item.datetime), (this.description = item.weather.description);
  }
}

module.exports = {
  weatherFromApi: weatherFromApi,
  weatherByCity: weatherByCity,
};
