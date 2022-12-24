const {
  BAD_REQUEST,
  DB_ERROR,
  INTERNAL_SERVER_ERROR
} = require('../utils/statusCodes')

const wrapper = (message) => ({ errors: [{ message }] })

const handleValidationError = (error, req, res, next) => {
  if (error instanceof Error && 'array' in error) {
    return res.status(BAD_REQUEST).send({ errors: error.array() })
  }
  next(error)
}

const handleMongooseError = (error, req, res, next) => {
  if (error instanceof Error && error.name === 'MongooseError') {
    return res.status(DB_ERROR).send(wrapper(error.message))
  }
  next(error)
}

const handleDatabaseError = (error, req, res, next) => {
  if (error instanceof Error && error.name === 'MongoServerError') {
    return res.status(DB_ERROR).send(wrapper(error.message))
  }
  next(error)
}

const handleDefaultError = (error, req, res, next) => {
  if (error instanceof Error) {
    return res.status(INTERNAL_SERVER_ERROR).send(wrapper(error.message))
  }
  next(error)
}

module.exports = {
  handleValidationError,
  handleMongooseError,
  handleDatabaseError,
  handleDefaultError
}
