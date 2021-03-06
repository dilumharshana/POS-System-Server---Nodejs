const connection = require("../../../connection/systemsConnection");
const systemAvailability = require("../system availability/systemAvailability");

const getSystem = async (req, res) => {
  try {
    //check for system availability
    const availability = await systemAvailability(req.params.id.toString());

    //if system is not available
    if (!availability) return res.status(404).json("System not available");

    //defactureing system modle from connection
    const {
      models: { system },
    } = await connection(req.params.id.toString());

    //fetching system data
    const {
      _doc: { password, ...systemData },
    } = await system.findOne();

    res.status(200).json(systemData);
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = getSystem;
