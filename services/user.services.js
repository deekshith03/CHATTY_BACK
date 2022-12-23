const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

const getUserWithEmail = async (email) => {
  return await User.findOne({ email: email })
}

const createUser = async (email, name, password, avatarImage) => {
  const user = new User({ name, email, avatarImage })
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(password, salt)
  await user.save()

  return user
}
const comparePassword = async (password, user) => {
  return await bcrypt.compare(password, user.password)
}

const getUsers = async () => {
  return await User.find({})
}

module.exports = { getUserWithEmail, createUser, comparePassword, getUsers }
