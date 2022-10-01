const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const BadRequestError = require('../errors/badRequestError');
const ServerError = require('../errors/serverError');

const {
  OK_CODE,
  CREATED_CODE,
} = require('../utils/constants');

module.exports.getSavedMovies = async (req, res, next) => {
  try {
    const savedMovies = await Movie.find({ owner: req.user._id });
    res.status(OK_CODE).send(savedMovies);
  } catch (err) {
    next(new BadRequestError('Произошла ошибка'));
  }
};

module.exports.createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  try {
    const newMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    });
    const movieWithLinkInfo = await newMovie.populate(['owner']);
    res.status(CREATED_CODE).send(movieWithLinkInfo);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(new ServerError('Произошла ошибка'));
    }
  }
};

module.exports.deleteSavedMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      throw new NotFoundError('Запрашиваемый фильм не найден');
    } else if (String(movie.owner) === String(req.user._id)) {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
      res.status(OK_CODE).send(deletedMovie);
    } else {
      throw new ForbiddenError('Вы не можете удалить фильм из чужого списка сохраненных фильмов');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};
