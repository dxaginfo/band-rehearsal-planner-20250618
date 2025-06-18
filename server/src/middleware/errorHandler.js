// Error handling middleware
exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Check for MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate field value entered',
      error: Object.keys(err.keyValue).map(key => `${key} already exists`).join(', ')
    });
  }

  // Check for MongoDB validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      message: 'Validation failed',
      error: messages.join(', ')
    });
  }

  // Check for MongoDB cast error (invalid ID)
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Resource not found',
      error: `Invalid ${err.path}: ${err.value}`
    });
  }

  // Default error response
  res.status(err.statusCode || 500).json({
    message: err.message || 'Server Error',
    error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.stack
  });
};
