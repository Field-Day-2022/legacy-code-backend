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
      let project_id = req.query.project_id;
      const rows = await this.repository.getAll(project_id);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async getLatest(req, res, next) {
    try {
      let project_id = req.query.project_id;
      const rows = await this.repository.getLatest(req.timestamp, project_id);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

}

module.exports = SyncController;