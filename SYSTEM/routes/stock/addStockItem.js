const connection = require("../../connections/systemConnections");

const addStockItem = async (req, res) => {
  try {
    const { systemID, ...itemData } = req.body;

    //getting stock model from connection
    const {
      models: { stock },
    } = await connection(systemID.toString());

    //adding new stock items to stock
    const newItem = await stock.create(itemData);
    res.status(200).json(newItem);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

module.exports = addStockItem;
