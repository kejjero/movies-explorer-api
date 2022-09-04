const errorHandler = (err, _req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message || 'Ошибка по умолчанию' });
  }
  res.status(500).send({ message: 'На сервере произошла ошибка' });
  return next();
};

module.exports = errorHandler;