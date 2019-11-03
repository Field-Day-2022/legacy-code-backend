const logger = require('../../../util/logger');
const TokenGenerator = require('./Token');

class TokenController {
  constructor() {
    this.generator = new TokenGenerator();
    this.post = this.post.bind(this);
  }

  async post(req, res, next) {
    try {
      let token = this.generator.post();
      res.json({token: token});
    } catch (err) {
      console.error(err);
      logger.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = TokenController;
