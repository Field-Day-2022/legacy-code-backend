class ProjectRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll() {
    const sql = `SELECT * FROM Project`;

    return this.dao.all(sql, []);
  }

  getOne(project_id) {
    const sql = `SELECT * FROM Project WHERE project_id = ?`;

    return this.dao.get(sql, [project_id]);
  }

  post(projectObject) {
    const sql = `INSERT INTO Project (project_id, project_name, comments, date_modified) VALUES (?, ?, ?, ?)`;

    return this.dao.run(sql, [
      projectObject.project_id,
      projectObject.project_name,
      projectObject.comments,
      projectObject.date_modified,
    ]);
  }

  update(projectObject) {
    const sql = `UPDATE Project SET project_id = ?, project_name = ?, comments = ?, date_modified = ? WHERE project_id = ?`;

    return this.dao.run(sql, [
      [
        projectObject.project_id,
        projectObject.project_name,
        projectObject.comments,
        projectObject.date_modified,
        projectObject.project_id,
      ],
    ]);
  }

  delete(project_id) {
    const sql = `DELETE FROM Project WHERE project_id = ?`;

    return this.dao.run(sql, [project_id]);
  }
}

module.exports = ProjectRepository;
