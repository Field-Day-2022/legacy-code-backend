/*
 * File: BelongsTo.js
 * Version: 1.01
 * Date: 2020-03-03
 * Description: Main class for the belongs_to endpoint.
 */

/**
 * Contains methods to GET, POST, and DELETE belongsTo data
 * to/from the database.
 * @version 1.01
 * @since 2020-02-29
 */
class BelongsToRepository {
  constructor(dao) {
    this.dao = dao;
  }

  /**
   * Returns data for all of the entries in the BelongsTo table.
   * @return a collection of JSON objects representing the belongsTo relations
   */
  getAll() {
    const sql = `SELECT * FROM BelongsTo`;

    return this.dao.all(sql, []);
  }
  
  /**
   * Returns data for the given belongsTo relation
   * @param form_id id of the form included in the relation
   * @param project_id id of the project included in the relation
   * @return a JSON object representing the belongsToObject
   */
  getOne(form_id, project_id) {
    const sql = `SELECT * FROM BelongsTo WHERE form_id = ? AND project_id = ?`;

    return this.dao.get(sql, [form_id, project_id]);
  }
  
  /**
   * Saves a new belongsTo to the database.
   * @param belongsToObject a JSON object containing the belongsTo data
   * @return the ID of the new belongsTo object, which indicates success
   */
  post(belongsToObject) {
    const sql = `INSERT INTO BelongsTo (form_id, project_id, date_modified) VALUES (?, ?, ? )`;

    return this.dao.run(sql, [
      belongsToObject.form_id,
      belongsToObject.project_id,
      belongsToObject.date_modified,
    ]);
  }

  /**
   * Updates an existing belongsTo entry.
   * @param belongsToObject a JSON object containing the updated belongsTo data
   * @return the ID of the belongsTo entry, which indicates success
   */
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

  /**
   * Deletes the belongsTo from the database.
   * @param form_id id of the form included in the relation
   * @param project_id id of the project included in the relation
   * @return the ID of the deleted belongsTo entry, which indicates success
   */
  delete(form_id, project_id) {
    const sql = `DELETE FROM BelongsTo WHERE form_id = ?, AND project_id = ?`;

    return this.dao.run(sql, [form_id, project_id]);
  }
}

module.exports = BelongsToRepository;
