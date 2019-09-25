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

router.post("/", (req, res) => {
  data = req.body;
  fetchQuery = `SELECT * from Item where rest_id='${data.id}'`;
  pool.query(fetchQuery, (err, result) => {
    if (!err) {
      console.log("Inside add an item");
      res.writeHead(200, {
        "Content-Type": "application/JSON"
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

router.post("/addItem", (req, res) => {
  data = req.body;
  insertquery = `INSERT INTO Item (rest_id,price,category,item_name,description) VALUES ('${data.rest_id}','${data.price}','${data.category}','${data.item_name}','${data.description}');`;
  pool.query(insertquery, (err, result) => {
    if (!err) {
      console.log("Inside add an item");
      res.writeHead(200, {
        "Content-Type": "plain/text"
      });
      res.end("200");
    }
  });
});

router.post("/editItem", (req, res) => {
  data = req.body;
  insertquery = `UPDATE Item SET price ='${data.price}',category='${data.category}',restuarant_name='${data.item_name}',description='${data.description}',);`;
  pool.query(insertquery, (err, result) => {
    if (!err) {
      console.log("Inside edit an item");
      res.writeHead(200, {
        "Content-Type": "plain/text"
      });
      res.end("200");
    }
  });
});

module.exports = router;
