const mongoose = require("mongoose");
require("dotenv").config();

//models
const stock = require("../models/stockModel");

const connection = async (systemNamenameId) => {
  let con;
  try {
    //creating new connection
    con = await mongoose.createConnection(
      `${process.env.NEW_DATABASE_CREATOR_URL}/${systemNamenameId.toString()}`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    //registring model to access throuch createConnection model
    con.model("stock", stock);

    return con && con;
  } catch (error) {
    return error;
  }
};

module.exports = connection;
