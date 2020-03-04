/*
 * File: belongs_to.controller.js
 * Version: 1.01
 * Date: 2020-03-03
 * Description: Controller for the belongs_to endpoint.
 */

const _ = require('lodash');
const BelongsToRepository = require('./BelongsTo');

/**
 * Takes requests from the router and calls the appropriate function.
 * @version 1.01
 * @since 2020-02-27
 */
class BelongsToController {
  constructor(dao) {
    this.repository = new BelongsToRepository(dao);

    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.post = this.post.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
  /**
   * Saves the form ID of the target belongsTo relation to the request
   * @param req the client request
   * @param res the response to be sent back to the client
   * @param next the next function to be called
   * @param form_id the id of the form included in this relation
   */
  form_id(req, res, next, form_id) {
    req.form_id = form_id;
    next();
  }
    
  /**
   * Saves the project ID of the target belongsTo relation to the request
   * @param req the client request
   * @param res the response to be sent back to the client
   * @param next the next function to be called
   * @param project_id the id of the project included in this relation
   */
  project_id(req, res, next, project_id) {
    req.project_id = project_id;
    next();
  }
    
  /**
   * Retrieves all of the belongsTo rows from the repository.
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
  * Returns the row with the matching form and project IDs
  * @param req the client request
  * @param res the response to be sent back to the client
  * @param next the next function to be called 
  */ 
  async getOne(req, res, next) {
    try {
      const row = await this.repository.getOne(req.form_id, req.project_id);
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
   * Posts the belongsTo data stored in the body of the request
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
   * Updates the data of an existing belongsTo row in the database
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
   * Deletes the belongsTo with given form and project IDs
   * @param req the client request
   * @param res the response to be sent back to the client
   * @param next the next function to be called 
   */
  async delete(req, res, next) {
    try {
      await this.repository.delete(req.form_id, req.project_id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = BelongsToController;
