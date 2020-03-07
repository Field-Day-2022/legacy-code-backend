/*
 * File: user.controller.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Controller class for the user endpoint
 */

const _ = require('lodash');
const UserRepository = require('./User');

/**
 * Handles /user database requests
 * @version 1.01
 * @since 2020-02-29
 */
class UserController {
  constructor(dao) {
    this.repository = new UserRepository(dao);

    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.post = this.post.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * Retrieves the user_id from the request and reroutes
   * to the next route handler.
   * @param req Incoming request object
   * @param res Outgoing response to the request
   * @param next Calls next route handler
   * @param user_id of the user
   */
  user_id(req, res, next, user_id) {
    req.user_id = user_id;
    next();
  }


  /**
   * Retrieves all users from the database
   * @param req Incoming request object
   * @param res Outgoing response to the request
   * @param next Calls next route handler
   */
  async getAll(req, res, next) {
    try {
      const rows = await this.repository.getAll();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  /**
   * Retrieves the first user matching the user_id
   * @param req Incoming request object
   * @param res Outgoing response to the request
   * @param next Calls next route handler
   */
  async getOne(req, res, next) {
    try {
      const row = await this.repository.getOne(req.user_id);
      if(row == null) {
        res.sendStatus(404);
      }else {
        res.json(row);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  /**
   * Adds new user to the database
   * @param req Incoming request object
   * @param res Outgoing response to the request
   * @param next Calls next route handler
   */
  async post(req, res, next) {
    try {
      await this.repository.post(req.body);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }


  /**
   * Updates a user in the database
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
   * Deletes a user from the database with the matching user_id
   * @param req Incoming request object
   * @param res Outgoing response to the request
   * @param next Calls next route handler
   */
  async delete(req, res, next) {
    try {
      await this.repository.delete(req.user_id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = UserController;
