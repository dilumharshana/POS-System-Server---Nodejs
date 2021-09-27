const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
require("dotenv").config();

//connection to system
const connection = require("../../../connection/systemsConnection");

const systemPasswordCheck = async (req, res) => {
  let mongodbCon = null;
  let con = null;

  try {
    const { dbName, password } = req.body;

    //connecting to mongodb
    mongodbCon = await MongoClient.connect(process.env.MONGODB_URL);

    //getting available databse list
    const { databases } = await mongodbCon.db().admin().listDatabases();

    //check if required db is available in db
    const availability = databases.some(
      (database) => database.name === dbName.toString()
    );

    //if system is not available
    if (!availability) return res.status(404).json("System not available");

    //getting connection and check password if system available
    con = await connection(dbName.toString());

    //getting system model from created connection
    //@ des : here these models are registed in the connecion
    const {
      models: { system },
    } = con;

    //fetching system password from the system
    const [{ password: systemPassword }] = await system.find();

    //verify password
    const validity = await bcrypt.compare(password, systemPassword);

    //if pass incorrect
    if (!validity) return res.status(401).json("Incorrect password !");

    return res.status(200).json(true);
  } catch (error) {
    return res.status(500).json(error);
  } finally {
    con.close();
    mongodbCon.close();
  }
};

module.exports = systemPasswordCheck;
