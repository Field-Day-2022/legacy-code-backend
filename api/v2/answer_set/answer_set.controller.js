/*
 * File: answer_set.controller.js
 * Version: 1.01
 * Date: 2020-02-27
 * Description: Controller for the answer_set endpoint.
 */

const logger = require('../../../util/logger');
const _ = require('lodash');
const AnswerSetRepository = require('./AnswerSet');

/**
 * Takes requests from the router and calls the appropriate function.
 * @version 1.01
 * @since 2020-02-27
 */
class AnswerSetController {
  constructor(dao) {
    this.repository = new AnswerSetRepository(dao);

    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.post = this.post.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * Saves the name of the answer set to the request. 
   * @param req the client request
   * @param res the response to be sent back to the client
   * @param next the next function to be called
   * @param set_name the name of the answer set
   */
  set_name(req, res, next, set_name) {
    req.set_name = set_name;
    next();
  }
  
  /**
   * Retrieves all of the answer sets from the repository.
   * @param req the client request
   * @param res the response to be sent back to the client
   * @param next the next function to be called 
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
  * Retrieves the set with the matching name from the repository.
  * @param req the client request
  * @param res the response to be sent back to the client
  * @param next the next function to be called 
  */ 
  async getOne(req, res, next) {
    try {
      const row = await this.repository.getOne(req.set_name);
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
   * Posts the answer set data stored in the body of the request
   * to the database.
   * @param req the client request
   * @param res the response to be sent back to the client
   * @param next the next function to be called 
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
   * Updates the data of an existing answer set in the database
   * with the new data stored in the body of the request.
   * @param req the client request
   * @param res the response to be sent back to the client
   * @param next the next function to be called 
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
   * Deletes the answer set with given set name from the database.
   * @param req the client request
   * @param res the response to be sent back to the client
   * @param next the next function to be called 
   */
  async delete(req, res, next) {
    try {
      await this.repository.delete(req.set_name);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = AnswerSetController;
