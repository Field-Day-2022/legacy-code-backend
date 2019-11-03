const logger = require('../../../util/logger');
const TokenGenerator = require('./Token');

class TokenController {

  /**
   * Initializes the token generator and binds the post endpoint to the
   * post endpoint of the Token class.
   */
  constructor() {
    this.generator = new TokenGenerator();
    this.post = this.post.bind(this);
  }

  /**
   * Checks the username and password passed by the user, confirms that
   * they are valid credentials and return a token if they are valid. If
   * they are invalid, the error json ir returned.
   *
   * @param req The http request object.
   * @param res The http response object.
   * @param next
   * @returns {Promise<void>} A token in the form of a json as an http response.
   */
  async post(req, res, next) {
    try {
      let token = this.generator.post();
      res.json({token: token, refresh: ""});
    } catch (err) {
      console.error(err);
      logger.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = TokenController;
