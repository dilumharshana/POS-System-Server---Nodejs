const { MongoClient } = require("mongodb");

require("dotenv").config();

let client = null;
let newDataBaseName = null;
const NEW_DATABASE_CREATOR_URL = process.env.NEW_DATABASE_CREATOR_URL;

//gen ne2 db name
const generateDbName = () => Math.floor(Math.random() * 10000000);

const createDb = async () => {
  try {
    //connection
    client = new MongoClient(NEW_DATABASE_CREATOR_URL);
    await client.connect();

    //generatin an uniqe name
    newDataBaseName = generateDbName();
    while (
      (await client.db().admin().listDatabases()).databases.some(
        (database) => database.name === newDataBaseName.toString()
      )
    ) {
      client = generateDbName();
    }

    //creating databse
    client = new MongoClient(`${NEW_DATABASE_CREATOR_URL}/${newDataBaseName}`);
    await client.connect();
    return newDataBaseName && newDataBaseName;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

module.exports = { newDataBaseName, createDb };
