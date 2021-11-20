const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const stock = mongoose.Schema({
  itemCode: {
    type: String,
    requried: true,
    unique: true,
  },
  itemName: {
    type: String,
    requried: true,
  },
  cashPrice: {
    type: Number,
    requried: true,
  },
  sellingPrice: {
    type: Number,
    requried: true,
  },
  quantity: {
    type: Number,
    requried: true,
  },
  itemImage: {
    type: String,
  },
  description: {
    type: String,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

module.exports = stock;
