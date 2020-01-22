const bcrypt = require('../../../util/bcrypt.util');

class LoginRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async login({ username, password }) {
    const sql = `SELECT * FROM User WHERE user_id = "${username}"`;

    const user = await this.dao.get(sql, []);

    return await bcrypt.comparePassword(password, user.password) ?
        { auth: true, access_level: user.access_level } :
        { auth: false, access_level: 0 };
  }
}

module.exports = LoginRepository;
