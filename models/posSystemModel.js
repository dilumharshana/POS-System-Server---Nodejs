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

//password hashine
system.pre("save", async function (next) {
  try {
    if (isModified(this.password)) {
      this.password = await bcrypt.hash(
        this.password,
        await bcrypt.genSalt(10)
      );
    }
  } catch (err) {
    return err;
  }
});

module.exports = system;
