/*
 * File: project.router.js
 * Version: 1.01
 * Date: 2020-03-07
 * Description: Router for the project endpoint.
 */

const express = require('express');
const router = express.Router();
const Controller = require('./project.controller');

//get the middleware to verify user's JWT
const verifyJWT_MW = require('../../../middleware/jwt.middleware');

//create the controller and point it at the database
const controller = new Controller(global.db);

//set the project id
router.param('project_id', controller.project_id);

//if no queries, retrieve data for all projects
router
  .route('/')
  .get(controller.getAll)
  .post(verifyJWT_MW, controller.post);

//if project id query is present, retrieve the data for that entry
router
  .route('/:project_id')
  .get(controller.getOne)
  .put(verifyJWT_MW, controller.update)
  .delete(verifyJWT_MW, controller.delete);

module.exports = router;
