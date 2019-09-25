const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..") + "/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.params.image + path.extname(file.originalname));
  }
});
const uploads = multer({
  storage: storage,
  limits: { fileSize: 500000 }
}).single("Image");

router.get("/:id", (req, res) => {
  var image = path.join(__dirname, "..") + "/public/images/" + req.params.id;
  if (fs.existsSync(image + ".jpg")) {
    res.sendFile(image + ".jpg");
  } else if (fs.existsSync(image + ".png")) {
    res.sendFile(image + ".png");
  } else {
    res.sendFile(
      path.join(__dirname, "..") + "/public/images/defaultImage.png"
    );
  }
});
router.post("/upload/:image", (req, res) => {
  console.log(req.params.image);
  uploads(req, res, function(err) {
    console.log("Request ::=>", req.body);
    console.log(req.body);
    console.log("Request file ::=>", req.file);

    if (!err) {
      return res.status(200).end();
    } else {
      console.log("Error!");
    }
  });
});

module.exports = router;
