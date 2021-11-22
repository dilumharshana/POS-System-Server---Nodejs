const connection = require("../../../SYSTEM/connections/systemConnections");
const systemAvailability = require("../../../routes/posSystems/system availability/systemAvailability");

const updateStockItem = async (req, res) => {
  try {
    const {
      systemID,
      currentItemCode,
      itemCode,
      hidden,
      itemName,
      cashPrice,
      sellingPrice,
      quantity,
      description,
      itemImage,
    } = req.body;

    //cheking for system availability
    const availability = await systemAvailability(systemID);

    //if system is not available
    if (!availability) return res.status(404).json("System not available !");

    //getting modle from connection
    const {
      models: { stock },
    } = await connection(systemID);

    let foundItem = await stock.findOne({ itemCode: currentItemCode });

    if (foundItem) {
      foundItem.hidden = hidden;
      foundItem.itemName = itemName;
      foundItem.itemCode = itemCode;
      foundItem.cashPrice = cashPrice;
      foundItem.sellingPrice = sellingPrice;
      foundItem.quantity = quantity;
      foundItem.description = description;
      foundItem.itemImage = itemImage;

      const result = await foundItem.save();
      return res.status(200).json(result);
    }

    return res.status(404).json("Item not found !");
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateStockItem;
