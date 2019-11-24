const JWTToken = require('../api/v2/token/Token');
const InvalidJWTToken = require('../error/invalidJWTToken');

/**
 * Middleware used to verify a JWT token.
 *
 * @param req - The http request object
 * @param res - The http response object
 * @param next - The next endpoint in the http response sequence
 */
function verifyJWT_MW(req, res, next) {
  // get token from header
  let header = req.headers['authorization'] || '';
  let token = header.split(/\s+/).pop() || '';
  let generator = new JWTToken();

  // verify the token
  try {
    let verify = generator.verifyJwtToken(token);

    if (!verify['auth']) {
      throw new InvalidJWTToken('Invalid JWT token');
    } else {
      next()
    }
  } catch (err) {
    res.json(err)
  }
}

module.exports = verifyJWT_MW;
