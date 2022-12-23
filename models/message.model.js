const { Schema, model } = require('mongoose')

const messageSchema = Schema(
  {
    message: {
      text: { type: String, required: true }
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Messages', messageSchema)
