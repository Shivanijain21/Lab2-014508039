const mongoose = require("mongoose");

let item = mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  itemName: {
    type: String,
    required: true
  }
});
let Item = mongoose.model("Item", item);
module.exports = { Item, item };
