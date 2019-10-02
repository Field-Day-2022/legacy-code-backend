const router = require('express').Router();
const Controller = require('./login.controller');

const controller = new Controller(global.db);

router.route('/').post(controller.login);

module.exports = router;
