const jwt = require('jsonwebtoken');
const AuthorisationError = require('../errors/AuthorisationError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthorisationError('Необходима авторизация.'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthorisationError('Необходима авторизация.'));
  }

  req.user = payload;

  next();
  return true;
};
