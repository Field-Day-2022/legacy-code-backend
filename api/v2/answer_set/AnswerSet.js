/*
 * File: AnswerSet.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description: Main class for the answer_set endpoint.
 */

/**
 * Contains methods to GET, POST, and DELETE answerset data
 * to/from the database.
 * @version 1.01
 * @since 2020-02-29
 */
class AnswerSetRepository {
  constructor(dao) {
    this.dao = dao;
  }
    
  /**
   * Returns data for all of the entries in the AnswerSet table.
   * @return a collection of JSON objects representing the answersets
   */
  getAll() {
    const sql = `SELECT * FROM AnswerSet`;

    return this.dao.all(sql, []);
  }
  
  /**
   * Returns data for the given answer set in the AnswerSet table.
   * @param set_name the name of the answerset to fetch data for
   * @return a JSON object representing the answerSetObject
   */
  getOne(set_name) {
    const sql = `SELECT * FROM AnswerSet WHERE set_name = ?`;

    return this.dao.get(sql, [set_name]);
  }
  
  /**
   * Saves a new answerset to the database.
   * @param answerSetObject a JSON object containing the answerset data
   * @return the ID of the new answerset object, which indicates success
   */
  post(answerSetObject) {
    const sql =
      'INSERT INTO AnswerSet (set_name, secondary_keys, answers, date_modified) VALUES (?, ?, ?, ?)';

    return this.dao.run(sql, [
      answerSetObject.set_name,
      answerSetObject.secondary_keys,
      answerSetObject.answers,
      answerSetObject.date_modified,
    ]);
  }
  
  /**
   * Updates an existing answerset entry.
   * @param answerSetObject a JSON object containing the updated answerset data
   * @return the ID of the answerset entry, which indicates success
   */
  update(answerSetObject) {
    const sql =
      'UPDATE AnswerSet SET set_name = ?, secondary_keys = ?, answers = ?, date_modified =? WHERE set_name = ?';

    return this.dao.run(sql, [
      answerSetObject.set_name,
      answerSetObject.secondary_keys,
      answerSetObject.answers,
      answerSetObject.date_modified,
      answerSetObject.set_name,
    ]);
  }

  /**
   * Deletes the answerset from the database.
   * @param set_name the name of the answerset to delete
   * @return the ID of the deleted answerset, which indicates success
   */
  delete(set_name) {
    const sql = `DELETE FROM AnswerSet WHERE set_name = ?`;

    return this.dao.run(sql, [set_name]);
  }
}

module.exports = AnswerSetRepository;
