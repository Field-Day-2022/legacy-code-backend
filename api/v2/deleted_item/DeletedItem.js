/*
 * File: DeletedItem.js
 * Date: 2020-03-02
 * Version: 1.01
 * Description: DeletedItem repository that acts the MySQL intermediate for the deleted_item endpoint.
 */

/**
 * Represents the DeletedItem object repository.
 */
class DeletedItemRepository {
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
   * @returns {*}
   */
  getAll() {
    const sql = `SELECT * FROM DeletedItem`;

    return this.dao.all(sql, []);
  }

  /**
   * Returns a single DataForm object using the form ID.
   * @param deleted_id The corresponding form ID.
   * @returns {*} The DataForm object.
   */
  getOne(deleted_id) {
    const sql = `SELECT * FROM DeletedItem WHERE deleted_id = ?`;

    return this.dao.get(sql, [deleted_id]);
  }

  /**
   * Post endpoint for adding a DataForm endpoint.
   * @param {*} deletedItemObject The DataForm object as a dict.
   * @returns {any | Promise | Promise<any> | void}
   */
  post(deletedItemObject) {
    const sql =
      ' INSERT INTO DeletedItem (deleted_id, date_deleted, table_name, item_json) VALUES (?, ?, ?, ? )';

    return this.dao.run(sql, [
      deletedItemObject.deleted_id,
      deletedItemObject.date_deleted,
      deletedItemObject.table_name,
      JSON.stringify(deletedItemObject.item_json),
    ]);
  }

  /**
   * Update endpoint for updating a DeletedItem object.
   * @param deletedItemObject The DataForm object.
   * @returns {any | Promise | Promise<any> | void}
   */
  update(deletedItemObject) {
    const sql =
      'UPDATE DeletedItem SET deleted_id = ?, date_deleted = ?, table_name = ?, item_json = ? WHERE deleted_id = ?';

    return this.dao.run(sql, [
      deletedItemObject.deleted_id,
      deletedItemObject.date_deleted,
      deletedItemObject.table_name,
      JSON.stringify(deletedItemObject.item_json),
      deletedItemObject.deleted_id,
    ]);
  }

  /**
   * Deletes a DeletedItem object from the database.
   * @param deleted_id The corresponding form ID.
   * @returns {Promise<[unknown, unknown]>}
   */
  delete(deleted_id) {
    const sql = `DELETE FROM DeletedItem WHERE deleted_id = ?`;

    return this.dao.run(sql, [deleted_id]);
  }
}

module.exports = DeletedItemRepository;
