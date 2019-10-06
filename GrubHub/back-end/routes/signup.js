const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../utility");

router.post("/", (req, res) => {
  const user = req.body;
  let insert;
  const saltRounds = 10;
  bcrypt.hash(user.password, saltRounds, function(err, hash) {
    if (err) {
      console.log(err);
    } else {
      console.log("hashing" + hash);
      const name = `${user.firstName} ${user.lastName}`;
      if (user.userProfile === "Buyer") {
        console.log("in buyer" + user);
        insert = `INSERT INTO Buyer (email,password,profileImg,name) VAlUES ('${user.email}','${hash}','/Images/ProfileImg','${name}')`;
      } else if (user.userProfile === "Owner") {
        console.log("in owner" + user);
        const name = user.firstName + user.lastName;
        insert = `INSERT INTO Owner (name,email,password,owner_dp,restuarant_name,restuarant_dp,cuisine,restuarant_add,restuarant_zip) VAlUES ('${name}','${user.email}','${hash}','/Images/ProfileImg','${user.restuarantInfo.restuarantName}','/Images/ProfileImg','Indian','${user.restuarantInfo.restuarantAdd}','${user.restuarantInfo.Zip}')`;
      }
      pool.query(insert, (err, result) => {
        if (err) {
          console.log(err);
          if (err.sqlMessage.includes("Duplicate entry")) {
            res.writeHead(200, {
              "Content-Type": "text/plain"
            });
            res.end("400");
          } else {
            res.writeHead(200, {
              "Content-Type": "text/plain"
            });
            res.end("500");
          }
        } else {
          console.log("inserted");
          res.cookie("cookie", "admin", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end("200");
        }
      });
    }
  });
});

module.exports = router;
