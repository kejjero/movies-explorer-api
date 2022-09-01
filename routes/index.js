const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use(auth);

router.use(require('./users'));
router.use(require('./movies'));

router.use('*', (_, __, next) => next(new NotFoundError('Запрашиваемая страница не найдена')));

module.exports = router;
