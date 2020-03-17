/*
 * File: session.controller.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Controller class for the session endpoint
 */

const logger = require('../../../util/logger');
const _ = require('lodash');
const SessionRepository = require('./Session');

/**
 * Handles /session requests for the server.
 * @version 1.01
 * @since 2020-02-29
 */
class SessionController {
  constructor(dao) {
    this.repository = new SessionRepository(dao);

    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.post = this.post.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * Sets the session_id on the request object
   * @param req Incoming request object
   * @param res Outgoing response to the request
   * @param next Calls next route handler
   * @param session_id
   */
  session_id(req, res, next, session_id) {
    req.session_id = session_id;
    next();
  }

  /**
   * Retrieves all the sessions within the database
   * @param req Incoming request object
   * @param res Outgoing response to the request
   * @param next Calls next route handler
   * @returns {Promise<void>}
   */
  async getAll(req, res, next) {
    try {
      const rows = await this.repository.getAll(req.query.project_id, req.query.form_id);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  /**
   * Retrieves one session within the database matching the session_id
   * @param req Incoming request object
   * @param res Outgoing response to the request
   * @param next Calls next route handler
   * @returns {Promise<void>}
   */
  async getOne(req, res, next) {
    try {
      const row = await this.repository.getOne(req.session_id);
      if (row == null) {
        res.sendStatus(404);
      } else {
        res.json(row);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  /**
   * Add a new session to the database and passes the info to the session controller
   * @param req Incoming request object
   * @param res Outgoing response to the request
   * @param next Calls next route handler
   */
  async post(req, res, next) {
    try {
      // logger.log(req.body);
      await this.repository.post(req.body);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  /**
   * Updates a session in the database
   * @param req Incoming request object
   * @param res Outgoing response to the request
   * @param next Calls next route handler
   */
  async update(req, res, next) {
    try {
      await this.repository.update(req.body);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  /**
   * Deletes a session from the database
   * @param req Incoming request object
   * @param res Outgoing response to the request
   * @param next Calls next route handler
   */
  async delete(req, res, next) {
    try {
      await this.repository.delete(req.session_id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = SessionController;
