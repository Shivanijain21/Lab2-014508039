const Owner = require("../models/owner");
const Buyer = require("../models/buyer");
const { Order } = require("../models/order");

function handle_request(msg, callback) {
  console.log("Inside search service kafka backend");
  console.log(msg);
  switch (msg.path) {
    case "placeOrder": {
      placeOrder(msg.content, callback);
      break;
    }
    case "getBuyerOrder": {
      getBuyerOrder(msg.content, callback);
      break;
    }
    case "getOwnerOrders": {
      getOwnerOrders(msg.content, callback);
      break;
    }
    case "changeOrderStatus": {
      changeOrderStatus(msg.content, callback);
      break;
    }
  }
}

let getBuyerOrder = async (req, callback) => {
  console.log("in kafka: get buyerOrders");
  let id = req;
  let response = {};
  let error = {};
  const buyer = await Buyer.findById(id);
  const orders = buyer.orders;
  if (orders) {
    response = {
      status: 200,
      message: JSON.stringify(orders)
    };
    callback(null, response);
  } else {
    error = {
      status: 500,
      data: "500"
    };
    callback(error, null);
  }
};

let placeOrder = async (content, callback) => {
  let data = content;
  let error = {};
  let response = {};
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
        error = {
          status: 500,
          data: "500"
        };
        callback(error, null);
        return;
      }
    });
    const ownerOrder = owner.orders.upcomingOrders;
    await ownerOrder.push(order);
    await owner.save(function(err, res) {
      if (err) {
        error = {
          status: 500,
          data: "500"
        };
        callback(error, null);
        return;
      }
    });
    response = {
      status: 200,
      message: "200"
    };
    callback(null, response);
    return;
  } catch {
    err => {
      console.log(err);
      error = {
        status: 500,
        data: "500"
      };
      callback(error, null);
    };
  }
};

let getOwnerOrders = async (content, callback) => {
  id = content;
  const restuarant = await Owner.findById(id);
  const orders = restuarant.orders;
  if (orders) {
    callback(null, { status: 200, message: JSON.stringify(orders) });
  } else callback(null, { status: 500, data: "500" });
};

let changeOrderStatus = async (content, callback) => {
  data = content;
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
        callback({ status: 500, data: "500" }, null);
        return;
      } else {
        buyer.save(function(err, check) {
          if (!err) {
            callback(null, {
              status: 200,
              message: JSON.stringify(updatedObj.orders)
            });
            return;
          } else {
            callback({ status: 500, data: "500" }, null);
            return;
          }
        });
      }
    });
  } else {
    await restuarant.save(function(err, updatedObj) {
      if (err) {
        callback({ status: 500, data: "500" }, null);
        return;
      } else {
        console.log(updatedObj.orders);
        buyer.save(function(err, check) {
          if (check) {
            callback(null, {
              status: 200,
              message: JSON.stringify(updatedObj.orders)
            });
            return;
          } else {
            callback({ status: 500, data: "500" }, null);
            return;
          }
        });
      }
    });
  }
};

exports.handle_request = handle_request;
