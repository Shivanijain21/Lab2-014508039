var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.post("/submit", (req, res) => {
  console.log("Req Body : ", req.body);
  let output;
  try {
    output = eval(req.body.input);
  } catch {
    output = "error";
  }
  let result = {
    output: String(output)
  };

  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  console.log("Result : ", JSON.stringify(result));
  res.end(JSON.stringify(result));
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
