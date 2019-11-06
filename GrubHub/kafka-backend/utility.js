const mongoose = require("mongoose");
const config = require("./config");

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(console.log("connected to mongodb"))
  .catch(err => console.log(JSON.stringify(err)));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {});
module.exports = db;
