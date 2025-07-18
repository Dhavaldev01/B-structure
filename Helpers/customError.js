class customError extends Error {
  constructor(message,statusCode) {
    super(message)
    
    this.statusCode = statusCode ;
    this.status = `${statusCode}`.startsWith('4')?'fail':"error";
    // this.data = null;

    // this.message = message;
    // this.success = false;
    // this.errors = errors;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = customError;