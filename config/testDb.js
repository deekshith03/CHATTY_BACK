const { MongoMemoryServer } = require('mongodb-memory-server')

const createServer = async () => {
  return await MongoMemoryServer.create()
}

module.exports = { createServer }
