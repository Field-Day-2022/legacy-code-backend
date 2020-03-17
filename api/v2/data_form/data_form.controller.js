/*
 * File: data_form_controller.js
 * Date: 2020-03-02
 * Version: 1.01
 * Description:
 */

const _ = require('lodash');
const DataFormRepository = require('./DataForm');

/**
 * DataForm object controller class that maps endpoints to their corresponding object data methods.
 */
class DataFormController {

  /**
  * Sets the global dao for this controller.
  * @constructor
  * @param dao The global dao for this controller.
  */
  constructor(dao) {
    this.repository = new DataFormRepository(dao);

    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.post = this.post.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * Middleware that gets the form ID from the request parameters.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response sequence.
   * @param {number} form_id The session ID.
   */
  form_id(req, res, next, form_id) {
    req.form_id = form_id;
    next();
  }

  /**
   * Controller that maps the request to the get_all method in the DataForm object.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response seuqence.
   * @returns {Promise<void>}
   */
  async getAll(req, res, next) {
    try {
      const rows = await this.repository.getAll(req.query.project_id);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  /**
   * Controller that maps the request to the getOne method in the DataForm object.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response seuqence.
   * @returns {Promise<void>}
   */
  async getOne(req, res, next) {
    try {
      const row = await this.repository.getOne(req.form_id);
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
   * Controller that maps the request to the post method in the DataForm object.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response seuqence.
   * @returns {Promise<void>}
   */
  async post(req, res, next) {
    try {
      await this.repository.post(req.body, req.query.project_id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  /**
   * Controller that maps the request to the update method in the DataForm object.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response seuqence.
   * @returns {Promise<void>}
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
   * Controller that maps the request to the delete method in the DataForm object.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response seuqence.
   * @returns {Promise<void>}
   */
  async delete(req, res, next) {
    try {
      await this.repository.delete(req.form_id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = DataFormController;
