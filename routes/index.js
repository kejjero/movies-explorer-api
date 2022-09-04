const router = require('express').Router();
const auth = require('../middlewares/auth');
const authRouter = require('./auth');
const users = require('./users');
const movies = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

router.use(authRouter);

router.use(auth);

router.use(users);
router.use(movies);

router.use('*', (_, __, next) => next(new NotFoundError('Запрашиваемая страница не найдена')));

module.exports = router;
