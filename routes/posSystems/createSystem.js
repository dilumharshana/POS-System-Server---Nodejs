const { createDb } = require("./createDb");
require("dotenv").config();

const connection = require("../../connection/systemsConnection");

//user Model
const user = require("../../models/userModel");

const createSystem = async (req, res) => {
  try {
    const { name, owner } = req.body;

    //get new db name
    const newDataBaseName = await createDb();

    //settting up new db
    const con = await connection(newDataBaseName);

    const {
      models: { system },
    } = con;

    await system.create(req.body);

    con.close();

    //updating user with new db

    const systemOwner = await user.findOne({ _id: owner });
    systemOwner.possystems.push({ name, id: newDataBaseName });
    systemOwner.save();

    res.status(200).json("New system created successfully !");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = createSystem;
