const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

router.post("/sendMessage", function(req, res) {
  console.log("in backend: send messages");
  kafka.make_request(
    "message_topic",
    { path: "sendMessage", content: req.body },
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

router.post("/", function(req, res) {
  console.log("in backend: get messages");
  kafka.make_request(
    "message_topic",
    { path: "getMessages", content: req.body },
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
