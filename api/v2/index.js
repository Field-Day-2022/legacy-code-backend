//	initialize an express router
const express = require('express');
const router = express.Router();
const verifyJWT_MW = require('../../middleware/jwt.middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

// swagger ui (w/o explorer)
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

//	set routers for '/api/v2' API path
router.use('/sync', require('./sync/sync.router'));
router.use('/user', require('./user/user.router'));
router.use('/project', require('./project/project.router'));
router.use('/data_form', require('./data_form/data_form.router'));
router.use('/data_entry', require('./data_entry/data_entry.router'));
router.use('/session', require('./session/session.router'));
router.use('/answer_set', require('./answer_set/answer_set.router'));
router.use('/deleted_item', require('./deleted_item/deleted_item.router'));
router.use('/contributes_to', require('./contributes_to/contributes_to.router'));
router.use('/belongs_to', require('./belongs_to/belongs_to.router'));
router.use('/login', require('./login/login.router'));
router.use('/token', require('./token/token.router'));

//	export router for '/api'
module.exports = router;
