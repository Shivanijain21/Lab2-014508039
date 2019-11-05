"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
// var db = require("../app/db");
var config = require("./settings");

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.TOKEN
  };
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, callback) {
      consolelog(jwt_payload);
      callback(null, true);
    })
  );
};
