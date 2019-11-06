const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

router.post("/", function(req, res) {
  console.log("in sign in backend");
  kafka.make_request("sign_in", req.body, function(err, results) {
    console.log("in kafka call back on back-end");
    if (err) {
      console.log("Inside err");
      console.log(err);
      return res
        .status(err.status)
        .json({ data: err.data, success: err.success });
    } else {
      console.log("Inside signin else");
      return res.status(results.status).json({
        id: results.id,
        token: results.token,
        success: results.success,
        data: results.data
      });
    }
  });
});
module.exports = router;
