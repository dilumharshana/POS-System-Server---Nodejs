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

    //get system owner
    const owner = await user.findOne({ _id });
    if (!owner) return res.status(404).json("User not found");

    //getting target system information from owner to put into current systems array
    const [{ id, name, password }] = owner.removedSystems.filter(
      (system) => system.id === systemID
    );

    //removeing system from removed pos systems array
    owner.removedSystems = owner.removedSystems.filter(
      (system) => system.id !== systemID
    );

    //adding restored pos system in to user current systems array
    owner.possystems.unshift({ id, name, password });

    //recording activity
    owner.activities.unshift({
      activity: `Restored system ${name}`,
      date: new Date().toDateString(),
    });

    await owner.save();

    res.status(200).json("System restored successfully !");
  } catch (error) {
    res.status(500).json(error);
  } finally {
    client.close();
  }
};

module.exports = removeSystem;
