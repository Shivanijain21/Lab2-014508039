"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const kafka = require("../kafka/client");

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.TOKEN
  };
  passport.use(
    new JwtStrategy(jwtOptions, function(jwt_payload, next) {
      console.log("JWT TOKEN:" + jwt_payload);
      console.log(jwt_payload);
      if (jwt_payload.userProfile === "buyer") {
        console.log("in buyer authenticate");
        kafka.make_request(
          "buyer_topic",
          { path: "authenticate", content: jwt_payload.username },
          function(err, results) {
            console.log("in kafka call back on back-end");
            if (err) {
              console.log("Inside authenticate err");
              console.log(err);
              next(err, false);
              return;
            } else {
              console.log("Inside authenticate results");
              next(null, true);
              return;
            }
          }
        );
      } else {
        kafka.make_request(
          "owner_topic",
          { path: "authenticate", content: jwt_payload.username },
          function(err, results) {
            console.log("in kafka call back on back-end");
            if (err) {
              console.log("Inside authenticate err");
              console.log(err);
              next(err, false);
              return;
            } else {
              console.log("Inside authenticate results");
              next(null, true);
              return;
            }
          }
        );
        // Owner.findOne({ email: jwt_payload.username }, function(err, user) {
        //   if (err) {
        //     return next(err, false);
        //   } else {
        //     if (user) {
        //       next(null, user);
        //       return;
        //     } else {
        //       next(err, false);
        //       return;
        //     }
        //   }
        // });
      }
    })
  );
};
