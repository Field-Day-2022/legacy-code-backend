/*
 * File: contributes_to.router.js
 * Version: 1.01
 * Date: 2020-03-07
 * Description: Router for the contributes_to endpoint.
 */

const router = require('express').Router();
const Controller = require('./contributes_to.controller');

//create the controller and point it at the database
const controller = new Controller(global.db);

//set the user and project ids
router.param('user_id', controller.user_id);
router.param('project_id', controller.project_id);

//if no queries or routes indicated, retrieve data for all entries
router
  .route('/')
  .get(controller.getAll)
  .post(controller.post);

<<<<<<< HEAD
//if user and project ids are present, retrieve the single matching data entry
=======
//if user and project ids are present, retrieve the single matching data
>>>>>>> dev
router
  .route('/:user_id/:project_id')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
