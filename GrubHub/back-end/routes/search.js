const express = require("express");
const router = express.Router();
const pool = require("../utility");
const Owner = require("../models/owner");

// search String
router.get("/", async (req, res) => {
  // let selectQuery = `SELECT rest_id,restuarant_name,restuarant_dp,cuisine from Owner;`;
  // pool.query(selectQuery, (err, result) => {
  //   console.log(result);
  //   if (!err) {
  //     res.writeHead(200, {
  //       "Content-Type": "application/json"
  //     });
  //     res.end(JSON.stringify(result));
  //   }
  // });
  let restuarants = Owner.find();
  if (restuarants) return res.status(200).send(JSON.stringify(restuarants));
  else res.status(500).send("500");
});

router.get("/:searchString", async (req, res) => {
  //   console.log("in search string");
  //   let searchString = req.params.searchString;
  //   selectQuery = `SELECT rest_id,restuarant_name,restuarant_dp,cuisine
  //   FROM Owner O INNER JOIN Item I
  //     ON O.rest_id = I.restId
  //  WHERE I.item_name like '${searchString}'
  //  UNION select rest_id,restuarant_name,restuarant_dp,cuisine from Owner where restuarant_name like '${searchString}'; `;

  //   pool.query(selectQuery, (err, result) => {
  //     console.log(result);
  //     if (!err) {
  //       res.writeHead(200, {
  //         "Content-Type": "application/json"
  //       });
  //       res.end(JSON.stringify(result));
  //     } else {
  //       console.log(err);
  //     }
  //   });
  let searchString = req.params.searchString;
  let filteredRest = [];
  let restuarants = await Owner.find();
  for (let i = 0; i < restuarants.length; i++) {
    let sections = restuarants[i].sections;
    for (let j = 0; j < sections.length; j++) {
      let items = sections[j].items;
      let item = items.filter(item => {
        console.log(item.itemName);
        if (item.itemName === searchString) {
          filteredRest.push(restuarants[i]);
          return item;
        }
        return false;
      });
      if (item) {
        break;
      }
    }
  }
  console.log(filteredRest.length);
  return res.status(200).send(JSON.stringify(filteredRest));
  // for(let i =0; i<restuarants.length; i++){

  // }
  // let item = items.filter(item => item.itemName === searchString)
});

module.exports = router;
