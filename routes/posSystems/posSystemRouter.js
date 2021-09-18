const router = require("express").Router();

const createSystem = require("./create system/createSystem.js");
const removeSystem = require("./remove system/removeSystem");
const removePermenently = require("./remove system/removePermenently");
const restoreSystem = require("./restore System/restoreSystem");

//create System
router.route("/create").post(createSystem);

//delete System
router.route("/remove").post(removeSystem);

//delete system permenently
router.route("/removeExact").post(removePermenently);

//restore system
router.route("/restore").post(restoreSystem);

module.exports = router;
