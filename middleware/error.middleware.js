/*
 * File: error.middleware.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Middleware that catches errors and prints to stack trace
 */

var logger = require('../util/logger');

module.exports = function(app) {
  app.use(function(err, req, res, next) {
    logger.error(err.stack);
  });
};
