/*
 * File: DataAccessObject.js
 * Version: 1.01
 * Date: 2020-03-07
 * Description: Handles database queries.
 */

const sqlite3 = require('sqlite3');

/**
 * Middleware for database access. Queries the database
 * and returns the result.
 * @version 1.01
 * @since 2020-03-07
 */
class AppDAO {
  
  /**
   * Connects to the database.
   * @param dbFilePath the path to the database file
   */
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, err => {
      if (err) {
        console.log('Could not connect to database', err);
      } else {
        console.log('Connected to database');
      }
    });
  }
  
  /**
   * Fetches data from the database
   * @param sql the SQL query
   * @param params an array of params; may be empty
   * @return a Promise containing the queried data if successful,
   * or an error message if unsuccessful
   */
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  /**
   * Adds new data to the database.
   * @param sql the SQL query
   * @param params an array of params; may be empty
   * @return a Promise containing the id of the new entry if successful,
   * or an error message if unsuccessful
   */
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          console.log('Error running sql ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }
  
  /**
   * Fetches and returns all of the data from the queried table.
   * @param sql the SQL query
   * @param params an array of params; may be empty
   * @return a Promise containing the queried data if successful,
   * or an error message if unsuccessful
   */
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = AppDAO;
