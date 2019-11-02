const mongoose = require("mongoose");
const { message } = require("./message");

let order = mongoose.Schema({
  orderId: {
    type: Number
  },
  orderStatus: {
    type: String,
    required: true
  },
  orderDescription: {
    type: String,
    required: true
  },
  totalPrice: {
    type: String,
    required: true
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  restId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  buyerName: {
    type: String,
    required: true
  },
  restuarantName: {
    type: String,
    required: true
  },
  buyerAddress: {
    type: String,
    required: true
  },
  messages: [message]
});
let Order = mongoose.model("Order", order);
module.exports = { order, Order };
