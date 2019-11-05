const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

// owner/profile
router.get("/profile/:id", function(req, res) {
  console.log("-----in backend: get owner get profile-----");
  kafka.make_request(
    "owner_topic",
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

//owner/profileUpdate
router.post("/profileUpdate/:id", function(req, res) {
  console.log("-----in backend: get owner update profile-----");
  let content = {
    data: req.body,
    id: req.params.id
  };
  kafka.make_request(
    "owner_topic",
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
