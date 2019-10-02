class DataEntryRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll(project_id, form_id, session_id) {
    let sql =
      process.env.REACT_APP_BATEMAN_BUILD === 'true'
        ? 'SELECT DataEntry.*, Session.session_json FROM DataEntry INNER JOIN Session ON DataEntry.session_id = Session.session_id'
        : 'SELECT DataEntry.* FROM DataEntry';
    const params = [];

    if (project_id || form_id || session_id) {
      sql = `${sql} WHERE`;
    }

    if (project_id) {
      sql = `${sql} DataEntry.project_id = ?`;
      params.push(project_id);
    }

    if (form_id) {
      sql = `${sql} ${project_id ? 'AND' : ''} DataEntry.form_id = ?`;
      params.push(form_id);
    }

    if (session_id) {
      sql = `${sql} ${project_id || form_id ? 'AND' : ''} DataEntry.session_id = ?`;
      params.push(session_id);
    }

    return this.dao.all(sql, params);
  }

  getOne(session_id, entry_id) {
    const sql = `SELECT * FROM DataEntry WHERE session_id = ? AND entry_id = ?`;

    return this.dao.get(sql, [session_id, entry_id]);
  }

  post(dataEntryObject) {
    const sql =
      'INSERT INTO DataEntry (session_id, entry_id, form_id, date_modified, entry_json, project_id) VALUES (?, ?,?, ?, ?, ? )';

    return this.dao.run(sql, [
      dataEntryObject.session_id,
      dataEntryObject.entry_id,
      dataEntryObject.form_id,
      Math.round(Date.now() / 1000),
      JSON.stringify(dataEntryObject.entry_json),
      dataEntryObject.project_id,
    ]);
  }

  update(dataEntryObject) {
    const sql =
      'UPDATE DataEntry SET session_id = ?, entry_id = ?, form_id =  ?, date_modified = ?, entry_json = ?, project_id = ? WHERE session_id = ? AND entry_id = ?';

    return this.dao.run(sql, [
      dataEntryObject.session_id,
      dataEntryObject.entry_id,
      dataEntryObject.form_id,
      Math.round(Date.now() / 1000),
      JSON.stringify(dataEntryObject.entry_json),
      dataEntryObject.project_id,
      dataEntryObject.session_id,
      dataEntryObject.entry_id,
    ]);
  }

  async move(session_id, entry_id, new_id) {
    const oldSql = 'SELECT * FROM DataEntry WHERE session_id = ? AND entry_id = ?';
    const oldResult = await this.dao.get(oldSql, [session_id, entry_id]);

    const sessionSql = 'SELECT * FROM Session WHERE session_id = ?';
    const sessionResult = await this.dao.get(sessionSql, [new_id]);

    if (session_id !== new_id && !!sessionResult) {
      const deleteSql = 'DELETE FROM DataEntry WHERE session_id = ? AND entry_id = ?';

      await this.dao.run(deleteSql, [session_id, entry_id]);

      const addSql =
        'INSERT INTO DataEntry (session_id, entry_id, form_id, date_modified, entry_json, project_id) VALUES (?, ?,?, ?, ?, ? )';

      await this.dao.run(addSql, [
        new_id,
        oldResult.entry_id,
        oldResult.form_id,
        Math.round(Date.now() / 1000),
        oldResult.entry_json,
        oldResult.project_id,
      ]);

      return { success: true };
    } else {
      return { success: false };
    }
  }

  async delete(session_id, entry_id) {
    const deleteSql = 'DELETE FROM DataEntry WHERE session_id = ? AND entry_id = ?';
    const addSql =
      'INSERT INTO DeletedItem (deleted_id, date_deleted, table_name, item_json) VALUES (?, ?, ?, ?)';

    const row = JSON.stringify(await this.getOne(session_id, entry_id));
    return Promise.all([
      this.dao.run(deleteSql, [session_id, entry_id]),
      this.dao.run(addSql, [entry_id, Math.round(Date.now() / 1000), 'DataEntry', row]),
    ]);
  }
}

module.exports = DataEntryRepository;
