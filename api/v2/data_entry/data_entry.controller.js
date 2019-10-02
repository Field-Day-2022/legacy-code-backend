const _ = require('lodash');
const DataEntryRepository = require('./DataEntry');

class DataEntryController {
  constructor(dao) {
    this.repository = new DataEntryRepository(dao);

    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.post = this.post.bind(this);
    this.update = this.update.bind(this);
    this.move = this.move.bind(this);
    this.delete = this.delete.bind(this);
  }

  session_id(req, res, next, session_id) {
    req.session_id = session_id;
    next();
  }

  entry_id(req, res, next, entry_id) {
    req.entry_id = entry_id;
    next();
  }

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

  async post(req, res, next) {
    try {
      await this.repository.post(req.body);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async update(req, res, next) {
    try {
      await this.repository.update(req.body);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async move(req, res, next) {
    try {
      await this.repository.move(req.session_id, req.entry_id, req.query.new_id);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

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
