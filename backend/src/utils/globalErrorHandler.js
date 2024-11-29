// Error handler middleware
const errorHandler = (err, req, res, next) => {
    // Set default status code and message
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
  
    // Log error details (only in development mode)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', err);
    }
  
    // Handle specific error types
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = err.message;
    } else if (err.name === 'CastError') {
      statusCode = 400;
      message = 'Invalid ID format';
    }
  
    // Send JSON response to the client
    res.status(statusCode).json({
      success: false,
      error: {
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      }
    });
  };
  
  module.exports = errorHandler;
  