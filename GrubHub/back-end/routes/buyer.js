const express = require("express");
const router = express.Router();
const pool = require("../utility");
const Buyer = require("../models/buyer");

// buyer/profile
router.get("/profile/:id", (req, res) => {
  console.log("in buyer profile");
  id = req.params.id;
  // selectQuery = `select * from Buyer where buyer_id = '${id}';`;
  // pool.query(selectQuery, (err, result) => {
  //   if (!err) {
  //     console.log("Inside profile buyer js ");
  //     res.writeHead(200, {
  //       "Content-Type": "application/json"
  //     });
  //     console.log("Buyer : ", JSON.stringify(result[0]));
  //     res.end(JSON.stringify(result[0]));
  //   }
  // });
  Buyer.findById(id, function(err, user) {
    if (user) {
      let buyerDetails = Object.assign(
        {},
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone_num: user.phone_num ? user.phone_num : 0,
          address: user.address ? user.address : ""
        }
      );
      console.log("fetched buyer profile:");
      return res.status(200).send(JSON.stringify(buyerDetails));
      // console.log(buyerDetails);
      // return buyerDetails;
    } else return res.status(500).send("500");
  });
});

// buyer/profileUpdate
router.post("/profileUpdate/:id", (req, res) => {
  data = req.body;
  id = req.params.id;
  // console.log(data);
  console.log("Inside update buyer profile js ");
  // selectQuery = `UPDATE Buyer SET name ='${data.name}', phone_num='${data.phone_num}', address='${data.address}' WHERE (buyer_id = '${id}');`;
  // console.log(selectQuery);
  // pool.query(selectQuery, (err, result) => {
  //   if (!err) {
  //     console.log("Inside update buyer profile js ");
  //     res.writeHead(200, {
  //       "Content-Type": "plain/text"
  //     });
  //     res.end("updated");
  //   } else console.log(err);
  // });
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
              address: user.address ? user.address : ""
            }
          );
          console.log("fetched buyer profile:");
          return res.status(200).send(JSON.stringify(buyerDetails));
        } else return res.status(500).send("500");
      });
    })
    .catch(() => res.status(500).send("500"));
});

module.exports = router;
