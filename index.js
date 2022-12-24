require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./config/db.config')
const {
  handleValidationError,
  handleMongooseError,
  handleDatabaseError,
  handleDefaultError
} = require('./middleware/errorHandler.middleware')
const { createServer } = require('http')
const { Server } = require('socket.io')
const userRouter = require('./routes/user.router')
const messageRouter = require('./routes/message.router')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 8080

connectDB()
  .then(() => {
    console.log('DB connected')
  })
  .catch((err) => {
    console.log(err)
  })

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: '*' }
})

const users = {}

io.on('connection', (socket) => {
  socket.on('setup', (userData) => {
    socket.join(userData.id)
    socket.userID = userData.id
    if (!users[userData.id]) users[userData.id] = []
    users[userData.id].push(socket.id)
    io.sockets.emit('online', Object.keys(users))
  })

  socket.on('disconnect', () => {
    users[socket.userID] = users[socket.userID].filter((e) => e !== socket.id)
    if (users[socket.userID].length === 0) {
      delete users[socket.userID]
    }
    io.sockets.emit('offline', Object.keys(users))
    socket.leave(socket.userID)
  })

  socket.on('send_message', (message) => {
    const receiverID = message.receiverID
    const senderID = message.senderID
    const content = message.content

    socket.in(receiverID).emit('receive_message', {
      content,
      senderID,
      receiverID,
      fromSelf: false
    })

    socket.in(senderID).emit('receive_message', {
      content,
      senderID,
      receiverID,
      fromSelf: true
    })
  })
})

httpServer.listen(PORT, () => console.log('listening on port 8080'))

app.use('/api/user/', userRouter)
app.use('/api/message/', messageRouter)
app.use(handleValidationError)
app.use(handleMongooseError)
app.use(handleDatabaseError)
app.use(handleDefaultError)
