/*
 * File: project.controller.js
 * Version: 1.01
 * Date: 2020-03-07
 * Description: Controller for the project endpoint.
 */

const _ = require('lodash');
const ProjectRepository = require('./Project');

/**
 * Takes requests from the router and calls the appropriate function.
 * to/from the database.
 * @version 1.01
 * @since 2020-03-07
 */
class ProjectController {
  constructor(dao) {
    this.repository = new ProjectRepository(dao);

    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.post = this.post.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * Saves the project id to the request.
   * @param req the client request
   * @param res the response to be sent back to the client
   * @param next the next function to be called
   * @param proejct_id project id
   */
  project_id(req, res, next, project_id) {
    req.project_id = project_id;
    next();
  }
  
  /**
   * Retrieves all of the entries from the database
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
  * Retrieves a single entry via the project id
  * @param req the client request
  * @param res the response to be sent back to the client
  * @param next the next function to be called 
  */ 
  async getOne(req, res, next) {
    try {
      const row = await this.repository.getOne(req.project_id);
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
   * Posts new data from the body of the request to the database.
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
   * Updates the data of an existing entry.
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
   * Deletes the entry with the matching project id.
   * @param req the client request
   * @param res the response to be sent back to the client
   * @param next the next function to be called 
   */
  async delete(req, res, next) {
    try {
      await this.repository.delete(req.project_id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = ProjectController;
