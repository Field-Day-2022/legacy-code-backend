/*
 * File: index.js
 * Version: 1.01
 * Date: 2020-03-07
 * Description: Router class for the config endpoint.
 */

var _ = require('lodash');

//sets definitions for "dev" and "prod" abbreviations
//sets port to run out of; default is 8000
var config = {
  dev: 'development',
  prod: 'production',
  port: process.env.PORT || 8000,
};

//set runtime environment; default is development
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

//endpoint pointing to the environment type we will run in
var envConfig = require('./' + config.env);

module.exports = _.merge(config, envConfig);
