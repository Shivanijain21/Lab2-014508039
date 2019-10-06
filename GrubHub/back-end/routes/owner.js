const express = require("express");
const router = express.Router();
const pool = require("../utility");

// router.post("/", (req, res) => {
//   id = req.body.id;
//   selectQuery = `select * from Owner where rest_id = '${id}';`;
//   pool.query(selectQuery, (err, result) => {
//     if (!err) {
//       console.log("Inside owner js ");
//       res.writeHead(200, {
//         "Content-Type": "application/json"
//       });
//       console.log("Owner : ", JSON.stringify(result[0]));
//       res.end(JSON.stringify(result[0]));
//     }
//   });
// });

// owner/profile
router.get("/profile/:id", (req, res) => {
  console.log("in owner profile");
  id = req.params.id;
  selectQuery = `select * from Owner where rest_id = '${id}';`;
  pool.query(selectQuery, (err, result) => {
    if (!err) {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      // console.log(JSON.stringify(result[0]));
      res.end(JSON.stringify(result[0]));
    }
  });
});

//owner/profileUpdate
router.post("/profileUpdate/:id", (req, res) => {
  data = req.body;
  id = req.params.id;
  console.log("In owner update profile" + data);
  updateQuery = `UPDATE Owner SET name ='${data.name}',owner_dp='${data.owner_dp}',restuarant_name='${data.restuarant_name}',restuarant_dp='${data.restuarant_name}',cuisine='${data.cuisine}',restuarant_add='${data.restuarant_add}',restuarant_zip='${data.restuarant_zip}' WHERE (rest_id = '${id}');`;
  console.log(updateQuery);
  pool.query(updateQuery, (err, result) => {
    if (!err) {
      console.log("Inside update owner profile js ");
      res.writeHead(200, {
        "Content-Type": "plain/text"
      });
      res.end("updated");
    }
  });
});

module.exports = router;
