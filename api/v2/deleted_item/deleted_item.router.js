/*
 * File: deleted_item_router.js
 * Version: 1.01
 * Date: 2020-03-02
 * Description: Express router class for the deleted_item endpoint.
 */

const router = require('express').Router();
const Controller = require('./deleted_item.controller');

const controller = new Controller(global.db);

router.param('deleted_id', controller.deleted_id);

router
  .route('/')
  .get(controller.getAll)
  .post(controller.post);

router
  .route('/:deleted_id')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
