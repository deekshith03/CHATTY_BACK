const MongoMemoryServer = require('mongodb-memory-server')
const mongoose = require('mongoose')
const { createServer } = require('./testDb')

let mongod = MongoMemoryServer | null

const connectDB = async () => {
  let dbUrl = ''
  if (process.env.NODE_ENV === 'test') {
    mongod = await createServer()
    dbUrl = mongod.getUri()
  }
  await mongoose.set('strictQuery', false)
  await mongoose.connect(dbUrl)
  console.log('DB connected')
}

const disconnectDB = async () => {
  await mongoose.connection.close()
  if (mongod) {
    await mongod.stop()
  }
}

module.exports = { connectDB, disconnectDB }
