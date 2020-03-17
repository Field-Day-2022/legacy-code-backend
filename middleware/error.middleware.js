var logger = require('../util/logger');

module.exports = function(app) {
  app.use(function(err, req, res, next) {
    logger.error(err.stack);
  });
};
