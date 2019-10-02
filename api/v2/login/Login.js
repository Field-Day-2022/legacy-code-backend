class LoginRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async login({ username, password }) {
    const sql = `SELECT * FROM User WHERE user_id = "${username}" AND password = "${password}"`;

    const user = await this.dao.get(sql, []);

    return { auth: !!user, access_level: user ? user.access_level : 1 };
  }
}

module.exports = LoginRepository;
