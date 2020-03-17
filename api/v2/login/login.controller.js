/*
 * File: login.controller.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Controller class for the login endpoint
 */

const _ = require('lodash');
const LoginRepository = require('./Login');

/**
 * Handles /login requests for the server.
 * @version 1.01
 * @since 2020-02-29
 */
class ProjectController {
  constructor(dao) {
    this.repository = new LoginRepository(dao);

    this.login = this.login.bind(this);
  }

  /**
   * Login request handler
   * @param req Incoming request object
   * @param res Outgoing response to the request
   * @param next Calls next route handler
   */
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
