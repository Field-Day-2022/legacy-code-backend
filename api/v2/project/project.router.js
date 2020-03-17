const express = require('express');
const router = express.Router();
const verifyJWT_MW = require('../../../middleware/jwt.middleware');

const Controller = require('./project.controller');

const controller = new Controller(global.db);

router.param('project_id', controller.project_id);

router
  .route('/')
  .get(controller.getAll)
  .post(verifyJWT_MW, controller.post);

router
  .route('/:project_id')
  .get(controller.getOne)
  .put(verifyJWT_MW, controller.update)
  .delete(verifyJWT_MW, controller.delete);

module.exports = router;
