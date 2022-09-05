const router = require('express').Router();
const { signInValidator, signUpValidator } = require('../middlewares/validators');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', signInValidator, login);

router.post('/signup', signUpValidator, createUser);

router.use('/users', auth, userRouter);

router.use('/movies', auth, movieRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

module.exports = router;
