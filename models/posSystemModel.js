const mongoose = require("mongoose");

require("dotenv").config();

const system = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 25,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    type: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isActivated: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = system;
