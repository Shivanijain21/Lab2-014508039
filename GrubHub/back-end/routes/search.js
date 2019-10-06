const express = require("express");
const router = express.Router();
const pool = require("../utility");

// search String
router.get("/", (req, res) => {
  let selectQuery = `SELECT rest_id,restuarant_name,restuarant_dp,cuisine from Owner;`;
  pool.query(selectQuery, (err, result) => {
    console.log(result);
    if (!err) {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
    }
  });
});

router.get("/:searchString", (req, res) => {
  console.log("in search string");
  let searchString = req.params.searchString;
  selectQuery = `SELECT rest_id,restuarant_name,restuarant_dp,cuisine
  FROM Owner O INNER JOIN Item I
    ON O.rest_id = I.restId
 WHERE I.item_name like '${searchString}'
 UNION select rest_id,restuarant_name,restuarant_dp,cuisine from Owner where restuarant_name like '${searchString}'; `;

  pool.query(selectQuery, (err, result) => {
    console.log(result);
    if (!err) {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
