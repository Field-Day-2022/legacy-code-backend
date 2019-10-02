class AnswerSetRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll() {
    const sql = `SELECT * FROM AnswerSet`;

    return this.dao.all(sql, []);
  }

  getOne(set_name) {
    const sql = `SELECT * FROM AnswerSet WHERE set_name = ?`;

    return this.dao.get(sql, [set_name]);
  }

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

  delete(set_name) {
    const sql = `DELETE FROM AnswerSet WHERE set_name = ?`;

    return this.dao.run(sql, [set_name]);
  }
}

module.exports = AnswerSetRepository;
