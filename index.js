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
const userRouter = require('./routes/user.router')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 8080
const HOST = '127.0.0.1'

connectDB().then(() => {
  app.listen(PORT, HOST)
  console.log('connection establised on 127.0.0.1:8080')
})

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to chatty backend application.' })
})

app.use('/api/user/', userRouter)
app.use(handleValidationError)
app.use(handleMongooseError)
app.use(handleDatabaseError)
app.use(handleDefaultError)
