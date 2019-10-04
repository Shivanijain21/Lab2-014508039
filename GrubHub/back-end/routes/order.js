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

router.post("/placeOrder", (req, res) => {
  data = req.body;
  insertQuery = `Insert into grubHubDb.Order (BuyerID,restID,orderDescription,totalPrice) Values('${data.buyerId}','${data.restId}','${data.totalOrder}','${data.totalPrice}');`;
  console.log(insertQuery);
  pool.query(insertQuery, (err, result) => {
    if (!err) {
      console.log("Inside order js ");
      res.writeHead(200, {
        "Content-Type": "plain/text"
      });
      console.log("inserted");
      res.end("200");
    } else {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "plain/text"
      });
      res.end("500");
    }
  });
});

module.exports = router;
