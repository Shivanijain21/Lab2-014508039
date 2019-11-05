const { Message } = require("../models/message");
const Owner = require("../models/owner");
const Buyer = require("../models/buyer");

function handle_request(msg, callback) {
  console.log("Inside message service kafka backend");
  console.log(msg);
  switch (msg.path) {
    case "getMessages": {
      getMessages(msg.content, callback);
      break;
    }
    case "sendMessage": {
      sendMessage(msg.content, callback);
      break;
    }
  }
}

let sendMessage = async (content, callback) => {
  data = content;
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
            console.log("-----updated res-------");
            console.log(order.messages);
            callback(null, {
              status: 200,
              message: JSON.stringify(order.messages)
            });
            return;
          } else {
            callback({ status: 500, data: "500" }, null);
            return;
          }
        });
      } else {
        callback({ status: 500, data: "500" }, null);
        return;
      }
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
    // console.log(buyerMessages);
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
            callback(null, {
              status: 200,
              message: JSON.stringify(order.messages)
            });
            return;
          } else {
            callback({ status: 500, data: "500" }, null);
            return;
          }
        });
      } else {
        callback({ status: 500, data: "500" }, null);
        return;
      }
    });
  }
};

let getMessages = async (content, callback) => {
  data = content;
  if (data.sender === "Owner") {
    let restuarant = await Owner.findById(data.id);
    let order = await restuarant.orders.upcomingOrders.id(data.orderId);
    console.log(order);
    callback(null, { status: 200, message: JSON.stringify(order.messages) });
    return;
  } else {
    let buyer = await Buyer.findById(data.id);
    let order = await buyer.orders.upcomingOrders.id(data.orderId);
    callback(null, { status: 200, message: JSON.stringify(order.messages) });
    return;
  }
};
exports.handle_request = handle_request;
