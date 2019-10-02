const _ = require('lodash');
const LoginRepository = require('./Login');

class ProjectController {
  constructor(dao) {
    this.repository = new LoginRepository(dao);

    this.login = this.login.bind(this);
  }

  async login(req, res, next) {
    try {
      const result = await this.repository.login(req.body);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = ProjectController;
