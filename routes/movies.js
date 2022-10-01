const express = require('express');
const { celebrate, Joi } = require('celebrate');

const movieRoutes = express.Router();
const { validateURL } = require('../utils/validators');

const {
  getSavedMovies,
  createMovie,
  deleteSavedMovie,
} = require('../controllers/movies');

movieRoutes.get('/', getSavedMovies);
movieRoutes.post('/', express.json(), celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(validateURL, 'URL validation').required(),
    trailerLink: Joi.string().custom(validateURL, 'URL validation').required(),
    thumbnail: Joi.string().custom(validateURL, 'URL validation').required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);
movieRoutes.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteSavedMovie);

module.exports = movieRoutes;
