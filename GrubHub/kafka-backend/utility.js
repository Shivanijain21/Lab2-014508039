const mongoose = require("mongoose");
const config = require("./config");

mongoose
  .connect(config.mongoURI, {
    poolSize: 500,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(console.log("connected to mongodb"))
  .catch(err => console.log(JSON.stringify(err)));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {});
module.exports = db;
