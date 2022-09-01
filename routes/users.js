const router = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validation');
const { getUser, updateUser } = require('../controllers/users');

router.get('/users/me', getUser);
router.patch('/users/me', validateUpdateUser, updateUser);

module.exports = router;
