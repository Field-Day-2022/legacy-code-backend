const router = require('express').Router();
const Controller = require('./token.controller');

const controller = new Controller();

router
  .route('/')
  .post(controller.post);

module.exports = router;