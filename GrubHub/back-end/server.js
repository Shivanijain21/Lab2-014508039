const express = require("express");
const cors = require("cors");
const app = express();
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
const config = require("./config");
var passport = require("passport");
const message = require("./routes/message");
require("./config/passport")(passport);

app.use(passport.initialize());
app.set("view engine", "ejs");
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});
// app.use(
//   session({
//     secret: "cmpe273_kafka_passport_mongo",
//     resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//     saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//     duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
//     activeDuration: 5 * 60 * 1000
//   })
// );
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use("/signup", signup);
app.use("/login", login);
app.use("/buyer", passport.authenticate("jwt", { session: false }), buyer);
app.use("/owner", passport.authenticate("jwt", { session: false }), owner);
app.use("/menu", passport.authenticate("jwt", { session: false }), menu);
app.use("/profileImage", profileImage);
app.use("/search", passport.authenticate("jwt", { session: false }), search);
// app.use("/order", order);
app.use("/message", passport.authenticate("jwt", { session: false }), message);
app.use("/order", passport.authenticate("jwt", { session: false }), order);

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
