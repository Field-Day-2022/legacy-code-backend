/*
 * File: User.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Handles the updating, retrieval and deletion of users within the database.
 */

class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  /**
   * Request to retrieve all users from the database
   */
  getAll() {
    const sql = `SELECT * FROM User`;

    return this.dao.all(sql, []);
  }

  /**
   * Request to retrieve one user matching the user_id
   * @param user_id of the user
   */
  getOne(user_id) {
    const sql = `SELECT * FROM User WHERE user_id = ?`;

    return this.dao.get(sql, [user_id]);
  }

  /**
   * Add new user into the database
   * @param userObject Contains the user_id, password, and access level of the new user
   */
  post(userObject) {
    const sql = `INSERT INTO User (user_id, password, access_level, date_modified) VALUES (?, ?, ?, ?)`;

    return this.dao.run(sql, [
      userObject.user_id,
      userObject.password,
      userObject.access_level,
      userObject.date_modified,
    ]);
  }

  /**
   * Updates a user's info within the database
   * @param userObject Contains the new user data
   */
  update(userObject) {
    const sql = `UPDATE User SET user_id = ?, password = ?, access_level = ?, date_modified = ? WHERE user_id = ?`;

    return this.dao.run(sql, [
      userObject.user_id,
      userObject.password,
      userObject.access_level,
      userObject.date_modified,
      userObject.user_id,
    ]);
  }

  /**
   * Deletes a user within the database
   * @param user_id of the user to be deleted
   */
  delete(user_id) {
    const sql = `DELETE FROM User WHERE user_id = ?`;

    return this.dao.run(sql, [user_id]);
  }
}

module.exports = UserRepository;
