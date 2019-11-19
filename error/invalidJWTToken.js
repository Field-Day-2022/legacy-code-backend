/**
 * Error used to catch additional JWT authentication errors.
 */
class InvalidJWTToken extends Error {
  constructor (message) {
    super(message);
    this.name = this.constructor.name;
    this.status = 401;
  }

  statusCode() {
    return this.status
  }
}

module.exports = InvalidJWTToken;