const express = require('express');
const { celebrate, Joi } = require('celebrate');

const userRoutes = express.Router();
const { validateEmail } = require('../utils/validators');

const {
  getUser,
  updateUser,
} = require('../controllers/users');

userRoutes.get('/me', getUser);
userRoutes.patch('/me', express.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().custom(validateEmail, 'Email validation').required(),
  }),
}), updateUser);

module.exports = userRoutes;
