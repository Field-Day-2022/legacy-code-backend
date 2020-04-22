const fs = require('fs');
const jwt = require('jsonwebtoken');

const OPTIONS = {
  issuer: "FieldDay - Web",
  subject: "krshelle@asu.edu",
  audience: "fieldday.asu.edu",
  expiresIn: "168h",
  algorithm: "RS256"
};

class JWTToken {

  /**
   * Returns a token generated using the appropriate options and payload.
   * The token contains a payload of all the available endpoints the user
   * can access.
   *
   * @param {number} access_level - The granted access level of the user
   *  (null by default).
   * @returns {undefined|*} The signed jwt token.
   */
  getJwtToken(access_level) {
    try {
      let payload = {
        access_level: access_level,
        auth: true,
      };
      let privateKey = fs.readFileSync('./private.key', 'utf8');
      return jwt.sign(payload, privateKey, OPTIONS);
    } catch(err) {
      throw err;
    }
  }

  /**
   * Verifies the passed JWT token.
   *
   * @param {String} token - The signed JWT token to be verified.
   * @returns {*} Whether or not the token is valid.
   */
  verifyJwtToken(token) {
    try {
      let publicKey = fs.readFileSync('./public.key', 'utf8');
      return jwt.verify(token, publicKey, OPTIONS);
    } catch(err) {
      throw err;
    }
  }

  /**
   * Handles the token post request by generating and returning a JWT token.
   *
   * @param {number} access_level - The granted access level of the user (null
   *  by default).
   * @returns {*} The signed jwt token.
   */
  post(access_level) {
    return this.getJwtToken(access_level);
  }
}

module.exports = JWTToken;
