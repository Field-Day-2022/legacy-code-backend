/*
 * File: answer_set.router.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Router for the answer_set endpoint.
 */

const router = require('express').Router();
const Controller = require('./answer_set.controller');

//create the controller using the database
const controller = new Controller(global.db);

//set the answer_set name
router.param('set_name', controller.set_name);

//if no query is included, router should data for all answersets
router
  .route('/')
  .get(controller.getAll)
  .post(controller.post);

//if a set name is included, router should return the data for
// that answerset only
router
  .route('/:set_name')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
