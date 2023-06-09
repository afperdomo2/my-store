function logErrors(err, req, res, next) {
  console.log('🚀 ~ file: errorHandler.js:2 ~ logErrors');
  console.error(err);
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  console.log('🚀 ~ file: errorHandler.js:8 ~ boomErrorHandler');
  if (!err.isBoom) {
    next(err);
  }
  const { output } = err;
  res.status(output.statusCode).json(output.payload);
}

function errorHandler(err, req, res, next) {
  console.log('🚀 ~ file: errorHandler.js:8 ~ errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = { logErrors, boomErrorHandler, errorHandler };
