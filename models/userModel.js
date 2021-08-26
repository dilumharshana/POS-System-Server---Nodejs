const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//db connection
require("../connection/connection");

const user = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    possystems: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//pass hashing
user.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(
        this.password,
        await bcrypt.genSalt(10)
      );
    }
  } catch (err) {
    return err;
  }
});

module.exports = mongoose.model("user", user);
