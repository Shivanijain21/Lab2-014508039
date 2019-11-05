const express = require("express");
const router = express.Router();
const Owner = require("../models/owner");
const kafka = require("../kafka/client");

// owner/profile
router.get("/profile/:id", function(req, res) {
  console.log("-----in backend: get owner get profile-----");
  kafka.make_request(
    "owner_topic",
    { path: "getProfile", content: req.params.id },
    function(err, results) {
      console.log("in kafka call back on back-end");
      console.log(results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.data);
      } else {
        console.log("Inside results");
        return res.status(results.status).send(results.message);
      }
    }
  );
});

// (req, res) => {
//   console.log("in owner profile");
//   id = req.params.id;
//   Owner.findById(id, function(err, user) {
//     if (user) {
//       let onwerDetails = Object.assign(
//         {},
//         {
//           email: user.email,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           restuarantName: user.restuarantName,
//           cuisine: user.cuisine ? user.cuisine : "Indian",
//           restuarantAdd: user.restuarantAdd ? user.restuarantAdd : "",
//           Zip: user.Zip ? user.Zip : ""
//         }
//       );
//       console.log("fetched owner profile:");
//       return res.status(200).send(JSON.stringify(onwerDetails));
//     } else return res.status(500).send("500");
//   });
// });

//owner/profileUpdate
router.post("/profileUpdate/:id", function(req, res) {
  console.log("-----in backend: get owner update profile-----");
  let content = {
    data: req.body,
    id: req.params.id
  };
  kafka.make_request(
    "owner_topic",
    { path: "updateProfile", content: content },
    function(err, results) {
      console.log("in kafka call back on back-end");
      console.log(results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.data);
      } else {
        console.log("Inside results");
        return res.status(results.status).send(results.message);
      }
    }
  );
});

// (req, res) => {
//   data = req.body;
//   id = req.params.id;
//   console.log("In owner update profile" + data);
//   Owner.findByIdAndUpdate(id, {
//     $set: {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       restuarantName: data.restuarantName,
//       cuisine: data.cuisine,
//       restuarantAdd: data.restuarantAdd,
//       Zip: data.Zip
//     },
//     returnNewDocument: true
//   })
//     .exec()
//     .then(() => {
//       Owner.findById(id, function(err, user) {
//         if (user) {
//           let onwerDetails = Object.assign(
//             {},
//             {
//               email: user.email,
//               firstName: user.firstName,
//               lastName: user.lastName,
//               restuarantName: user.restuarantName ? user.restuarantName : "",
//               cuisine: user.cuisine ? user.cuisine : "Indian",
//               restuarantAdd: user.restuarantAdd ? user.restuarantAdd : "",
//               Zip: user.Zip ? user.Zip : ""
//             }
//           );
//           console.log("fetched owner profile:");
//           return res.status(200).send(JSON.stringify(onwerDetails));
//         } else return res.status(500).send("500");
//       });
//     })
//     .catch(() => res.status(500).send("500"));
// });

module.exports = router;
