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

//localhost:3001/weather?searchQuery=...
server.get("/weather", (req, res) => {
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
});

//localhost:3001...
server.get("*", (req, res) => {
  res.status(404).send("Sorry, this page not found");
});

server.listen(PORT, () => {
  console.log(`Listing on port: ${PORT}`);
});
