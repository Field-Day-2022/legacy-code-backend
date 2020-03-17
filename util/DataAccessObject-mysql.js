/*
 * File: DataAccessObject-mysql.js
 * Version: 1.01
 * Date: 2020-03-07
 * Description: Executes database queries.
 */

/**
 * Middleware for database access. Directly executes
 * SQL queries to retrieve or post data to the
 * database.
 * @version 1.01
 * @since 2020-03-07
 */
class AppDAO {
  
  /**
   * Initiates connection to the database
   * @param conn the connection channel to use
   */
  setConnection(conn) {
    this.db = conn;
  }
  
  /**
   * Fetches data from the database.
   * @param sql the SQL query
   * @param params an array of params; may be empty
   * @return a Promise containing the queried data if successful,
   * or an error message if unsuccessful
   */
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.execute(sql, params)
        .then(result => {
          resolve(result[0][0]);
        }).catch(err => {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
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
      this.db.execute(sql, params)
        .then(result => {
          resolve(result[0]);
        }).catch(err => {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
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
    console.log("DAO ALL");
    return this.run(sql, params);
  }
}

module.exports = AppDAO;
