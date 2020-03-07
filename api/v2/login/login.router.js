/*
 * File: login.router.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Router for the login endpoint
 */

const router = require('express').Router();
const Controller = require('./login.controller');

const controller = new Controller(global.db);

router.route('/').post(controller.login);

module.exports = router;
