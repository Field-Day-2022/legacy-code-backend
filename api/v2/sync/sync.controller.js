/*
 * File: sync.controller.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Controller class for the sync endpoint
 */

var _ = require('lodash');
const Sync = require('./sync');

/**
 * Handles /sync requests for the server.
 * @version 1.01
 * @since 2020-02-29
 */
class SyncController {
  constructor(dao) {
    this.repository = new Sync(dao);

    this.getAll = this.getAll.bind(this);
    this.getLatest = this.getLatest.bind(this)
  }

  /**
   * Sets the timestamp on the request object
   * @param req Incoming request object
   * @param res Outgoing response to the request
   * @param next Calls next route handler
   * @param timestamp of the sync
   */
  timestamp(req, res, next, timestamp) {
    req.timestamp = timestamp;
    next();
  }

  /**
   * Retrieves all projects from the database
   * @param req Incoming request object
   * @param res Outgoing response to the request
   * @param next Calls next route handler
   */
  async getAll(req, res, next) {
    try {
      let project_id = req.query.project_id;
      const rows = await this.repository.getAll(project_id);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  /**
   * Retrieves the latest project matching the timestamp and project_id
   * @param req Incoming request object
   * @param res Outgoing response to the request
   * @param next Calls next route handler
   */
  async getLatest(req, res, next) {
    try {
      let project_id = req.query.project_id;
      const rows = await this.repository.getLatest(req.timestamp, project_id);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

}

module.exports = SyncController;