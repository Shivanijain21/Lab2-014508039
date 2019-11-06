const Buyer = require("../models/buyer");

function handle_request(msg, callback) {
  console.log("Inside buyer profile service kafka backend");
  console.log(msg);
  switch (msg.path) {
    case "getProfile": {
      getProfile(msg.content, callback);
      break;
    }
    case "updateProfile": {
      updateProfile(msg.content, callback);
      break;
    }
    case "authenticate": {
      authenticate(msg.content, callback);
      break;
    }
  }
}
let authenticate = (content, callback) => {
  console.log("---- in kafka backend to authenticate-------");
  Buyer.findOne({ email: content }, function(err, user) {
    if (err) {
      console.log("----in err-----");
      callback(err, false);
      return;
    } else {
      if (user) {
        console.log("----in user -----");
        callback(null, true);
        return;
      } else {
        callback(err, false);
        return;
      }
    }
  });
};

let getProfile = (content, callback) => {
  console.log("in buyer profile");
  Buyer.findById(content, function(err, user) {
    if (user) {
      let buyerDetails = Object.assign(
        {},
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone_num: user.phone_num ? user.phone_num : 0,
          address: user.address ? user.address : "default"
        }
      );
      console.log("fetched buyer profile:");
      callback(null, { status: 200, message: JSON.stringify(buyerDetails) });
      return;
      // console.log(buyerDetails);
      // return buyerDetails;
    } else {
      callback({ status: 500, data: "500" }, null);
      return;
    }
  });
};

let updateProfile = (content, callback) => {
  let data = content.data;
  let id = content.id;
  // console.log(data);
  console.log("Inside update buyer profile js ");
  Buyer.findByIdAndUpdate(id, {
    $set: {
      firstName: data.firstName,
      lastName: data.lastName,
      phone_num: data.phone_num,
      address: data.address
    },
    returnNewDocument: true
  })
    .exec()
    .then(() => {
      Buyer.findById(id, function(err, user) {
        if (user) {
          console.log(user);
          let buyerDetails = Object.assign(
            {},
            {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              phone_num: user.phone_num ? user.phone_num : 0,
              address: user.address ? user.address : "default"
            }
          );
          console.log("fetched buyer profile:");
          callback(null, {
            status: 200,
            message: JSON.stringify(buyerDetails)
          });
          return;
        } else {
          callback({ status: 500, data: "500" }, null);
          return;
        }
      });
    })
    .catch(() => {
      callback({ status: 500, data: "500" }, null);
      return;
    });
};

exports.handle_request = handle_request;
