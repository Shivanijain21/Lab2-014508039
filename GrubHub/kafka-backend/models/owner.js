const mongoose = require("mongoose");
const { section } = require("../models/section");
const { order } = require("./order");

let owner = mongoose.Schema({
  restId: {
    type: Number
  },
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
  ownerDp: {
    type: String
  },
  Zip: {
    type: Number
  },
  restuarantName: {
    type: String,
    required: true
  },
  restuarantDp: {
    type: String
  },
  cuisine: {
    type: String
  },
  restuarantAdd: {
    type: String,
    required: true
  },
  sections: [section],
  orders: {
    pastOrders: [order],
    upcomingOrders: [order]
  }
});
let Owner = mongoose.model("Owner", owner);
module.exports = Owner;
