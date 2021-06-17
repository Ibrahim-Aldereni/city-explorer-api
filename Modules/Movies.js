"use strict";

const axios = require("axios");

let memory = {};

function moviesFromApi(req, res) {
  let cityName = req.query.searchQuery;
  let key = process.env.MOVIE_API_KEY;

  if (memory[cityName] !== undefined) {
    res.status(200).send(memory[cityName]);
    console.log("from memory");
  } else {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}`;
    axios
      .get(url)
      .then((response) => {
        let result = response.data.results.map((item) => {
          return new Data(item);
        });
        memory[cityName] = result;
        result.length == 0 ? res.send("No movies") : res.send(result);
        console.log("from API");
      })
      .catch((err) => {
        res.status(500).send("movies not found in this city");
      });
  }
}

class Data {
  constructor(item) {
    (this.title = item.title),
      (this.poster = `https://image.tmdb.org/t/p/w500${item.poster_path}`);
  }
}

module.exports = moviesFromApi;
