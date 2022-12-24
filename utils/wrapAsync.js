const wrapAsync = async (controller, req, res, next) => {
  try {
    await controller(req, res, next)
  } catch (err) {
    next(err)
  }
}

module.exports = { wrapAsync }
