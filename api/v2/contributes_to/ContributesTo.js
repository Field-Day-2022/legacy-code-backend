class ContributesToRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll() {
    const sql = `SELECT * FROM ContributesTo`;

    return this.dao.all(sql, []);
  }

  getOne(user_id, project_id) {
    const sql = `SELECT * FROM ContributesTo WHERE user_id = ? AND project_id = ?`;

    return this.dao.get(sql, [user_id, project_id]);
  }

  post(contributesToObject) {
    const sql = `INSERT INTO ContributesTo (user_id, project_id, date_modified) VALUES (?, ?, ? )`;

    return this.dao.run(sql, [
      contributesToObject.user_id,
      contributesToObject.project_id,
      contributesToObject.date_modified,
    ]);
  }

  update(contributesToObject) {
    const sql = `UPDATE ContributesTo SET user_id = ?, project_id = ?, date_modified = ? WHERE user_id = ?, AND project_id = ?`;

    return this.dao.run(sql, [
      contributesToObject.user_id,
      projectObject.project_id,
      contributesToObject.project_id,
      contributesToObject.user_id,
      contributesToObject.project_id,
    ]);
  }

  delete(user_id, project_id) {
    const sql = `DELETE FROM ContributesTo WHERE user_id = ? AND project_id = ?`;

    return this.dao.run(sql, [user_id, project_id]);
  }
}

module.exports = ContributesToRepository;
