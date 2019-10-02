const router = require('express').Router();
const Controller = require('./belongs_to.controller');

const controller = new Controller(global.db);

router.param('form_id', controller.form_id);
router.param('project_id', controller.project_id);

router
  .route('/')
  .get(controller.getAll)
  .post(controller.post);

router
  .route('/:form_id/:project_id')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
