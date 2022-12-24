const { findMsg, createMessage } = require('../services/message.services')

const getMessages = async (req, res) => {
  const data = await findMsg(req.body.data)
  res.status(200).send(data)
}

const addMessage = async (req, res) => {
  const data = await createMessage(req.body.data)

  if (data) {
    res.status(200).send({ msg: 'message added successfully' })
  } else {
    res.status(400).send({ msg: 'failed to add message' })
  }
}

module.exports = { getMessages, addMessage }
