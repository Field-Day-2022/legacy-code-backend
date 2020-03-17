/*
 * File: Login.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Handles login verification
 */
const bcrypt = require('../../../util/bcrypt.util');

class LoginRepository {
  constructor(dao) {
    this.dao = dao;
  }

  /**
   * Verifies the provided username and password
   * @param username of the user
   * @param password of the user
   */
  async login({ username, password }) {
    const sql = `SELECT * FROM User WHERE user_id = "${username}"`;

    const user = await this.dao.get(sql, []);

    return await bcrypt.comparePassword(password, user.password) ?
        { auth: true, access_level: user.access_level } :
        { auth: false, access_level: 0 };
  }
}

module.exports = LoginRepository;
