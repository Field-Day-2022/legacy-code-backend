/*
 * File: Login.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Handles login verification
 */

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
    const sql = `SELECT * FROM User WHERE user_id = "${username}" AND password = "${password}"`;

    const user = await this.dao.get(sql, []);

    return { auth: !!user, access_level: user ? user.access_level : 1 };
  }
}

module.exports = LoginRepository;
