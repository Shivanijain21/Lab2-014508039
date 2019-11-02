const express = require("express");
const router = express.Router();
const Owner = require("../models/owner");

// owner/profile
router.get("/profile/:id", (req, res) => {
  console.log("in owner profile");
  id = req.params.id;
  // selectQuery = `select * from Owner where rest_id = '${id}';`;
  // pool.query(selectQuery, (err, result) => {
  //   if (!err) {
  //     res.writeHead(200, {
  //       "Content-Type": "application/json"
  //     });
  //     // console.log(JSON.stringify(result[0]));
  //     res.end(JSON.stringify(result[0]));
  //   }
  // });
  Owner.findById(id, function(err, user) {
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
      return res.status(200).send(JSON.stringify(onwerDetails));
    } else return res.status(500).send("500");
  });
});

//owner/profileUpdate
router.post("/profileUpdate/:id", (req, res) => {
  data = req.body;
  id = req.params.id;
  console.log("In owner update profile" + data);
  // updateQuery = `UPDATE Owner SET name ='${data.name}',restuarant_name='${data.restuarant_name}',cuisine='${data.cuisine}',restuarant_add='${data.restuarant_add}',restuarant_zip='${data.restuarant_zip}' WHERE (rest_id = '${id}');`;
  // console.log(updateQuery);
  // pool.query(updateQuery, (err, result) => {
  //   if (!err) {
  //     console.log("Inside update owner profile js ");
  //     res.writeHead(200, {
  //       "Content-Type": "plain/text"
  //     });
  //     res.end("updated");
  //   }
  // });
  Owner.findByIdAndUpdate(id, {
    $set: {
      firstName: data.firstName,
      lastName: data.lastName,
      restuarant_name: data.restuarant_name,
      cuisine: data.cuisine,
      restuarant_add: data.restuarant_add,
      restuarant_zip: data.restuarant_zip
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
              restuarant_name: user.restuarant_name ? user.restuarant_name : "",
              cuisine: user.cuisine ? user.cuisine : "",
              restuarant_add: user.restuarant_add ? user.restuarant_add : "",
              restuarant_zip: user.restuarant_zip ? user.restuarant_zip : ""
            }
          );
          console.log("fetched owner profile:");
          return res.status(200).send(JSON.stringify(onwerDetails));
        } else return res.status(500).send("500");
      });
    })
    .catch(() => res.status(500).send("500"));
});

module.exports = router;
