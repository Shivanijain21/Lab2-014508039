const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

router.post("/", function(req, res) {
  kafka.make_request("sign_up", req.body, function(err, results) {
    console.log("in kafka call back on back-end");
    if (err) {
      console.log("Inside err");
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      console.log("Inside else");
      return res.status(results.status).send(results.message);
    }
  });
});

module.exports = router;
