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

router.get("/section/:id", (req, res) => {
  id = req.params.id;
  fetchQuery = `SELECT * from Section where restId='${id}'`;
  pool.query(fetchQuery, (err, result) => {
    if (!err) {
      console.log("Inside add an item");
      res.writeHead(200, {
        "Content-Type": "application/JSON"
      });
      res.end(JSON.stringify(result));
    } else console.log(err);
  });
});

router.post("/addSection", (req, res) => {
  data = req.body;
  checkQuery = `Select * from Section where section_name = "${data.sectionName}" and restId="${data.restId}";`;
  console.log(checkQuery);
  pool.query(checkQuery, (err, result) => {
    if (!err) {
      console.log("in check");
      console.log(result);
      if (result.length === 0) {
        console.log("in if condition");
        insertQuery = `Insert INTO Section (section_name,restId, description) values("${data.sectionName}", "${data.restId}", "${data.description}");`;
        pool.query(insertQuery, (err, result) => {
          if (!err) {
            console.log("Inside add a section");
            res.writeHead(200, {
              "Content-Type": "plain/text"
            });
            res.end("200");
          } else {
            console.log(err);
            res.writeHead(200, {
              "Content-Type": "plain/text"
            });
            res.end("500");
          }
        });
      } else {
        console.log("in else");
        res.writeHead(200, {
          "Content-Type": "plain/text"
        });
        res.end("400");
      }
    } else {
      console.log(err);
      res.writeHead(200, {
        "Content-Type": "plain/text"
      });
      res.end("500");
    }
  });
});

router.post("/deleteSection", (req, res) => {
  data = req.body;
  console.log(data);
  deleteItemsQuery = `delete from Item where section="${data.sectionName}" and restId = "${data.restId}";`;
  pool.query(deleteItemsQuery, (err, result) => {
    if (!err) {
      console.log("Inside delete an item");
      deleteSectionQuery = `delete from Section where section_name="${data.sectionName}" and restId="${data.restId}";`;
      pool.query(deleteSectionQuery, (err, result) => {
        if (!err) {
          console.log("Inside delete a section");
          res.writeHead(200, {
            "Content-Type": "plain/text"
          });
          res.end("200");
        } else {
          console.log(err);
          res.writeHead(200, {
            "Content-Type": "plain/text"
          });
          res.end("500");
        }
      });
    } else {
      res.writeHead(200, {
        "Content-Type": "plain/text"
      });
      res.end("500");
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
