/*
 * File: session.router.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Router for the session endpoint
 */
const router = require('express').Router();
const Controller = require('./session.controller');

const controller = new Controller(global.db);

router.param('session_id', controller.session_id);

router
  .route('/')
  .get(controller.getAll)
  .post(controller.post);

router
  .route('/:session_id')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
