const express = require("express");
const router = express.Router();
const pool = require("../utility");

router.get("/:id", (req, res) => {
  id = req.params.id;
  fetchQuery = `SELECT Owner.restuarant_name, orderId, OrderStatus,orderDescription, totalPrice from grubHubDb.Order inner join Owner on grubHubDb.Order.restID = Owner.rest_id  where buyerID='${id}';`;
  pool.query(fetchQuery, (err, result) => {
    if (!err) {
      let orders = {
        pastOrders: [],
        upComingOrders: []
      };
      result.forEach(function(e) {
        console.log(e);
        if (e.OrderStatus === "Delivered" || e.OrderStatus === "Cancelled") {
          orders.pastOrders.push(e);
        } else {
          orders.upComingOrders.push(e);
        }
      });
      // console.log(orders);
      res.writeHead(200, {
        "Content-Type": "application/JSON"
      });
      res.end(JSON.stringify(orders));
    } else console.log(err);
  });
});

router.post("/placeOrder", (req, res) => {
  data = req.body;
  insertQuery = `Insert into grubHubDb.Order (BuyerID,restID,orderDescription,totalPrice) Values('${data.buyerId}','${data.restId}','${data.totalOrder}','${data.totalPrice}');`;
  console.log(insertQuery);
  pool.query(insertQuery, (err, result) => {
    if (!err) {
      console.log("Inside order js ");
      res.writeHead(200, {
        "Content-Type": "plain/text"
      });
      console.log("inserted");
      res.end("200");
    } else {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "plain/text"
      });
      res.end("500");
    }
  });
});

router.get("/rest/ongoing/:id", (req, res) => {
  id = req.params.id;
  selectQuery = `Select orderId, orderStatus, orderDescription, totalPrice,Buyer.name, Buyer.address from grubHubDb.Order Inner join Buyer On grubHubDb.Order.BuyerID = Buyer.buyer_id where grubHubDb.Order.restID = "${id}" and grubHubDb.Order.orderStatus in ('New', 'Preparing', 'Delivering');`;
  console.log(selectQuery);
  pool.query(selectQuery, (err, result) => {
    if (!err) {
      console.log("Inside order js ");
      res.writeHead(200, {
        "Content-Type": "application/Json"
      });
      console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    } else {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "plain/text"
      });
      res.end("500");
    }
  });
});
router.get("/rest/complete/:id", (req, res) => {
  id = req.params.id;
  selectQuery = `Select orderId, orderStatus, orderDescription, totalPrice,Buyer.name, Buyer.address from grubHubDb.Order Inner join Buyer On grubHubDb.Order.BuyerID = Buyer.buyer_id where grubHubDb.Order.restID = "${id}" and grubHubDb.Order.orderStatus in ('Delivered', 'Cancelled');`;
  console.log(selectQuery);
  pool.query(selectQuery, (err, result) => {
    if (!err) {
      console.log("Inside order js ");
      res.writeHead(200, {
        "Content-Type": "application/Json"
      });
      console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    } else {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "plain/text"
      });
      res.end("500");
    }
  });
});
router.post("/rest/changeStatus", (req, res) => {
  data = req.body;
  UpdateQuery = `Update grubHubDb.Order Set orderStatus="${data.orderStatus}" where grubHubDb.Order.orderId = "${data.orderId}";`;
  console.log(UpdateQuery);
  pool.query(UpdateQuery, (err, result) => {
    if (!err) {
      selectQuery = `Select orderId, orderStatus, orderDescription, totalPrice,Buyer.name, Buyer.address from grubHubDb.Order Inner join Buyer On grubHubDb.Order.BuyerID = Buyer.buyer_id where grubHubDb.Order.restID = "${data.rest_id}" and grubHubDb.Order.orderStatus in ('New', 'Preparing', 'Delivering');`;
      console.log(selectQuery);
      pool.query(selectQuery, (err, result) => {
        if (!err) {
          console.log("Inside order js ");
          res.writeHead(200, {
            "Content-Type": "application/Json"
          });
          console.log(JSON.stringify(result));
          res.end(JSON.stringify(result));
        } else {
          console.log(err);
          res.writeHead(500, {
            "Content-Type": "plain/text"
          });
          res.end("500");
        }
      });
    } else {
      res.writeHead(500, {
        "Content-Type": "plain/text"
      });
      res.end("500");
    }
  });
});
module.exports = router;
