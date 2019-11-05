const mongoose = require("mongoose");
const { order } = require("./order");

let buyer = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  profileImg: {
    type: String
  },
  phone_num: {
    type: Number
  },
  address: {
    type: String
  },
  orders: {
    pastOrders: [order],
    upcomingOrders: [order]
  }
});
let Buyer = mongoose.model("Buyer", buyer);
module.exports = Buyer;
