/*
 * File: global.middleware.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Libraries required by middleware
 */

var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var override = require('method-override');

module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(override());
};
