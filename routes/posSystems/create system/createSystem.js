const { createDb } = require("./createDb");
require("dotenv").config();

const connection = require("../../../connection/systemsConnection");

//user Model
const user = require("../../../models/userModel");

let con = null;

const createSystem = async (req, res) => {
  try {
    //get new db name
    const newDataBaseName = await createDb();

    //settting up new db
    con = await connection(newDataBaseName);

    const {
      models: { system },
    } = con;

    //request body contains name , password and system user id
    const { name, password } = await system.create(req.body);

    //updating user with new db
    const { owner } = req.body;
    const Systemowner = await user.findOne({ _id: owner });
    Systemowner.possystems.unshift({ id: newDataBaseName, name, password });

    //recording new db
    Systemowner.activities.unshift({
      activity: `Creted new system ${name}`,
      date: new Date().toDateString(),
    });

    Systemowner.save();

    res.status(200).json("System created successfully !");
  } catch (err) {
    res.status(500).json(err);
  } finally {
    con.close();
  }
};

module.exports = createSystem;
