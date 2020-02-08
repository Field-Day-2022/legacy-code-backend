class SessionRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll(project_id, form_id) {
    let sql = `SELECT * FROM Session`;
    const params = [];

    if (project_id || form_id || (typeof session_id !== 'undefined' && session_id)) {
      sql = `${sql} WHERE`;
    }

    if (project_id) {
      sql = `${sql} project_id = ?`;
      params.push(project_id);
    }

    if (form_id) {
      sql = `${sql} ${project_id ? 'AND' : ''} form_id = ?`;
      params.push(form_id);
    }

    return this.dao.all(sql, params);
  }

  getOne(session_id) {
    const sql = `SELECT * FROM Session WHERE session_id = ?`;

    return this.dao.get(sql, [session_id]);
  }

  post(sessionObject) {
    const sql =
      'INSERT INTO Session (session_id, date_created, session_json, project_id, date_modified, form_id) VALUES (?, ?, ?, ?, ?, ? )';

    return this.dao.run(sql, [
      sessionObject.session_id,
      sessionObject.date_created,
      JSON.stringify(sessionObject.session_json),
      sessionObject.project_id,
      sessionObject.date_modified,
      sessionObject.form_id,
    ]);
  }

  update(sessionObject) {
    const sql =
      'UPDATE Session SET session_id = ?, date_created = ?, session_json = ?, project_id =  ?, date_modified = ?, form_id = ? WHERE session_id = ?';

    if(sessionObject.date_created === null) {
      sessionObject.date_created = sessionObject.session_id;
    }

    return this.dao.run(sql, [
      sessionObject.session_id,
      sessionObject.date_created,
      JSON.stringify(sessionObject.session_json),
      sessionObject.project_id,
      sessionObject.date_modified,
      sessionObject.form_id,
      sessionObject.session_id,
    ]);
  }

  async delete(session_id) {
    const deleteSession = `DELETE FROM Session WHERE session_id = ?`;
    const deleteEntries = `DELETE FROM DataEntry WHERE session_id = ?`;

    const addSql =
      'INSERT INTO DeletedItem (deleted_id, date_deleted, table_name, item_json) VALUES (?, ?, ?, ?)';
    const row = JSON.stringify(await this.getOne(session_id));

    return Promise.all([
      this.dao.run(deleteSession, [session_id]),
      this.dao.run(deleteEntries, [session_id]),
      this.dao.run(addSql, [session_id, Math.round(Date.now() / 1000), 'Session', row]),
    ]);
  }
}

module.exports = SessionRepository;
