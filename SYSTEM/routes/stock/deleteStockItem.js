const connection = require("../../connections/systemConnections");
const { s3, Bucket } = require("./s3Object")();
require("dotenv").config();

const deleteStockItem = async (req, res) => {
  try {
    const { systemNamenameId, itemCode } = req.body;

    //getting stock model from  the conection
    const {
      models: { stock },
    } = await connection(systemNamenameId);

    await stock.deleteOne({ itemCode });

    await s3.deleteObject({ Bucket, Key: itemCode }, (err, data) => {
      if (err) return console.log(err);
      console.log(data);
    });

    res.status(200).json("Item deleted successfully !");
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteStockItem;
