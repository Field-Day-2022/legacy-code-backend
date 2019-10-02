const AWS = require('aws-sdk');
const RDS = new AWS.RDSDataService();

class AppDAO {
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
