const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
var session = require("express-session");
const login = require("./routes/login");
const signup = require("./routes/signup");
const buyer = require("./routes/buyer");
const owner = require("./routes/owner");
const menu = require("./routes/menu");
const profileImage = require("./routes/profileImage");
const search = require("./routes/search");
const order = require("./routes/order");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rootadmin",
  database: "grubHubDb",
  multipleStatements: true
});

app.set("view engine", "ejs");

pool.getConnection(err => {
  return err;
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use("/signup", signup);
app.use("/login", login);
app.use("/buyer", buyer);
app.use("/owner", owner);
app.use("/menu", menu);
app.use("/profileImage", profileImage);
app.use("/search", search);
app.use("/order", order);

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
