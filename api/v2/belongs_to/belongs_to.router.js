/*
 * File: belongs_to_set.router.js
 * Version: 1.01
 * Date: 2020-03-03
 * Description: Router for the belongs_to endpoint.
 */

const router = require('express').Router();
const Controller = require('./belongs_to.controller');

//create the controller using the database
const controller = new Controller(global.db);

router.param('form_id', controller.form_id);
router.param('project_id', controller.project_id);

//if no query is included, router should return data for all belongs_to data
router
  .route('/')
  .get(controller.getAll)
  .post(controller.post);

//if form_id and project_id are included, return the belongs_to rows that
// match both of these parameters
router
  .route('/:form_id/:project_id')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
