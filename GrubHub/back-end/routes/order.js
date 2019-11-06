const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

router.get("/:id", function(req, res) {
  console.log("in backend: get buyer orders");
  let id = req.params.id;
  kafka.make_request(
    "order_topic",
    { path: "getBuyerOrder", content: id },
    function(err, results) {
      console.log("in kafka call back on back-end");
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

router.post("/placeOrder", function(req, res) {
  console.log("in backend: place buyer orders");
  kafka.make_request(
    "order_topic",
    { path: "placeOrder", content: req.body },
    function(err, results) {
      console.log("in kafka call back on back-end");
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

router.get("/rest/:id", function(req, res) {
  id = req.params.id;
  kafka.make_request(
    "order_topic",
    { path: "getOwnerOrders", content: id },
    function(err, results) {
      console.log("in kafka rest owner call back on back-end");
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

router.post("/rest/changeStatus", function(req, res) {
  kafka.make_request(
    "order_topic",
    { path: "changeOrderStatus", content: req.body },
    function(err, results) {
      console.log("in kafka change status call back on back-end");
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
