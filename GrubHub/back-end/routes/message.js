const express = require("express");
const router = express.Router();
const { Message } = require("../models/message");
const Owner = require("../models/owner");
const Buyer = require("../models/buyer");

router.post("/sendMessage", async (req, res) => {
  data = req.body;
  if (data.sender === "Owner") {
    let restuarant = await Owner.findById(data.id);
    let order = await restuarant.orders.upcomingOrders.id(data.orderId);
    let messages = order.messages;
    let message = new Message(
      Object.assign(
        {},
        {
          messageBody: data.messageContent,
          sentBy: restuarant.restuarantName,
          senderId: data.id,
          timestamp: new Date(Date.now())
        }
      )
    );
    messages.push(message);
    let buyer = await Buyer.findById(order.buyerId);
    let buyerOrder = await buyer.orders.upcomingOrders.id(data.orderId);
    let buyerMessages = buyerOrder.messages;
    buyerMessages.push(message);
    restuarant.save(function(err, updateRes) {
      if (!err) {
        buyer.save(function(err, updatedBuyer) {
          if (!err) {
            let order = updateRes.orders.upcomingOrders.id(data.orderId);
            return res.status(200).send(JSON.stringify(order.messages));
          } else return res.status(500).send("500");
        });
      } else return res.status(500).send("500");
    });
  } else {
    let buyer = await Buyer.findById(data.id);
    let buyerOrder = await buyer.orders.upcomingOrders.id(data.orderId);
    let buyerMessages = buyerOrder.messages;
    let message = new Message(
      Object.assign(
        {},
        {
          messageBody: data.messageContent,
          sentBy: buyer.firstName,
          senderId: data.id,
          timestamp: new Date(Date.now())
        }
      )
    );
    console.log(buyerMessages);
    let restuarant = await Owner.findById(buyerOrder.restId);
    let order = await restuarant.orders.upcomingOrders.id(data.orderId);
    let messages = order.messages;
    buyerMessages.push(message);
    messages.push(message);
    buyer.save(function(err, updateBuyer) {
      if (!err) {
        restuarant.save(function(err, updatedRes) {
          if (!err) {
            let order = updateBuyer.orders.upcomingOrders.id(data.orderId);
            return res.status(200).send(JSON.stringify(order.messages));
          } else return res.status(500).send("500");
        });
      } else return res.status(500).send("500");
    });
  }
});

router.post("/", async (req, res) => {
  data = req.body;
  if (data.sender === "Owner") {
    let restuarant = await Owner.findById(data.id);
    let order = await restuarant.orders.upcomingOrders.id(data.orderId);
    return res.status(200).send(JSON.stringify(order.messages));
  } else {
    let buyer = await Buyer.findById(data.id);
    let order = await buyer.orders.upcomingOrders.id(data.orderId);
    return res.status(200).send(JSON.stringify(order.messages));
  }
});
module.exports = router;
