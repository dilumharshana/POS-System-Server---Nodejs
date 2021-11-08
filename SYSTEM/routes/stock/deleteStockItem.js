const connection = require("../../connections/systemConnections");
require("dotenv").config();

const deleteStockItem = async (req, res) => {
  try {
    const { systemNamenameId, itemCode } = req.body;

    //getting stock model from  the conection
    const {
      models: { stock },
    } = await connection(systemNamenameId);

    await stock.deleteOne({ itemCode });
    res.status(200).json("Item deleted successfully !");
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteStockItem;
