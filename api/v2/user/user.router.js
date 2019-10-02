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
