/*
 * File: ContributesTo.js
 * Version: 1.01
 * Date: 2020-03-07
 * Description: Main class for the contributes_to endpoint.
 */

/**
 * Contains methods to GET, POST, and DELETE contributes_to entries
 * to/from the database.
 * @version 1.01
 * @since 2020-03-07
 */
class ContributesToRepository {
  constructor(dao) {
    this.dao = dao;
  }

  /**
   * Returns data for all of the entries in the ContributesTo table.
   * @return a collection of JSON objects representing the contributes_to
   * entries.
   */
  getAll() {
    const sql = `SELECT * FROM ContributesTo`;

    return this.dao.all(sql, []);
  }
  
  /**
   * Returns data for the given contributesTo relation.
   * @param user_id id of the user entry will be associated with
   * @param project_id id of the project entry will be associated with
   * @return a JSON object representing the answerSetObject
   */
  getOne(user_id, project_id) {
    const sql = `SELECT * FROM ContributesTo WHERE user_id = ? AND project_id = ?`;

    return this.dao.get(sql, [user_id, project_id]);
  }
  
  /**
   * Saves a new ContributesTo entry to the database.
   * @param contributesToObject a JSON object containing the contributesTo data
   * @return the ID of the new contributesTo object, which indicates success
   */
  post(contributesToObject) {
    const sql = `INSERT INTO ContributesTo (user_id, project_id, date_modified) VALUES (?, ?, ? )`;

    return this.dao.run(sql, [
      contributesToObject.user_id,
      contributesToObject.project_id,
      contributesToObject.date_modified,
    ]);
  }

  /**
   * Updates an existing entry.
   * @param contributesToObject a JSON object containing the updated data
   * @return the ID of the entry, which indicates success
   */
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

 /**
   * Deletes the data entry from the database.
   * @param user_id user id associated with the entry to be deleted
   * @param project_id project id associated with the entry to be deleted
   * @return the ID of the deleted entry, which indicates success
   */
  delete(user_id, project_id) {
    const sql = `DELETE FROM ContributesTo WHERE user_id = ? AND project_id = ?`;

    return this.dao.run(sql, [user_id, project_id]);
  }
}

module.exports = ContributesToRepository;
