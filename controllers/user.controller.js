const { validationResult } = require('express-validator')
const {
  createUser,
  getUserWithEmail,
  comparePassword,
  findUsers
} = require('../services/user.services')

const registerUser = async (req, res) => {
  validationResult(req).throw()
  const { email, name, password, avatarImage } = req.body
  if (await getUserWithEmail(email)) {
    res.status(400).json({ error: 'already exists' })
  } else {
    const user = await createUser(email, name, password, avatarImage)
    res.status(200).send({
      email: user.email,
      name: user.name,
      id: user._id
    })
  }
}

const loginUser = async (req, res) => {
  validationResult(req).throw()
  const { email, password } = req.body
  const user = await getUserWithEmail(email)
  if (!user) {
    return res.status(400).send({ error: 'invalid credentials' })
  }
  const canLogin = await comparePassword(password, user)
  if (!canLogin) {
    return res.status(400).send({ error: 'invalid credentials' })
  }
  res.status(200).send({ email: user.email, name: user.name, id: user._id })
}

const getUsers = async (req, res) => {
  const userId = req.params.id
  res.status(200).send(await findUsers(userId))
}

module.exports = { registerUser, loginUser, getUsers }
