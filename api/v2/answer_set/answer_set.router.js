const router = require('express').Router();
const Controller = require('./answer_set.controller');

const controller = new Controller(global.db);

router.param('set_name', controller.set_name);

router
  .route('/')
  .get(controller.getAll)
  .post(controller.post);

router
  .route('/:set_name')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
