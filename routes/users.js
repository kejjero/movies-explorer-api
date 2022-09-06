const userRouter = require('express').Router();
const { patchMeValidator } = require('../middlewares/validators');

const {
  findAuthorizationUser,
  updateUser,
} = require('../controllers/users');

userRouter.get('/me', findAuthorizationUser);
userRouter.patch('/me', patchMeValidator, updateUser);

module.exports = userRouter;
