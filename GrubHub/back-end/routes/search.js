const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

// search String
router.get("/", function(req, res) {
  kafka.make_request(
    "search_topic",
    { path: "allRestuarant", content: req.body },
    function(err, results) {
      console.log("in kafka call back on back-end");
      console.log(results);
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.data);
      } else {
        console.log("Inside results");
        return res.status(results.status).send(results.restuarants);
      }
    }
  );
});

router.get("/:searchString", function(req, res) {
  let searchString = req.params.searchString;
  kafka.make_request(
    "search_topic",
    { path: "searchSpecific", content: searchString },
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
