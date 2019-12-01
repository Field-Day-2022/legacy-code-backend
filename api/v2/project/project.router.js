var express = require('express');
var router = express.Router();

const Controller = require('./project.controller');

const controller = new Controller(global.db);

router.param('project_id', controller.project_id);

router
  .route('/')
  .get(controller.getAll)
  .post(controller.post);

router
  .route('/:project_id')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.delete);

router
  .route('/names')
  .get(controller.getNames);

module.exports = router;
