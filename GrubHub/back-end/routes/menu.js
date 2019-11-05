const express = require("express");
const router = express.Router();
const { Section } = require("../models/section");
const Owner = require("../models/owner");
const { Item } = require("../models/item");
const kafka = require("../kafka/client");

// api to get all items for owner in item list
router.post("/", function(req, res) {
  console.log("in backend: get owner itemList");
  kafka.make_request(
    "menu_topic",
    { path: "getOwnerItem", content: req.body },
    function(err, results) {
      console.log("in kafka call back on back-end");
      console.log(results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.data);
      } else {
        console.log("Inside results");
        return res.status(results.status).send(results.message);
      }
    }
  );
});

// api to get sections for owner
router.get("/section/:id", function(req, res) {
  console.log("-----in backend: get owner get section-----");
  kafka.make_request(
    "menu_topic",
    { path: "getOwnerSections", content: req.params.id },
    function(err, results) {
      console.log("in kafka call back on back-end");
      console.log(results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.data);
      } else {
        console.log("Inside results");
        return res.status(results.status).send(results.message);
      }
    }
  );
});

// api to get menu item to display for buyer
router.get("/:id", function(req, res) {
  console.log("----- in backend: get buyer item------");
  kafka.make_request(
    "menu_topic",
    { path: "getBuyerItem", content: req.params.id },
    function(err, results) {
      console.log("in kafka call back on back-end");
      console.log(results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.data);
      } else {
        console.log("Inside results");
        return res.status(results.status).send(results.message);
      }
    }
  );
});

router.post("/addSection", function(req, res) {
  console.log("----- in backend: do add section------");
  kafka.make_request(
    "menu_topic",
    { path: "doAddSection", content: req.body },
    function(err, results) {
      console.log("in kafka call back on back-end");
      console.log(results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.data);
      } else {
        console.log("Inside results");
        return res.status(results.status).send(results.message);
      }
    }
  );
});

router.post("/deleteSection", function(req, res) {
  console.log("----- in backend: do delete section------");
  kafka.make_request(
    "menu_topic",
    { path: "doDeleteSection", content: req.body },
    function(err, results) {
      console.log("in kafka call back on back-end");
      console.log(results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.data);
      } else {
        console.log("Inside results");
        return res.status(results.status).send(results.message);
      }
    }
  );
});

router.post("/editSection", function(req, res) {
  console.log("----- in backend: do edit section------");
  kafka.make_request(
    "menu_topic",
    { path: "doEditSection", content: req.body },
    function(err, results) {
      console.log("in kafka call back on back-end");
      console.log(results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.data);
      } else {
        console.log("Inside results");
        return res.status(results.status).send(results.message);
      }
    }
  );
});

router.post("/addItem", function(req, res) {
  console.log("----- in backend: do add item------");
  kafka.make_request(
    "menu_topic",
    { path: "doAddItem", content: req.body },
    function(err, results) {
      console.log("in kafka call back on back-end");
      console.log(results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.data);
      } else {
        console.log("Inside results");
        return res.status(results.status).send(results.message);
      }
    }
  );
});

router.post("/editItem", function(req, res) {
  console.log("----- in backend: do edit item------");
  kafka.make_request(
    "menu_topic",
    { path: "doEditItem", content: req.body },
    function(err, results) {
      console.log("in kafka call back on back-end");
      console.log(results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.data);
      } else {
        console.log("Inside results");
        return res.status(results.status).send(results.message);
      }
    }
  );
});

router.post("/deleteItem", function(req, res) {
  console.log("----- in backend: do delete item------");
  kafka.make_request(
    "menu_topic",
    { path: "doDeleteItem", content: req.body },
    function(err, results) {
      console.log("in kafka call back on back-end");
      console.log(results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.data);
      } else {
        console.log("Inside results");
        return res.status(results.status).send(results.message);
      }
    }
  );
});

module.exports = router;
