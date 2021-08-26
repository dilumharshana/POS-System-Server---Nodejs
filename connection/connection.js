const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;

const connection = mongoose.connect(MONGODB_URL, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = connection;
