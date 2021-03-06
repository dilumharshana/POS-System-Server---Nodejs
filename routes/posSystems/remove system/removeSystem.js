const { MongoClient } = require("mongodb");
require("dotenv").config();

//user model
const user = require("../../../models/userModel");

let client = null;

const removeSystem = async (req, res) => {
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
    // await client.db(systemID.toString()).dropDatabase();

    //remove system from user pos systems
    const owner = await user.findOne({ _id });
    if (!owner) return res.status(404).json("User not found");

    //getting target system information from owner to put into removed systems array
    const [targetDb] = owner.possystems.filter(
      (system) => system.id === systemID
    );

    //removeing system from current pos systems array
    owner.possystems = owner.possystems.filter(
      (system) => system.id !== systemID
    );

    //adding removed pos system in to user removed systems array
    owner.removedSystems.unshift({
      ...targetDb,
      date: new Date().toDateString(),
    });

    //recording activities
    owner.activities.unshift({
      activity: `Deleted system ${targetDb.name}`,
      date: new Date().toDateString(),
    });

    await owner.save();

    res.status(200).json("System deleted successfully !");
  } catch (error) {
    return res.status(500).json(error.toString());
  } finally {
    client.close();
  }
};

module.exports = removeSystem;
