/*
 * File: Session.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Handles the retrieval of session information
 */

class SessionRepository {
  constructor(dao) {
    this.dao = dao;
  }

  /**
   * Retrieves all sessions matching the project_id and form_id
   * @param project_id of the project
   * @param form_id  of the project
   * @returns {*}
   */
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

  /**
   * Retrieves a single session matching the session_id
   * @param session_id being searched for
   * @returns {*}
   */
  getOne(session_id) {
    const sql = `SELECT * FROM Session WHERE session_id = ?`;

    return this.dao.get(sql, [session_id]);
  }

  /**
   * Adds a new session to the database
   * @param sessionObject Contains the session data
   */
  post(sessionObject) {
    const sql =
      'INSERT INTO Session (session_id, date_created, session_json, project_id, date_modified, form_id) VALUES (?, ?, ?, ?, ?, ? )';

    let date_created = sessionObject.date_created;
    if (date_created === undefined || date_created === null) {
      date_created = sessionObject.session_id;
    }

    return this.dao.run(sql, [
      sessionObject.session_id,
      date_created,
      JSON.stringify(sessionObject.session_json),
      sessionObject.project_id,
      sessionObject.date_modified,
      sessionObject.form_id,
    ]);
  }

  /**
   * Updates information about a session within the database
   * @param sessionObject Contains new session information
   */
  update(sessionObject) {
    const sql =
      'UPDATE Session SET session_id = ?, date_created = ?, session_json = ?, project_id =  ?, date_modified = ?, form_id = ? WHERE session_id = ?';

    let date_created = sessionObject.date_created;
    if (date_created === undefined || date_created === null) {
      date_created = sessionObject.session_id;
    }

    return this.dao.run(sql, [
      sessionObject.session_id,
      date_created,
      JSON.stringify(sessionObject.session_json),
      sessionObject.project_id,
      sessionObject.date_modified,
      sessionObject.form_id,
      sessionObject.session_id,
    ]);
  }

  /**
   * Deletes a session in the database
   * @param session_id of session to be deleted
   */
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
