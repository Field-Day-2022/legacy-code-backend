class BelongsToRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll() {
    const sql = `SELECT * FROM BelongsTo`;

    return this.dao.all(sql, []);
  }

  getOne(form_id, project_id) {
    const sql = `SELECT * FROM BelongsTo WHERE form_id = ? AND project_id = ?`;

    return this.dao.get(sql, [form_id, project_id]);
  }

  post(belongsToObject) {
    const sql = `INSERT INTO BelongsTo (form_id, project_id, date_modified) VALUES (?, ?, ? )`;

    return this.dao.run(sql, [
      belongsToObject.form_id,
      belongsToObject.project_id,
      belongsToObject.date_modified,
    ]);
  }

  update(belongsToObject) {
    const sql = `UPDATE BelongsTo SET form_id = ?, project_id = ?, date_modified = ? WHERE form_id = ? AND project_id = ?`;

    return this.dao.run(sql, [
      belongsToObject.form_id,
      belongsToObject.project_id,
      belongsToObject.project_id,
      belongsToObject.form_id,
      belongsToObject.project_id,
    ]);
  }

  delete(form_id, project_id) {
    const sql = `DELETE FROM BelongsTo WHERE form_id = ?, AND project_id = ?`;

    return this.dao.run(sql, [form_id, project_id]);
  }
}

module.exports = BelongsToRepository;
