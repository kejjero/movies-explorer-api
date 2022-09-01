const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

const isURLCustomValidator = (value, helpers) => (isURL(value) ? value : helpers.message('Это поле заполнено некорректно, введите URL') && false);

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required(),
    image: Joi.string().required().custom(isURLCustomValidator),
    trailer: Joi.string().required().custom(isURLCustomValidator),
    thumbnail: Joi.string().required().custom(isURLCustomValidator),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateUpdateUser,
  validateDeleteMovie,
  validateCreateMovie,
};
