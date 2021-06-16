"use strict";

const axios = require("axios");

function moviesFromApi(req, res) {
  let cityName = req.query.searchQuery;
  let key = process.env.MOVIE_API_KEY;

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}`;

  axios
    .get(url)
    .then((response) => {
      let result = response.data.results.map((item) => {
        return new Data(item);
      });
      result.length == 0 ? res.send("No movies") : res.send(result);
    })
    .catch((err) => {
      res.status(500).send("movies not found in this city");
    });
}

class Data {
  constructor(item) {
    (this.title = item.title),
      (this.poster = `https://image.tmdb.org/t/p/w500${item.poster_path}`);
  }
}

module.exports = moviesFromApi;
