const TokenGenerator = require('./Token');
const LoginRepository = require('../login/Login');

class TokenController {

  /**
   * Initializes the token generator and binds the post endpoint to the
   * post endpoint of the Token class.
   */
  constructor(dao) {
    this.generator = new TokenGenerator();
    this.loginRepo = new LoginRepository(dao);
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
      // get the user name and password from the body
      let username = req.body.username;
      let password = req.body.password;
      let user = await this.loginRepo.login({ username, password });

      // if the user fails to authenticate, respond saying the username
      // or password was incorrect
      if (!user['auth']) {
        res.json({
          auth: false,
          access_level: 0,
          message: "Username/password incorrect"
        });
      } else {
        // signs and returns a token
        let token = this.generator.getJwtToken(user['access_level']);
        res.json({
          auth: user['auth'],
          access_level: user['access_level'],
          message: 'User successfully authenticated',
          token: token,
        });
      }
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = TokenController;
