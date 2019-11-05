const express = require("express");
const cors = require("cors");
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
const mongoose = require("mongoose");
const config = require("./config");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const message = require("./routes/message");
const { db } = require("./utility");

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = "secret-jwt-token";
var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log("JWT TOKEN:" + jwt_payload);
  if (next) {
    next(null, true);
  }
});

passport.use("jwt", strategy);
app.use(passport.initialize());
app.set("view engine", "ejs");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(console.log("connected to mongodb"))
//   .catch(err => console.log(JSON.stringify(err)));
// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {});

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
app.use("/message", message);
// app.use("/order", passport.authenticate("jwt", { session: false }), order);

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
