/*
 * File: invalidJWTToken.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Returns error message when an error occurs with JWT authentication.
 */

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