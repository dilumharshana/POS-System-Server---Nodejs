const router = require("express").Router();

//routes
const generateImageUploadUrl = require("./stock/aws-upload-url");
const addStockItem = require("./stock/addStockItem");

router.get("/generateImageUploadUrl/:name", generateImageUploadUrl);
router.post("/addItem", addStockItem);

module.exports = router;
