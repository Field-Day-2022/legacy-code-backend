/*
 * File: deleted_item_controller.js
 * Version: 1.01
 * Date: 2020-03-02
 * Description: Controller for the deleted_item endpoint.
 */

const _ = require('lodash');
const DeletedItemRepository = require('./DeletedItem');

/**
 * DeletedItem object controller class that maps endpoints to their corresponding object data methods.
 */
class DeletedItemController {

  /**
   * Sets the global dao for this controller.
   * @constructor
   * @param dao The global dao for this controller.
   */
  constructor(dao) {
    this.repository = new DeletedItemRepository(dao);

    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.post = this.post.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * Middleware that gets the deleted ID from the request parameters.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response sequence.
   * @param {number} deleted_id The deleted ID.
   */
  deleted_id(req, res, next, deleted_id) {
    req.deleted_id = deleted_id;
    next();
  }

  /**
   * Controller that maps the request to the get_all method in the DeletedItem object.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response seuqence.
   * @returns {Promise<void>}
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
   * Controller that maps the request to the getOne method in the DeletedItem object.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response seuqence.
   * @returns {Promise<void>}
   */
  async getOne(req, res, next) {
    try {
      const row = await this.repository.getOne(req.deleted_id);
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
   * Controller that maps the request to the post method in the DeletedItem object.
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
   * Controller that maps the request to the update method in the DeletedItem object.
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
   * Controller that maps the request to the delete method in the DeletedItem object.
   * @param {XMLHttpRequest} req The HTTP request object.
   * @param {XMLHttpRequestResponseType} res The HTTP response object.
   * @param next The next part of the response seuqence.
   * @returns {Promise<void>}
   */
  async delete(req, res, next) {
    try {
      await this.repository.delete(req.deleted_id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = DeletedItemController;
