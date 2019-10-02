const router = require('express').Router();
const Controller = require('./contributes_to.controller');

const controller = new Controller(global.db);

router.param('user_id', controller.user_id);
router.param('project_id', controller.project_id);

router
  .route('/')
  .get(controller.getAll)
  .post(controller.post);

router
  .route('/:user_id/:project_id')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
