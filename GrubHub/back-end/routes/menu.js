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
  fetchQuery = `SELECT * from Item where restId='${data.restId}' and section='${data.sectionName}'`;
  pool.query(fetchQuery, (err, result) => {
    if (!err) {
      console.log("fetch item");
      res.writeHead(200, {
        "Content-Type": "application/JSON"
      });
      res.end(JSON.stringify(result));
    } else console.log(err);
  });
});
router.get("/:id", (req, res) => {
  id = req.params.id;
  fetchQuery = `SELECT * from Item where restId='${id}'`;
  pool.query(fetchQuery, (err, result) => {
    if (!err) {
      console.log("fetch item");
      let sections = {};
      result.forEach(function(e) {
        if (sections.hasOwnProperty(e.section)) {
          sections[e.section].push(e);
        } else {
          sections[e.section] = [];
          sections[e.section].push(e);
        }
      });
      console.log(sections);
      res.writeHead(200, {
        "Content-Type": "application/JSON"
      });
      res.end(JSON.stringify(sections));
    } else console.log(err);
  });
});

router.get("/section/:id", (req, res) => {
  id = req.params.id;
  fetchQuery = `SELECT * from Section where restId='${id}'`;
  pool.query(fetchQuery, (err, result) => {
    if (!err) {
      console.log("Inside fetch section");
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
  insertquery = `INSERT INTO Item (restId,price,section,item_name,description) VALUES ('${data.restId}','${data.price}','${data.sectionName}','${data.itemName}','${data.description}');`;
  pool.query(insertquery, (err, result) => {
    if (!err) {
      console.log("Inside add an item");
      fetchQuery = `SELECT * from Item where restId='${data.restId}' and section='${data.sectionName}';`;
      pool.query(fetchQuery, (err, result) => {
        if (!err) {
          console.log("Inside fetch an item");
          res.writeHead(200, {
            "Content-Type": "application/JSON"
          });
          res.end(JSON.stringify(result));
        } else {
          res.writeHead(500, {
            "Content-Type": "plain/text"
          });
          res.end("500");
        }
      });
    } else {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "plain/text"
      });
      res.end("500");
    }
  });
});

router.post("/editItem", (req, res) => {
  data = req.body;
  updatequery = `UPDATE Item SET price ='${data.price}',section='${data.sectionName}',item_name='${data.itemName}',description='${data.description}' where item_id = "${data.itemId}";`;
  pool.query(updatequery, (err, result) => {
    if (!err) {
      fetchQuery = `SELECT * from Item where restId='${data.restId}' and section='${data.sectionName}';`;
      pool.query(fetchQuery, (err, result) => {
        if (!err) {
          res.writeHead(200, {
            "Content-Type": "application/JSON"
          });
          res.end(JSON.stringify(result));
        } else {
          console.log(err);
          res.writeHead(500, {
            "Content-Type": "plain/text"
          });
          res.end("500");
        }
      });
    } else {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "plain/text"
      });
      res.end("500");
    }
  });
});

router.post("/deleteItem", (req, res) => {
  data = req.body;
  deletequery = `delete from Item where item_id="${data.itemId}" and restId="${data.restId}";`;
  pool.query(deletequery, (err, result) => {
    if (!err) {
      console.log("Inside delete an item");
      fetchQuery = `SELECT * from Item where restId='${data.restId}' and section='${data.sectionName}'`;
      pool.query(fetchQuery, (err, result) => {
        if (!err) {
          console.log("fetch item");
          res.writeHead(200, {
            "Content-Type": "application/JSON"
          });
          res.end(JSON.stringify(result));
        } else {
          console.log(err);
          res.writeHead(500, {
            "Content-Type": "application/JSON"
          });
          res.end("500");
        }
      });
    } else {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "application/JSON"
      });
      res.end("500");
    }
  });
});

module.exports = router;
