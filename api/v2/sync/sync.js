class Sync {
    constructor(dao) {
      this.dao = dao;
      this.apiUrl = "/api/v2/";
    }
  
    async getAll() {
        let result = {};
        result.updates = 0;

        const users = await get(this.dao, getAllRows("User"));
        result.updates += users.length;
        result.user = users.map(user => this.apiUrl + "User/" + user.user_id);

        const projects = await get(this.dao, getAllRows("Project"));
        result.updates += projects.length;
        result.project = projects.map(proj => this.apiUrl + "project/" + proj.project_id);

        const contributesTos = await get(this.dao, getAllRows("ContributesTo"));
        result.updates += contributesTos.length;
        result.contributesTo = contributesTos.map(
            cTo => this.apiUrl + "contributes_to/" + cTo.user_id + "/" + cTo.project_id 
        );

        const dataForms = await get(this.dao, getAllRows("DataForm"));
        result.updates += dataForms.length;
        result.dataForm = dataForms.map(form => this.apiUrl + "data_form/" + form.form_id);

        const belongsTo = await get(this.dao, getAllRows("BelongsTo"));
        result.updates += belongsTo.length;
        result.belongsTo = belongsTo.map(
            bTo => this.apiUrl + "belongs_to/" + bTo.form_id + "/" + bTo.project_id
        );

        const answerSets = await get(this.dao, getAllRows("AnswerSet"));
        result.updates += answerSets.length;
        result.answerSet = answerSets.map(set => this.apiUrl + "answer_set/" + set.set_name);

        const sessions = await get(this.dao, getAllRows("Session"));
        result.updates += sessions.length;
        result.session = sessions.map(session => this.apiUrl + "session/" + session.session_id);

        const dataEntries = await get(this.dao, getAllRows("DataEntry"));
        result.updates += dataEntries.length;
        result.dataEntry = dataEntries.map(
            entry => this.apiUrl + "data_entry/" + entry.session_id + "/" + entry.entry_id
        );  
        return Promise.resolve(result);
    }

    async getLatest(timestamp) {
        let result = {};
        result.updates = 0;

        const users = await get(this.dao, getLatestRows("User", timestamp));
        result.updates += users.length;
        result.user = users.map(user => this.apiUrl + "User/" + user.user_id);

        const projects = await get(this.dao, getLatestRows("Project", timestamp));
        result.updates += projects.length;
        result.project = projects.map(proj => this.apiUrl + "project/" + proj.project_id);

        const contributesTos = await get(this.dao, getLatestRows("ContributesTo", timestamp));
        result.updates += contributesTos.length;
        result.contributesTo = contributesTos.map(
            cTo => this.apiUrl + "contributes_to/" + cTo.user_id + "/" + cTo.project_id 
        );

        const dataForms = await get(this.dao, getLatestRows("DataForm", timestamp));
        result.updates += dataForms.length;
        result.dataForm = dataForms.map(form => this.apiUrl + "data_form/" + form.form_id);

        const belongsTo = await get(this.dao, getLatestRows("BelongsTo", timestamp));
        result.updates += belongsTo.length;
        result.belongsTo = belongsTo.map(
            bTo => this.apiUrl + "belongs_to/" + bTo.form_id + "/" + bTo.project_id
        );

        const answerSets = await get(this.dao, getLatestRows("AnswerSet", timestamp));
        result.updates += answerSets.length;
        result.answerSet = answerSets.map(set => this.apiUrl + "answer_set/" + set.set_name);

        const sessions = await get(this.dao, getLatestRows("Session", timestamp));
        result.updates += sessions.length;
        result.session = sessions.map(session => this.apiUrl + "session/" + session.session_id);

        const dataEntries = await get(this.dao, getLatestRows("DataEntry" , timestamp));
        result.updates += dataEntries.length;
        result.dataEntry = dataEntries.map(
            entry => this.apiUrl + "data_entry/" + entry.session_id + "/" + entry.entry_id
        );  

        const deletedItems = await get(this.dao, getDeletedItems(timestamp));
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

var getAllRows = function(tableName) {
    return "SELECT * FROM " + tableName;
};

var getLatestRows = function(tableName, timestamp) {
    return "SELECT * "
         + "FROM " + tableName 
         + " WHERE date_modified >= " + timestamp;
};

var getDeletedItems = function(timestamp) {
    return "SELECT * "
    + "FROM DeletedItem "  
    + " WHERE date_deleted >= " + timestamp;
}

module.exports = Sync;