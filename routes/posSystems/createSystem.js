const { MongoClient } = require("mongodb");

require("dotenv").config();

//systemmodel
const system = require("../../models/posSystemModel");

const createSystem = async (req, res) => {
  try {
    //connection
    const client = new MongoClient(process.env.MONGODB_URL);
    client.connect();

    const { databases } = await client.db().admin().listDatabases();
    console.log(databases);

    let newDbName = Math.floor(Math.random() * 1000000);

    while (
      databases.some((database) => database.name === newDbName.toString())
    ) {
      newDbName = Math.floor(Math.random() * 1000000);
      console.log(newDbName);
    }

    console.log(`new db name is => ${newDbName}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = createSystem;
