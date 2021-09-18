const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

system.pre("save", async function () {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(
        this.password,
        await bcrypt.genSalt(10)
      );
    }
  } catch (error) {
    return error;
  }
});

module.exports = system;
