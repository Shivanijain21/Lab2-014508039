const bcrypt = require("bcrypt");
const Buyer = require("../models/buyer");
const Owner = require("../models/owner");
var jwt = require("jsonwebtoken");

async function handle_request(msg, callback) {
  console.log("Inside login kafka backend");
  console.log(msg);
  let response = {};
  let error = {};
  console.log("in login");
  const data = msg;
  if (data.userProfile === "buyer") {
    console.log("in buyer");
    const getDetails = await Buyer.findOne({ email: data.username });
    if (getDetails) {
      const match = await bcrypt.compare(data.password, getDetails.password);
      console.log(match);
      if (match) {
        console.log(getDetails._id);
        var token = jwt.sign(data, process.env.TOKEN, {
          expiresIn: 10080 // in seconds
        });
        response = {
          success: true,
          data: 200,
          id: getDetails._id,
          token: "JWT " + token,
          status: 200
        };
        callback(null, response);
      } else {
        error = {
          success: false,
          data: 400,
          status: 400
        };
        callback(error, null);
      }
    } else {
      error = {
        success: false,
        data: 400,
        status: 400
      };
      callback(error, null);
    }
  } else {
    console.log("in owner");
    const getDetails = await Owner.findOne({ email: data.username });
    if (getDetails) {
      const match = await bcrypt.compare(data.password, getDetails.password);
      if (match) {
        var token = jwt.sign(data, process.env.TOKEN, {
          expiresIn: 10080 // in seconds
        });
        response = {
          success: true,
          data: 200,
          id: getDetails._id,
          token: "JWT " + token,
          status: 200
        };
        callback(null, response);
      } else {
        error = {
          status: 400,
          success: false,
          data: 400
        };
        callback(error, null);
      }
    } else {
      error = {
        status: 400,
        success: false,
        data: 400
      };
      callback(error, null);
    }
  }
}

exports.handle_request = handle_request;
