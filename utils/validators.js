const validator = require('validator');

module.exports.validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }

  return value;
};

module.exports.validateEmail = (value) => {
  if (!validator.isEmail(value, { require_protocol: true })) {
    throw new Error('Неправильный формат элекронной почты');
  }

  return value;
};
