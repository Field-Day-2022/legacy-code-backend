/*
 * File: user.router.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Router for the user endpoint
 */
const router = require('express').Router();
const Controller = require('./user.controller');

const controller = new Controller(global.db);

router.param('user_id', controller.user_id);

router
  .route('/')
  .get(controller.getAll)
  .post(controller.post);

router
  .route('/:user_id')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
