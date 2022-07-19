const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-error");

class notFound extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = notFound;
