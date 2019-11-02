const mongoose = require("mongoose");

let message = mongoose.Schema({
  messageBody: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  sentBy: {
    type: String,
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});
let Message = mongoose.model("Message", message);
module.exports = { Message, message };
