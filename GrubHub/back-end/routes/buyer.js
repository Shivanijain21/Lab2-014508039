const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rootadmin",
  database: "grubHubDb",
  multipleStatements: true
});

// router.post("/", (req, res) => {
//   id = req.body.id;
//   selectQuery = `select * from Buyer where buyer_id = '${id}';`;
//   pool.query(selectQuery, (err, result) => {
//     if (!err) {
//       console.log("Inside buyer js ");
//       res.writeHead(200, {
//         "Content-Type": "application/json"
//       });
//       console.log("Buyer : ", JSON.stringify(result[0]));
//       res.end(JSON.stringify(result[0]));
//     }
//   });
// });

// buyer/profile
router.get("/profile/:id", (req, res) => {
  console.log("in buyer profile");
  id = req.params.id;
  selectQuery = `select * from Buyer where buyer_id = '${id}';`;
  pool.query(selectQuery, (err, result) => {
    if (!err) {
      console.log("Inside profile buyer js ");
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      console.log("Buyer : ", JSON.stringify(result[0]));
      res.end(JSON.stringify(result[0]));
    }
  });
});

// buyer/profileUpdate
router.post("/profileUpdate/:id", (req, res) => {
  data = req.body;
  id = req.params.id;
  console.log(data);
  console.log("Inside update buyer profile js ");
  selectQuery = `UPDATE Buyer SET name ='${data.name}', phone_num='${data.phone_num}', address='${data.address}' WHERE (buyer_id = '${id}');`;
  console.log(selectQuery);
  pool.query(selectQuery, (err, result) => {
    if (!err) {
      console.log("Inside update buyer profile js ");
      res.writeHead(200, {
        "Content-Type": "plain/text"
      });
      res.end("updated");
    }
  });
});

module.exports = router;
