/*
 * File: DataForm.js
 * Date: 2020-03-02
 * Version: 1.01
 * Description:
 */

/**
 * Represents the DataForm object repository.
 */
class DataFormRepository {

  /**
   * Matches this class with the project dao.
   * @constructor
   * @param dao The project dao
   */
  constructor(dao) {
    this.dao = dao;
  }

  /**
   * Returns all DataEntry objects from the database.
   * @param {number} project_id The corresponding project ID.
   * @returns {*}
   */
  getAll(project_id) {
    let sql = `SELECT * FROM DataForm`;
    const params = [];

    if (project_id) {
      sql = `${sql} INNER JOIN BelongsTo ON DataForm.form_id = BelongsTo.form_id WHERE BelongsTo.project_id = ?`;
      params.push(project_id);
    }

    return this.dao.all(sql, params);
  }

  /**
   * Returns a single DataForm object using the form ID.
   * @param form_id The corresponding form ID.
   * @returns {*} The DataForm object.
   */
  getOne(form_id) {
    const sql = `SELECT * FROM DataForm WHERE form_id = ?`;

    return this.dao.get(sql, [form_id]);
  }

  /**
   * Post endpoint for adding a DataForm endpoint.
   * @param {*} dataFormObject The DataForm object as a dict.
   * @returns {any | Promise | Promise<any> | void}
   */
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

  /**
   * Update endpoint for updating a DataForm object.
   * @param dataFormObject The DataForm object.
   * @returns {any | Promise | Promise<any> | void}
   */
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

  /**
   * Deletes a DataForm object from the database.
   * @param form_id The corresponding form ID.
   * @returns {Promise<[unknown, unknown]>}
   */
  delete(form_id) {
    const sql = `DELETE FROM DataForm WHERE form_id = ?`;

    return this.dao.run(sql, [form_id]);
  }
}

module.exports = DataFormRepository;
