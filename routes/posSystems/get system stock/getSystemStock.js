const connection = require("../../../SYSTEM/connections/systemConnections");
const systemAvailability = require("../system availability/systemAvailability");

const getSystemStock = async (req, res) => {
  let con = null;
  const systemID = req.params.id;

  try {
    //cheking for system availability
    const availability = await systemAvailability(systemID);

    //if system is not available
    if (!availability) return res.status(404).json("System not available !");

    //crate connection
    con = await connection(systemID);

    //getting system model from created connection
    //@ des : here these models are registed in the connecion
    const {
      models: { stock },
    } = con;

    const result = await stock.find();

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  } finally {
    con && con.close();
  }
};

module.exports = getSystemStock;
