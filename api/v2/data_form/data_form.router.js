/*
 * File: data_form_router.js
 * Date: 2020-03-02
 * Version: 1.01
 * Description:
 */

const router = require('express').Router();
const Controller = require('./data_form.controller');

const controller = new Controller(global.db);

router.param('form_id', controller.form_id);

router
  .route('/')
  .get(controller.getAll)
  .post(controller.post);

router
  .route('/:form_id')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
