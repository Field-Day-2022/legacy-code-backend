class DataFormRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll(project_id) {
    let sql = `SELECT * FROM DataForm`;
    const params = [];

    if (project_id) {
      sql = `${sql} INNER JOIN BelongsTo ON DataForm.form_id = BelongsTo.form_id WHERE BelongsTo.project_id = ?`;
      params.push(project_id);
    }

    return this.dao.all(sql, params);
  }

  getOne(form_id) {
    const sql = `SELECT * FROM DataForm WHERE form_id = ?`;

    return this.dao.get(sql, [form_id]);
  }

  post(dataFormObject, project_id) {
    const formSql =
      'INSERT INTO DataForm (form_id, form_name, template_json, date_modified, is_session_form) VALUES (?, ?, ?, ?, ? )';

    const belongsToSql =
      'INSERT INTO BelongsTo (form_id, project_id, date_modified) VALUES (?, ?, ?)';

    return Promise.all([
      this.dao.run(formSql, [
        dataFormObject.form_id,
        dataFormObject.form_name,
        dataFormObject.template_json,
        dataFormObject.date_modified,
        dataFormObject.is_session_form,
      ]),

      this.dao.run(belongsToSql, [
        dataFormObject.form_id,
        project_id,
        Math.round(Date.now() / 1000),
      ]),
    ]);
  }

  update(dataFormObject) {
    const sql =
      'UPDATE DataForm SET form_id = ?, form_name = ?, template_json = ?, date_modified = ?, is_session_form = ? WHERE form_id = ?';

    return this.dao.run(sql, [
      dataFormObject.form_id,
      dataFormObject.form_name,
      dataFormObject.template_json,
      dataFormObject.date_modified,
      dataFormObject.is_session_form,
      dataFormObject.form_id,
    ]);
  }

  delete(form_id) {
    const sql = `DELETE FROM DataForm WHERE form_id = ?`;

    return this.dao.run(sql, [form_id]);
  }
}

module.exports = DataFormRepository;
