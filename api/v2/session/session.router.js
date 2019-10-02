const router = require('express').Router();
const Controller = require('./session.controller');

const controller = new Controller(global.db);

router.param('session_id', controller.session_id);

router
  .route('/')
  .get(controller.getAll)
  .post(controller.post);

router
  .route('/:session_id')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
