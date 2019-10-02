const _ = require('lodash');
const DeletedItemRepository = require('./DeletedItem');

class DeletedItemController {
  constructor(dao) {
    this.repository = new DeletedItemRepository(dao);

    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.post = this.post.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  deleted_id(req, res, next, deleted_id) {
    req.deleted_id = deleted_id;
    next();
  }

  async getAll(req, res, next) {
    try {
      const rows = await this.repository.getAll();
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

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
