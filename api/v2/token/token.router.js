const router = require('express').Router();
const Controller = require('./token.controller');

const controller = new Controller(global.db);

router
  .route('/')
  .post(controller.post);

module.exports = router;