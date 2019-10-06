const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../utility");

router.post("/", (req, res) => {
  const user = req.body;
  console.log(`${user.username}`);
  let getUser = `select * from Buyer where (email='${user.username}');select * from Owner where (email='${user.username}')`;

  pool.query(getUser, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log(result[0]);
      console.log(result[1]);
      if (result[0].length > 0) {
        console.log("inside if");
        console.log("password" + result[0][0].password);
        bcrypt.compare(req.body.password, result[0][0].password, function(
          err,
          status
        ) {
          console.log(status);
          if (status) {
            res.cookie("Buyer", result[0][0].buyer_id, {
              maxAge: 900000,
              httpOnly: false,
              path: "/"
            });
            res.writeHead(200, {
              "Content-Type": "text/plain"
            });
            res.end("200");
          } else {
            res.writeHead(200, {
              "Content-Type": "text/plain"
            });
            res.end("400");
          }
        });
      } else if (result[1].length > 0) {
        bcrypt.compare(req.body.password, result[1][0].password, function(
          err,
          status
        ) {
          console.log(status);
          if (status) {
            res.cookie("Owner", result[1][0].rest_id, {
              maxAge: 900000,
              httpOnly: false,
              path: "/"
            });
            req.session.user = user;
            res.writeHead(200, {
              "Content-Type": "text/plain"
            });
            res.end("200");
          } else {
            res.writeHead(200, {
              "Content-Type": "text/plain"
            });
            res.end("400");
          }
        });
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.end("400");
      }
    }
  });
});

module.exports = router;
