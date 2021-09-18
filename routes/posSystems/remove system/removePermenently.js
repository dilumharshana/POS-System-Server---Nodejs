const { MongoClient } = require("mongodb");
require("dotenv").config();

//user model
const user = require("../../../models/userModel");

let client = null;

const removePermenently = async (req, res) => {
  try {
    client = await MongoClient.connect(process.env.NEW_DATABASE_CREATOR_URL);

    const { systemID, _id } = req.body;

    //cheking databse availablitity before delete
    const { databases } = await client.db().admin().listDatabases();

    const availability = databases.some(
      (db) => db.name === systemID.toString()
    );
    if (!availability) return res.status(404).json("System already deleted !");

    //delete system
    const removedDb = await client.db(systemID.toString()).dropDatabase();

    //remove system from user pos systems
    const owner = await user.findOne({ _id });
    if (!owner) return res.status(404).json("User not found");

    //removeing system from removed pos systems array
    owner.possystems.filter((system) => system.id !== systemID);

    // owner.permenentlyRemovedSystems.unshift()

    await owner.save();

    res.status(200).json("System deleted successfully !");
  } catch (error) {
    return res.status(500).json(erorr.toString());
  } finally {
    client.close();
  }
};

module.exports = removePermenently;
