/*
 * File: DataAccessObject-rds.js
 * Version: 1.01
 * Date: 2020-03-07
 * Description: Handles communication between app and AWS server.
 */

const AWS = require('aws-sdk');
const RDS = new AWS.RDSDataService();

/**
 * Middleware between the app and the AWS server. Executes the SQL
 * queries and returns the data.
 * @version 1.01
 * @since 2020-03-07
 */
class AppDAO {
  
  /**
   * Executes the SQL query on the AWS server storing the database.
   * @param sql the sql request to use
   * @return the result from the query as a promise.
   */
  execute(sql) {
    const params = {
      awsSecretStoreArn: 'arn:aws:secretsmanager:us-east-2:*****:secret:test/FieldDay/mysql-*****',
      dbClusterOrInstanceArn: 'arn:aws:rds:us-east-2:************:cluster:field-day-cluster',
      sqlStatements: `select * from User`,
      database: 'field_day_test',
    };

    return RDS.executeSql(params).promise();
  }
}

module.exports = AppDAO;
