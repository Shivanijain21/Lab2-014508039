const express = require("express");
const router = express.Router();
const Owner = require("../models/owner");
const Buyer = require("../models/buyer");
const { Order } = require("../models/order");

router.get("/:id", async (req, res) => {
  id = req.params.id;
  const buyer = await Buyer.findById(id);
  const orders = buyer.orders;
  if (orders) {
    res.status(200).send(JSON.stringify(orders));
  } else res.status(500).send("500");
});

router.post("/placeOrder", async (req, res) => {
  let data = req.body;
  try {
    const buyer = await Buyer.findById(data.buyerId);
    const owner = await Owner.findById(data.restId);
    let order = new Order(
      Object.assign(
        {},
        {
          totalPrice: data.totalPrice,
          orderDescription: data.totalOrder,
          orderStatus: "New",
          buyerId: data.buyerId,
          buyerName: `${buyer.firstName} ${buyer.lastName}`,
          buyerAddress: buyer.buyerAdd ? buyer.buyerAdd : "default",
          restuarantName: owner.restuarantName,
          restId: data.restId
        }
      )
    );
    const buyerOrder = buyer.orders.upcomingOrders;
    await buyerOrder.push(order);
    await buyer.save(function(err, res) {
      if (err) {
        res.status(500).send("500");
      }
    });
    const ownerOrder = owner.orders.upcomingOrders;
    await ownerOrder.push(order);
    await owner.save(function(err, res) {
      if (err) {
        res.status(500).send("500");
      }
    });
    return res.status(200).send("200");
  } catch {
    err => {
      console.log(err);
      return res.status(500).send("500");
    };
  }
});
router.get("/rest/:id", async (req, res) => {
  id = req.params.id;
  const restuarant = await Owner.findById(id);
  const orders = restuarant.orders;
  if (orders) {
    res.status(200).send(JSON.stringify(orders));
  } else res.status(500).send("500");
});

router.post("/rest/changeStatus", async (req, res) => {
  data = req.body;
  let restuarant = await Owner.findById(data.rest_id);
  let upcomingorders = restuarant.orders.upcomingOrders;
  console.log(upcomingorders);
  let pastorders = restuarant.orders.pastOrders;
  let order = await upcomingorders.id(data.orderId);
  console.log(order.buyerId);
  let buyer = await Buyer.findById(order.buyerId);
  let buyerPastorders = buyer.orders.pastOrders;
  let buyerupcomingorders = buyer.orders.upcomingOrders;
  let buyerOrder = await buyerupcomingorders.id(data.orderId);
  console.log(buyerOrder);
  order.orderStatus = data.orderStatus;
  buyerOrder.orderStatus = data.orderStatus;
  if (data.orderStatus == "Cancelled" || data.orderStatus == "Delivered") {
    await pastorders.push(order);
    await order.remove();
    await buyerPastorders.push(order);
    await buyerOrder.remove();
    await restuarant.save(function(err, updatedObj) {
      if (err) {
        return res.status(500).send("500");
      } else {
        buyer.save(function(err, check) {
          if (!err) {
            return res.status(200).send(JSON.stringify(updatedObj.orders));
          } else {
            return res.status(500).send("500");
          }
        });
      }
    });
  } else {
    await restuarant.save(function(err, updatedObj) {
      if (err) {
        return res.status(500).send("500");
      } else {
        console.log(updatedObj.orders);
        buyer.save(function(err, check) {
          if (check) {
            return res.status(200).send(JSON.stringify(updatedObj.orders));
          } else {
            return res.status(500).send("500");
          }
        });
      }
    });
  }
});
module.exports = router;
