class DeletedItemRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll() {
    const sql = `SELECT * FROM DeletedItem`;

    return this.dao.all(sql, []);
  }

  getOne(deleted_id) {
    const sql = `SELECT * FROM DeletedItem WHERE deleted_id = ?`;

    return this.dao.get(sql, [deleted_id]);
  }

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

  delete(deleted_id) {
    const sql = `DELETE FROM DeletedItem WHERE deleted_id = ?`;

    return this.dao.run(sql, [deleted_id]);
  }
}

module.exports = DeletedItemRepository;
