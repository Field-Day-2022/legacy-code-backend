/*
 * File: logger.js
 * Version: 1.01
 * Date: 2020-03-07
 * Description: Generates log files for the program.
 */

// no var needed here, colors will attached colors
// to String.prototype
require('colors');
var _ = require('lodash');

var config = require('../config');

// create a noop (no operation) function for when loggin is disabled
var noop = function() {};
// check if loggin is enabled in the config
// if it is, then use console.log
// if not then noop
var consoleLog = config.logging ? console.log.bind(console) : noop;

var logger = {
  /**
   * Initiates the log and writes a standard entry.
   */
  log: function() {
    var tag = '[ ✨ LOG ✨ ]'.green;
    // arguments is an array like object with all the passed
    // in arguments to this function
    var args = _.toArray(arguments).map(function(arg) {
      if (typeof arg === 'object') {
        // turn the object to a string so we
        // can log all the properties and color it
        var string = JSON.stringify(arg, null, 2);
        return tag + '  ' + string.cyan;
      } else {
        return tag + '  ' + arg.cyan;
      }
    });

    // call either console.log or noop here
    // with the console object as the context
    // and the new colored args :)
    consoleLog.apply(console, args);
  },
  
  /**
   * Creates a log entry for an error.
   */
  error: function() {
    var args = _.toArray(arguments).map(function(arg) {
      arg = arg.stack || arg;
      var name = arg.name || '[ ❌ ERROR ❌ ]';
      var log = name.yellow + '  ' + arg.red;
      return log;
    });

    consoleLog.apply(console, args);
  },
};

module.exports = logger;
