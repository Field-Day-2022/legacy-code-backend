/*
 * File: sync.js
 * Version: 1.01
 * Date: 2020-02-29
 * Description:
 */

class Sync {
    constructor(dao) {
      this.dao = dao;
      this.apiUrl = "/api/v2/";
    }

    /**
     * Retrieves all entries within the database
     * @param project_id
     * @returns {Promise<Promise<any>>}
     */
    async getAll(project_id) {
        let result = {};
        result.updates = 0;
	
        const users = await get(this.dao, getAllRows("User", project_id));
        result.updates += users.length;
        result.user = users.map(user => this.apiUrl + "User/" + user.user_id);

        const projects = await get(this.dao, getAllRows("Project", project_id));
        result.updates += projects.length;
        result.project = projects.map(proj => this.apiUrl + "project/" + proj.project_id);

        const contributesTos = await get(this.dao, getAllRows("ContributesTo", project_id));
        result.updates += contributesTos.length;
        result.contributesTo = contributesTos.map(
            cTo => this.apiUrl + "contributes_to/" + cTo.user_id + "/" + cTo.project_id 
        );

        const dataForms = await get(this.dao, getAllRows("DataForm", project_id));
        result.updates += dataForms.length;
        result.dataForm = dataForms.map(form => this.apiUrl + "data_form/" + form.form_id);

        const belongsTo = await get(this.dao, getAllRows("BelongsTo", project_id));
        result.updates += belongsTo.length;
        result.belongsTo = belongsTo.map(
            bTo => this.apiUrl + "belongs_to/" + bTo.form_id + "/" + bTo.project_id
        );
	
        const answerSets = await get(this.dao, getAllRows("AnswerSet", project_id));
        result.updates += answerSets.length;
        result.answerSet = answerSets.map(set => this.apiUrl + "answer_set/" + set.set_name);

        const sessions = await get(this.dao, getAllRows("Session", project_id));
        result.updates += sessions.length;
        result.session = sessions.map(session => this.apiUrl + "session/" + session.session_id);

        const dataEntries = await get(this.dao, getAllRows("DataEntry", project_id));
        result.updates += dataEntries.length;
        result.dataEntry = dataEntries.map(
            entry => this.apiUrl + "data_entry/" + entry.session_id + "/" + entry.entry_id
        );  
        return Promise.resolve(result);
    }

    /**
     * Retrieves the latest project matching the timestamp and project_id
     * @param timestamp 
     * @param project_id
     * @returns {Promise<void>}
     */
    async getLatest(timestamp, project_id) {
        let result = {};
        result.updates = 0;
	
	const users = await get(this.dao, getLatestRows("User", timestamp, project_id));
        result.updates += users.length;
        result.user = users.map(user => this.apiUrl + "User/" + user.user_id);

        const projects = await get(this.dao, getLatestRows("Project", timestamp, project_id));
        result.updates += projects.length;
        result.project = projects.map(proj => this.apiUrl + "project/" + proj.project_id);

        const contributesTos = await get(this.dao, getLatestRows("ContributesTo", timestamp, project_id));
        result.updates += contributesTos.length;
        result.contributesTo = contributesTos.map(
            cTo => this.apiUrl + "contributes_to/" + cTo.user_id + "/" + cTo.project_id 
        );

        const dataForms = await get(this.dao, getLatestRows("DataForm", timestamp, project_id));
        result.updates += dataForms.length;
        result.dataForm = dataForms.map(form => this.apiUrl + "data_form/" + form.form_id);

        const belongsTo = await get(this.dao, getLatestRows("BelongsTo", timestamp, project_id));
        result.updates += belongsTo.length;
        result.belongsTo = belongsTo.map(
            bTo => this.apiUrl + "belongs_to/" + bTo.form_id + "/" + bTo.project_id
        );

	const answerSets = await get(this.dao, getLatestRows("AnswerSet", timestamp, project_id));
        result.updates += answerSets.length;
        result.answerSet = answerSets.map(set => this.apiUrl + "answer_set/" + set.set_name);

        const sessions = await get(this.dao, getLatestRows("Session", timestamp, project_id));
        result.updates += sessions.length;
        result.session = sessions.map(session => this.apiUrl + "session/" + session.session_id);

        const dataEntries = await get(this.dao, getLatestRows("DataEntry", timestamp, project_id));
        result.updates += dataEntries.length;
        result.dataEntry = dataEntries.map(
            entry => this.apiUrl + "data_entry/" + entry.session_id + "/" + entry.entry_id
        );  

        const deletedItems = await get(this.dao, getDeletedItems(timestamp, project_id));
        result.updates += deletedItems.length;
        result.deletedItem = deletedItems.map(
            item => this.apiUrl + "deleted_item/" + item.deleted_id
        );  
    
        return result;

    }
}

/**
 * Executes the provided query on the database.
 * @param {Object} dao The database.
 * @param {String} query The query to perform on the database.
 */
async function get(dao, query) {
    return dao.all(query, [], (err, rows) => {
            if(err) {
                reject(err);
            }else {
                resolve(rows);
            }
        });
}

/**
 * Retrieves all sync belonging to a specific project
 * @param tableName Table to be searched
 * @param project_id ID belonging to the project
 * @returns {string}
 */
var getAllRows = function(tableName, project_id) {
    if (tableName === "AnswerSet" || tableName === "User") {
	return "SELECT * FROM " + tableName;
    } else if (tableName === "DataForm") { 
        return "SELECT DataForm.form_id, DataForm.form_name,"
        + " DataForm.template_json, DataForm.date_modified"
        + " FROM DataForm INNER JOIN BelongsTo"
        + " ON BelongsTo.form_id = DataForm.form_id"
        + " WHERE project_id = " + project_id;
    } else {
        return "SELECT * FROM " + tableName
            + " WHERE project_id = " + project_id;
    }
};

/**
 * Retrieves most recent sync
 * @param tableName Table to be searched
 * @param timestamp Date of the sync
 * @param project_id ID belonging to the project
 * @returns {string}
 */
var getLatestRows = function(tableName, timestamp, project_id) {
    if (tableName === "AnswerSet" || tableName === "User") {
	return "SELECT * FROM " + tableName + " WHERE date_modified >= " + timestamp;
    } else if (tableName === "DataForm") {
        return "SELECT DataForm.form_id, DataForm.form_name,"
        + " DataForm.template_json, DataForm.date_modified"
        + " FROM DataForm INNER JOIN BelongsTo"
        + " ON BelongsTo.form_id = DataForm.form_id"
        + " WHERE project_id = " + project_id
        + " AND date_modified >= " + timestamp;
    } else {
        return "SELECT * FROM " + tableName
        + " WHERE date_modified >= " + timestamp
	+ " AND project_id = " + project_id;
    }
};

/**
 * Retrieves all deleted items on or after the timestamp
 * @param timestamp Date to be searched
 * @returns {string}
 */
var getDeletedItems = function(timestamp) {
    return "SELECT * "
    + "FROM DeletedItem "  
    + " WHERE date_deleted >= " + timestamp;
};

module.exports = Sync;