const Router = require('express')
const { wrapAsync } = require('../utils/wrapAsync')
const { getMessages, addMessage } = require('../controllers/message.controller')

const messageRouter = Router()

messageRouter.post('/getmessages', (req, res, next) => {
  wrapAsync(getMessages, req, res, next)
})

messageRouter.post('/addmessage', (req, res, next) => {
  wrapAsync(addMessage, req, res, next)
})

module.exports = messageRouter
