const router = require("express").Router();

const createSystem = require("./create system/createSystem.js");
const removeSystem = require("./remove system/removeSystem");
const removePermenently = require("./remove system/removePermenently");
const restoreSystem = require("./restore System/restoreSystem");
const chechSystemPassword = require("./system password check/systemPasswordCheck");

//create System
router.route("/create").post(createSystem);

//delete System
router.route("/remove").post(removeSystem);

//delete system permenently
router.route("/removeExact").post(removePermenently);

//restore system
router.route("/restore").post(restoreSystem);

//check systems password
router.post("/authsystem", chechSystemPassword);

module.exports = router;
