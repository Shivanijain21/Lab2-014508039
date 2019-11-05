const express = require("express");
const router = express.Router();
// const pool = require("../utility");
const kafka = require("../kafka/client");

// buyer/profile
router.get("/profile/:id", function(req, res) {
  console.log("-----in backend: get buyer get profile-----");
  kafka.make_request(
    "buyer_topic",
    { path: "getProfile", content: req.params.id },
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

// buyer/profileUpdate
router.post("/profileUpdate/:id", function(req, res) {
  console.log("-----in backend: get buyer update profile-----");
  let content = {
    data: req.body,
    id: req.params.id
  };
  kafka.make_request(
    "buyer_topic",
    { path: "updateProfile", content: content },
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
