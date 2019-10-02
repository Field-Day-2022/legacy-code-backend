var _ = require('lodash');
const Sync = require('./sync');

class SyncController {
  constructor(dao) {
    this.repository = new Sync(dao);

    this.getAll = this.getAll.bind(this);
    this.getLatest = this.getLatest.bind(this)
  }

  timestamp(req, res, next, timestamp) {
    req.timestamp = timestamp;
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

  async getLatest(req, res, next) {
    try {
      const rows = await this.repository.getLatest(req.timestamp);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

}

module.exports = SyncController;