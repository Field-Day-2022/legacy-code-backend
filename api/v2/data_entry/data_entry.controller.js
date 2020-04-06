/*
 * File: data_entry_controller.js
 * Version: 1.01
 * Date: 2020-03-02
 * Description: Controller for the data_entry endpoint.
 */

const _ = require('lodash');
const DataEntryRepository = require('./DataEntry');

/**
 * DataEntry object controller class that maps endpoints to their corresponding object data methods.
 */
class DataEntryController {
  /**
   * Sets the global dao for this controller.
   * @constructor
   * @param dao The global dao for this controller.
   */
  constructor(dao) {
    this.repository = new DataEntryRepository(dao);

    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.post = this.post.bind(this);
    this.update = this.update.bind(this);
    this.move = this.move.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * Middleware that gets the session ID from the request parameters.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response sequence.
   * @param {number} session_id The session ID.
   */
  session_id(req, res, next, session_id) {
    req.session_id = session_id;
    next();
  }

  /**
   * Middleware that gets the entry ID from the request parameters.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response seuqence.
   * @param {number} entry_id The entry ID.
   */
  entry_id(req, res, next, entry_id) {
    req.entry_id = entry_id;
    next();
  }

  /**
   * Controller that maps the request to the get_all method in the DataEntry object.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response seuqence.
   * @returns {Promise<void>}
   */
  async getAll(req, res, next) {
    try {
      const rows = await this.repository.getAll(
        req.query.project_id,
        req.query.form_id,
        req.query.session_id
      );
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  /**
   * Controller that maps the request to the getOne method in the DataEntry object.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response seuqence.
   * @returns {Promise<void>}
   */
  async getOne(req, res, next) {
    try {
      const row = await this.repository.getOne(req.session_id, req.entry_id);
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
   * Controller that maps the request to the post method in the DataEntry object.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response seuqence.
   * @returns {Promise<void>}
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
   * Controller that maps the request to the update method in the DataEntry object.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response seuqence.
   * @returns {Promise<void>}
   */
  async update(req, res, next) {
    try {
      await this.repository.update(req.body);
      console.log(req.body);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  /**
   * Controller that maps the request to the move method in the DataEntry object.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response seuqence.
   * @returns {Promise<void>}
   */
  async move(req, res, next) {
    try {
      await this.repository.move(req.session_id, req.entry_id, req.query.new_id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  /**
   * Controller that maps the request to the delete method in the DataEntry object.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response seuqence.
   * @returns {Promise<void>}
   */
  async delete(req, res, next) {
    try {
      await this.repository.delete(req.session_id, req.entry_id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = DataEntryController;
