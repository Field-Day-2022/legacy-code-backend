var router = require('express').Router();
const Controller = require('./sync.controller');

const controller = new Controller(global.db);
router.param('timestamp', controller.timestamp);

router.route('/').get(controller.getAll);

router.route('/:timestamp').get(controller.getLatest);
module.exports = router;
