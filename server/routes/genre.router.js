const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres

  // Set the query
  const sqlQuery = `
    SELECT 
      genres.id,
      genres.name,
      COUNT(movies.id) AS number_movies
    FROM movies
    JOIN movies_genres
      ON movies.id = movies_genres.movie_id
    JOIN genres
      ON genres.id = movies_genres.genre_id
    GROUP BY genres.id
    ORDER BY number_movies DESC;
  `

  // Get the values from the database
  pool.query(sqlQuery)
  .then( result => {
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR: Get all genres', err);
    res.sendStatus(500)
  })
});

module.exports = router;