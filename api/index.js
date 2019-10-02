//	initialize an express router
var express = require('express');
var router = express.Router();

//	set routers for '/api' API path
router.use('/v2', require('./v2'));

//	export router for '/api'
module.exports = router;
