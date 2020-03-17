/*
 * File: data_entry_router.js
 * Version: 1.01
 * Date: 2020-03-02
 * Description: Express router class for the data_entry endpoint.
 */

const router = require('express').Router();
const Controller = require('./data_entry.controller');

const controller = new Controller(global.db);

router.param('session_id', controller.session_id);
router.param('entry_id', controller.entry_id);

router
  .route('/')
  .get(controller.getAll)
  .post(controller.post);

router.route('/:session_id/:entry_id/move').put(controller.move);

router
  .route('/:session_id/:entry_id')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
