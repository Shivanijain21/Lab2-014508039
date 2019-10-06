const mysql = require("mysql");

const pool = mysql.createPool({
  host: "grubhub.csxgvgi4pfaf.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "rootadmin",
  database: "grubHubDb",
  multipleStatements: true
});

pool.getConnection(err => {
  console.log(err);
});
module.exports = pool;
