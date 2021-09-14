const router = require("express").Router();

const createSystem = require("./create system/createSystem.js");
const removeSystem = require("./remove system/removeSystem");

//create System
router.route("/create").post(createSystem);

//delete System
router.route("/remove").post(removeSystem);

module.exports = router;
