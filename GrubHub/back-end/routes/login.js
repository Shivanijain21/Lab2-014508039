const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Buyer = require("../models/buyer");
const Owner = require("../models/owner");
var jwt = require("jsonwebtoken");

// router.post("/", (req, res) => {
//   const user = req.body;
//   console.log(`${user.username}`);
//   let getUser = `select * from Buyer where (email='${user.username}');select * from Owner where (email='${user.username}')`;

//   pool.query(getUser, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.status(500);
//     } else {
//       console.log(result[0]);
//       console.log(result[1]);
//       if (result[0].length > 0) {
//         console.log("inside if");
//         console.log("password" + result[0][0].password);
//         bcrypt.compare(req.body.password, result[0][0].password, function(
//           err,
//           status
//         ) {
//           console.log(status);
//           if (status) {
//             res.cookie("Buyer", result[0][0].buyer_id, {
//               maxAge: 900000,
//               httpOnly: false,
//               path: "/"
//             });
//             res.writeHead(200, {
//               "Content-Type": "text/plain"
//             });
//             res.end("200");
//           } else {
//             res.writeHead(200, {
//               "Content-Type": "text/plain"
//             });
//             res.end("400");
//           }
//         });
//       } else if (result[1].length > 0) {
//         bcrypt.compare(req.body.password, result[1][0].password, function(
//           err,
//           status
//         ) {
//           console.log(status);
//           if (status) {
//             res.cookie("Owner", result[1][0].rest_id, {
//               maxAge: 900000,
//               httpOnly: false,
//               path: "/"
//             });
//             req.session.user = user;
//             res.writeHead(200, {
//               "Content-Type": "text/plain"
//             });
//             res.end("200");
//           } else {
//             res.writeHead(200, {
//               "Content-Type": "text/plain"
//             });
//             res.end("400");
//           }
//         });
//       } else {
//         res.writeHead(200, {
//           "Content-Type": "text/plain"
//         });
//         res.end("400");
//       }
//     }
//   });
// });

router.post("/", async (req, res) => {
  console.log("in login");
  const data = req.body;
  if (data.userProfile === "buyer") {
    console.log("in buyer");
    const getDetails = await Buyer.findOne({ email: data.username });
    if (getDetails) {
      const match = await bcrypt.compare(data.password, getDetails.password);
      console.log(match);
      if (match) {
        res.cookie("Buyer", getDetails._id, {
          maxAge: 900000,
          httpOnly: false,
          path: "/"
        });
        console.log(getDetails._id);
        var token = jwt.sign(data, process.env.TOKEN, {
          expiresIn: 10080 // in seconds
        });
        return res.status(200).json({
          success: true,
          data: 200,
          id: getDetails._id,
          token: "JWT " + token
        });
      } else
        return res.status(400).json({
          success: false,
          data: 400
        });
    } else
      return res.status(400).json({
        success: false,
        data: 400
      });
  } else {
    console.log("in owner");
    const getDetails = await Owner.findOne({ email: data.username });
    if (getDetails) {
      const match = await bcrypt.compare(data.password, getDetails.password);
      if (match) {
        res.cookie("Owner", getDetails._id, {
          maxAge: 900000,
          httpOnly: false,
          path: "/"
        });
        var token = jwt.sign(data, process.env.TOKEN, {
          expiresIn: 10080 // in seconds
        });
        return res.status(200).json({
          success: true,
          data: 200,
          id: getDetails._id,
          token: "JWT " + token
        });
      } else
        return res.status(400).json({
          success: false,
          data: 400
        });
    } else
      return res.status(400).json({
        success: false,
        data: 400
      });
  }
});

module.exports = router;
