/*
 * File: bcrypt.util.js
 * Version: 1.01
 * Date: 2020-03-07
 * Description: Encrypts/decrypts user passwords in the database.
 */
  
const bcrypt = require('bcrypt');
const ROUNDS = 10;

/**
 * Encrypts the password to be written to the database.
 *
 * @param password The plain-text password.
 * @param callback The registered callback function of bcrypt to manage the hashing.
 */
exports.cryptPassword = function(password, callback) {
  bcrypt.genSalt(ROUNDS, function(err, salt) {
    if (err)
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });
  });
};

/**
 * Compares a plain text password with the word hash of the user. If the passwords
 * do not match, then the callback function is called.
 *
 * @param plainPass The plain-text password.
 * @param hashWord The hash string of the password.
 */
exports.comparePassword = async function(plainPass, hashWord) {
  return await bcrypt.compare(plainPass, hashWord)
};