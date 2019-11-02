const mysql = require("mysql");
const mongoose = require("mongoose");
const config = require("./config");
const pool = "";
// const pool = mysql.createPool({
//   host: "grubhub.csxgvgi4pfaf.us-east-2.rds.amazonaws.com",
//   user: "admin",
//   password: "rootadmin",
//   database: "grubHubDb",
//   multipleStatements: true
// });

// pool.getConnection(err => {
//   console.log(err);
// });
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(console.log("connected to mongodb"))
  .catch(err => console.log(JSON.stringify(err)));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {});
module.exports = {
  pool: pool,
  db: db
};
