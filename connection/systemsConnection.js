const mongoose = require("mongoose");
require("dotenv").config();

const system = require("../models/posSystemModel");

const NEW_DATABASE_CREATOR_URL = process.env.NEW_DATABASE_CREATOR_URL;

let con = {};

const connection = async (url) => {
  try {
    con = await mongoose.createConnection(
      `${NEW_DATABASE_CREATOR_URL}/${url}`,
      {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );

    con.model("system", system);

    return con && con;
  } catch (error) {
    console.log(error);
  }
};

module.exports = connection;
