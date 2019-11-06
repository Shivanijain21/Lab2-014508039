const Owner = require("../models/owner");
function handle_request(msg, callback) {
  console.log("Inside owner profile service kafka backend");
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
  Owner.findOne({ email: content }, function(err, user) {
    if (err) {
      console.log("----in auntenticate err-----");
      callback(err, false);
      return;
    } else {
      if (user) {
        console.log("----in owner auntenticate user -----");
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
  console.log("in owner profile");
  Owner.findById(content, function(err, user) {
    if (user) {
      let onwerDetails = Object.assign(
        {},
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          restuarantName: user.restuarantName,
          cuisine: user.cuisine ? user.cuisine : "Indian",
          restuarantAdd: user.restuarantAdd ? user.restuarantAdd : "",
          Zip: user.Zip ? user.Zip : ""
        }
      );
      console.log("fetched owner profile:");
      callback(null, { status: 200, message: JSON.stringify(onwerDetails) });
      return;
    } else {
      callback({ status: 500, data: "500" });
      return;
    }
  });
};
let updateProfile = (content, callback) => {
  data = content.data;
  id = content.id;
  console.log("In owner update profile" + data);
  Owner.findByIdAndUpdate(id, {
    $set: {
      firstName: data.firstName,
      lastName: data.lastName,
      restuarantName: data.restuarantName,
      cuisine: data.cuisine,
      restuarantAdd: data.restuarantAdd,
      Zip: data.Zip
    },
    returnNewDocument: true
  })
    .exec()
    .then(() => {
      Owner.findById(id, function(err, user) {
        if (user) {
          let onwerDetails = Object.assign(
            {},
            {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              restuarantName: user.restuarantName ? user.restuarantName : "",
              cuisine: user.cuisine ? user.cuisine : "Indian",
              restuarantAdd: user.restuarantAdd ? user.restuarantAdd : "",
              Zip: user.Zip ? user.Zip : ""
            }
          );
          console.log("fetched owner profile:");
          callback(null, {
            status: 200,
            message: JSON.stringify(onwerDetails)
          });
          return;
        } else {
          callback({ status: 500, data: "500" });
          return;
        }
      });
    })
    .catch(() => {
      callback({ status: 500, data: "500" });
      return;
    });
};

exports.handle_request = handle_request;
