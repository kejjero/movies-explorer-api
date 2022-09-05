const movieRouter = require('express').Router();
const { postMovieValidator, deleteMovieValidator } = require('../middlewares/validators');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/', getMovies);
movieRouter.post('/', postMovieValidator, createMovie);
movieRouter.delete('/:movieId', deleteMovieValidator, deleteMovie);

module.exports = movieRouter;
