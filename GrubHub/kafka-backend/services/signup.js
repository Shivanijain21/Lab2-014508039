const bcrypt = require("bcrypt");
//  const { pool, db } = require("../utility");
const Buyer = require("../models/buyer");
const Owner = require("../models/owner");
// const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg);
  let response = {};
  let error = {};
  try {
    console.log("In sign up js");
    const user = msg;
    const saltRounds = 10;
    let query;

    const hashpwd = await bcrypt
      .hash(user.password, saltRounds)
      .then(function(hash) {
        return hash;
      })
      .catch(err => console.log(err));
    user.password = hashpwd;
    console.log("updated password" + user.password);
    if (user.userProfile === "Buyer") {
      // console.log(user.userProfile);
      // query = Buyer.where({ email: user.email });
      // console.log("--------printing query-----");
      // console.log(query.findOne());
      // console.log(user);
      let buyer = new Buyer(
        Object.assign(
          {},
          {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
          }
        )
      );
      // let query = Buyer.where({ email: user.email });
      console.log("--------printing buyer-----");
      console.log(buyer);
      Buyer.findOne({ email: user.email }, function(err, user) {
        console.log("inside buyer");
        if (err) {
          console.log("error in query");
          console.log(err);
        }
        if (user) {
          console.log("inside buyer find");
          console.log(user);
          error.status = 400;
          error.message = "400";
          // return res.status(400).send("400");
          callback(error, null);
        } else {
          console.log("saving buyer");
          buyer.save(function(err) {
            if (!err) {
              console.log("no error");
              // return res.status(200).send("200");
              response.status = 200;
              response.message = "200";
              callback(null, response);
              console.log("after call back 200");
              //   } else return res.status(500).send("500");
            } else {
              error.status = 500;
              error.message = "500";
              // return res.status(400).send("400");
              callback(error, null);
            }
          });
        }
      });
    } else {
      const restuarantInfo = user.restuarantInfo;
      delete user.restuarantInfo;
      delete user.userProfile;
      console.log(user);
      let check = Object.assign(user, { ...restuarantInfo });
      console.log(check);
      let owner = new Owner(check);
      console.log(owner);
      // let query = Buyer.where({ email: user.email });
      query = Owner.where({ email: user.email });
      console.log("---printing owner query");
      console.log(query);
      query.findOne(function(err, user) {
        console.log("in owner query");
        if (!err) {
          if (user) {
            // return res.status(400).send("400");
            error.status = 400;
            error.message = "400";
            // return res.status(400).send("400");
            callback(error, null);
          } else {
            owner.save(function(err) {
              if (!err) {
                // return res.status(200).send("200");
                response.status = 200;
                response.message = "200";
                // return res.status(400).send("400");
                callback(null, response);
                //   } else return res.status(500).send("500");
              } else {
                error.status = 500;
                error.message = "500";
                // return res.status(400).send("400");
                callback(error, null);
              }
            });
          }
        }
      });
    }
  } catch (err) {
    console.log(err);
    console.log(" in catch block");
    // return res.status(500).send("500");
    error.status = 500;
    error.message = "500";
    // return res.status(400).send("400");
    callback(error, null);
  }
  // console.log("i am here" + response);
}

exports.handle_request = handle_request;
