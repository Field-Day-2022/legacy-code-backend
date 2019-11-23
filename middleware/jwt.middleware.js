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
  // check for endpoints that don't require jwt auth
  let url = req.originalUrl;
  console.log(url);
  if (url.includes('/api/v2/login') || url.includes('/api/v2/token') || url.includes('/api/v2/docs/')) {
    next();
    return
  }

  // get token from header
  let header = req.headers['authorization'] || '';
  let token = header.split(/\s+/).pop() || '';
  let generator = new JWTToken();

  // verify the token
  try {
    let verify = generator.verifyJwtToken(token);
    console.log('Verified: ' + JSON.stringify(verify));

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
