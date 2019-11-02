const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
//  const { pool, db } = require("../utility");
const Buyer = require("../models/buyer");
const Owner = require("../models/owner");
// router.post("/", (req, res) => {
//   const user = req.body;
//   let insert;
//   const saltRounds = 10;
//   bcrypt.hash(user.password, saltRounds, function(err, hash) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("hashing" + hash);
//       const name = `${user.firstName} ${user.lastName}`;
//       if (user.userProfile === "Buyer") {
//         console.log("in buyer" + user);
//         insert = `INSERT INTO Buyer (email,password,profileImg,name) VAlUES ('${user.email}','${hash}','/Images/ProfileImg','${name}')`;
//       } else if (user.userProfile === "Owner") {
//         console.log("in owner" + user);
//         const name = user.firstName + user.lastName;
//         insert = `INSERT INTO Owner (name,email,password,owner_dp,restuarant_name,restuarant_dp,cuisine,restuarant_add,restuarant_zip) VAlUES ('${name}','${user.email}','${hash}','/Images/ProfileImg','${user.restuarantInfo.restuarantName}','/Images/ProfileImg','Indian','${user.restuarantInfo.restuarantAdd}','${user.restuarantInfo.Zip}')`;
//       }
//       pool.query(insert, (err, result) => {
//         if (err) {
//           console.log(err);
//           if (err.sqlMessage.includes("Duplicate entry")) {
//             res.writeHead(200, {
//               "Content-Type": "text/plain"
//             });
//             res.end("400");
//           } else {
//             res.writeHead(200, {
//               "Content-Type": "text/plain"
//             });
//             res.end("500");
//           }
//         } else {
//           console.log("inserted");
//           res.cookie("cookie", "admin", {
//             maxAge: 900000,
//             httpOnly: false,
//             path: "/"
//           });
//           res.writeHead(200, {
//             "Content-Type": "text/plain"
//           });
//           res.end("200");
//         }
//       });
//     }
//   });
// });
router.post("/", async (req, res) => {
  try {
    console.log("In sign up js");
    const user = req.body;
    const saltRounds = 10;
    let query;
    const hashpwd = await bcrypt
      .hash(user.password, saltRounds)
      .then(function(hash) {
        return hash;
      });
    user.password = hashpwd;
    if (user.userProfile === "Buyer") {
      delete user.userProfile;
      query = Buyer.where({ email: user.email });
      console.log(user);
      let buyer = new Buyer(Object.assign({}, user));
      // let query = Buyer.where({ email: user.email });
      query.findOne(function(err, user) {
        if (!err) {
          if (user) {
            return res.status(400).send("400");
          } else {
            buyer.save(function(err) {
              if (!err) {
                return res.status(200).send("200");
              } else return res.status(500).send("500");
            });
          }
        }
      });
    } else {
      const restuarantInfo = user.restuarantInfo;
      delete user.restuarantInfo;
      delete user.userProfile;
      let check = Object.assign(user, { ...restuarantInfo });
      console.log(check);
      let owner = new Owner(check);
      console.log(owner);
      // let query = Buyer.where({ email: user.email });
      query = Owner.where({ email: user.email });
      query.findOne(function(err, user) {
        if (!err) {
          if (user) {
            return res.status(400).send("400");
          } else {
            owner.save(function(err) {
              if (!err) {
                return res.status(200).send("200");
              } else return res.status(500).send("500");
            });
          }
        }
      });
    }
  } catch {
    return res.status(500).send("500");
  }
});
module.exports = router;
