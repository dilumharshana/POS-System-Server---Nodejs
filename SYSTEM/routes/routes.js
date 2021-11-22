const router = require("express").Router();

//routes
const generateImageUploadUrl = require("./stock/aws-upload-url");
const addStockItem = require("./stock/addStockItem");
const deleteItem = require("./stock/deleteStockItem");
const hideItem = require("./stock/hideItem");
const updateItem = require("./stock/updateStockItem");

router.get("/stock/generateImageUploadUrl/:name", generateImageUploadUrl);
router.post("/stock/addItem", addStockItem);
router.post("/stock/remove", deleteItem);
router.post("/stock/hide", hideItem);
router.post("/stock/update", updateItem);

module.exports = router;
