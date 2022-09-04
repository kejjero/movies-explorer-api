const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

module.exports = router;
