const mongoose = require("mongoose");
const { item } = require("../models/item");

let section = mongoose.Schema({
  sectionName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  items: [item]
});
let Section = mongoose.model("Section", section);
module.exports = { Section: Section, section: section };
