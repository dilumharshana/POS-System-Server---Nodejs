//connection
const connection = require("../../connections/systemConnections");

const hideItem = async (req, res) => {
  const { systemNamenameId, itemCode } = req.body;
  try {
    //getting stock model fromconnection
    const {
      models: { stock },
    } = await connection(systemNamenameId.toString());

    //getting item
    const item = await stock.findOne({ itemCode });

    //updating hidden property
    await stock.updateOne(
      { itemCode },
      { $set: { hidden: item.hidden ? false : true } }
    );

    res.status(200).json("Item Hide Successfully !");
  } catch (error) {
    console.log(error);
  }
};

module.exports = hideItem;
