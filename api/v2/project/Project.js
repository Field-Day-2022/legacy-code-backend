/*
 * File: Project.js
 * Version: 1.01
 * Date: 2020-03-07
 * Description: Main class for the project endpoint.
 */

/**
 * Contains methods to GET, POST, and DELETE project entries
 * to/from the database.
 * @version 1.01
 * @since 2020-03-07
 */
class ProjectRepository {
  constructor(dao) {
    this.dao = dao;
  }

  /**
   * Returns data for all entries in the table.
   * @return a collection of JSON objects representing the entries
   */
  getAll() {
    const sql = `SELECT * FROM Project`;

    return this.dao.all(sql, []);
  }
  
  /**
   * Returns data for the given project.
   * @param project_id id of the project entry
   * @return a JSON object representing the project object
   */
  getOne(project_id) {
    const sql = `SELECT * FROM Project WHERE project_id = ?`;

    return this.dao.get(sql, [project_id]);
  }
  
  /**
   * Saves a new project to the database.
   * @param projectObject a JSON object containing the project data
   * @return the ID of the new project, which indicates success
   */
  post(projectObject) {
    const sql = `INSERT INTO Project (project_id, project_name, comments, date_modified) VALUES (?, ?, ?, ?)`;

    return this.dao.run(sql, [
      projectObject.project_id,
      projectObject.project_name,
      projectObject.comments,
      projectObject.date_modified,
    ]);
  }
  
   /**
   * Updates an existing entry.
   * @param projectObject a JSON object containing the updated data
   * @return the ID of the entry, which indicates success
   */
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
  
  /**
   * Deletes the data entry from the database.
   * @param project_id id of the project to be deleted
   * @return the ID of the deleted entry, which indicates success
   */
  delete(project_id) {
    const sql = `DELETE FROM Project WHERE project_id = ?`;

    return this.dao.run(sql, [project_id]);
  }
}

module.exports = ProjectRepository;
