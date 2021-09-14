const { MongoClient } = require("mongodb");
require("dotenv").config();

//user model
const user = require("../../../models/userModel");

const removeSystem = async (req, res) => {
  try {
    const client = await MongoClient.connect(
      process.env.NEW_DATABASE_CREATOR_URL
    );

    const { systemID, _id } = req.body;

    //cheking databse availablitity before delete

    const { databases } = await client.db().admin().listDatabases();

    const availability = databases.some(
      (db) => db.name === systemID.toString()
    );
    if (!availability) return res.status(404).json("System already deleted !");

    //delete system

    await client.db(systemID.toString()).dropDatabase();

    //remove system from user
    const owner = await user.findOne({ _id });
    if (!owner) return res.status(404).json("User not found");

    owner.possystems = owner.possystems.filter(
      (system) => system.id !== systemID
    );

    await owner.save();

    res.status(200).json("System deleted successfully !");
  } catch (error) {
    console.log(error);
  }
};

module.exports = removeSystem;
