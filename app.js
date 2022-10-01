const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const { PORT } = process.env;

app.use(limiter);
app.use(cors());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

async function startApp() {
  await mongoose.connect(process.env.DATABASE_URL);
  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

startApp();
