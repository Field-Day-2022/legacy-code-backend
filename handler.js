//  add serverless module
const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const app = express();

// Database Access Object
const DAO = require('./util/DataAccessObject-mysql');
// init database connection in server directory
const db = new DAO();
// make database globally available (maybe change soon)
global.db = db;

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DATABASE_NAME,
  ssl: 'Amazon RDS',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

//	add global middleware before api
require('./middleware/global.middleware')(app);

//add cors headers
app.use(cors());

//	set routers for base API paths
app.use('/api', require('./api'));

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const connection = await pool.getConnection();
  try {
    db.setConnection(connection);
    const result = await handler(event, context);
    connection.release();
    return result;
  } catch (err) {
    console.log("Problem handling to request");
    console.log(err);
  }
};



