const path = require('path');
//	initialize express application
const app = require('express')();
//	load config object
const config = require('./config');
//	load logger
const logger = require('./util/logger');
// Database Access Object
const DAO = require('./util/DataAccessObject');
// init database connection in server directory
const db = new DAO(path.join(__dirname, 'migrated-full.db'));
// make database globally available (maybe change soon)
global.db = db;

//	add global middleware before api
require('./middleware/global.middleware')(app);

//	set routers for base API paths
app.use('/api', require('./api'));

//	add global error handler to end of app stack
require('./middleware/error.middleware')(app);

//	begin listening for requests on port
app.listen(config.port);

logger.log('listening on http://localhost:' + config.port);
logger.log('environment: ' + config.env);
