const Router = require('express')
const { body } = require('express-validator')
const { registerUser, loginUser } = require('../controllers/user.controller')
const { wrapAsync } = require('../utils/wrapAsync')

const userRouter = Router()

userRouter.post(
  '/register',
  body('name', 'name is required').notEmpty(),
  body('email', 'Enter valid email').isEmail(),
  body('password', 'please enter valid password').matches(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/gim
  ),
  (req, res, next) => {
    wrapAsync(registerUser, req, res, next)
  }
)

userRouter.post(
  '/login',
  body('email', 'Enter valid email').isEmail(),
  body('password', 'please enter valid password').matches(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/gim
  ),
  (req, res, next) => {
    wrapAsync(loginUser, req, res, next)
  }
)

module.exports = userRouter
