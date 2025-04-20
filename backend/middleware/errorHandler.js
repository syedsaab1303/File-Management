const red = require('colors');
const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`.red);
  
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Server Error',
      stack: process.env.NODE_ENV === 'production' ? '🥷' : err.stack,
    });
  };
  
  module.exports = errorHandler;
  