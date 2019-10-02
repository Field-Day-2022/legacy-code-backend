class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll() {
    const sql = `SELECT * FROM User`;

    return this.dao.all(sql, []);
  }

  getOne(user_id) {
    const sql = `SELECT * FROM User WHERE user_id = ?`;

    return this.dao.get(sql, [user_id]);
  }

  post(userObject) {
    const sql = `INSERT INTO User (user_id, password, access_level, date_modified) VALUES (?, ?, ?, ?)`;

    return this.dao.run(sql, [
      userObject.user_id,
      userObject.password,
      userObject.access_level,
      userObject.date_modified,
    ]);
  }

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

  delete(user_id) {
    const sql = `DELETE FROM User WHERE user_id = ?`;

    return this.dao.run(sql, [user_id]);
  }
}

module.exports = UserRepository;
