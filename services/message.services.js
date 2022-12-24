const Messages = require('../models/message.model')

const findMsg = async (data) => {
  const { from, to } = data

  const messages = await Messages.find({
    users: {
      $all: [from, to]
    }
  }).sort({ updatedAt: 1 })

  const projectedMessages = messages.map((msg) => {
    return {
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text
    }
  })

  return projectedMessages
}

const createMessage = async (data) => {
  const { from, to, message } = data
  const msg = await Messages.create({
    message: { text: message },
    users: [from, to],
    sender: from
  })

  return msg
}

module.exports = { findMsg, createMessage }
