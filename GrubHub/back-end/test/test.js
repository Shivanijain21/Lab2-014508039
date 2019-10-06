var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check credentials and return status code", function(done) {
  chai
    .request("http://127.0.0.1:3001")
    .post("/login")
    .send({ username: "shivani.jain@sjsu.edu", password: "admin" })
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
});

it("should return status code 200 ", function(done) {
  chai
    .request("http://127.0.0.1:3001")
    .get("/search")
    .send()
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
});

it("gets the buyer id from params,fetches the order and returns status code 200 ", function(done) {
  chai
    .request("http://127.0.0.1:3001")
    .get("/order/6")
    .send()
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
});

it("gets the owner id from param,fetches the profile ", function(done) {
  chai
    .request("http://127.0.0.1:3001")
    .get("/owner/profile/6")
    .send()
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
});

it("gets the buyer id from the url,updates the profile", function(done) {
  chai
    .request("http://127.0.0.1:3001")
    .post("/buyer/profileUpdate/21")
    .send({
      name: "Shivani jain",
      phone_num: "7676",
      address: "colo"
    })
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
});
