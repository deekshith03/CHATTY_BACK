const { Schema, model } = require('mongoose')
const defaultAvatar = require('../config/default')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50
  },
  password: {
    type: String,
    required: true,
    min: 8
  },

  avatarImage: {
    type: String,
    default: defaultAvatar
  }
})

module.exports = model('Users', userSchema)
