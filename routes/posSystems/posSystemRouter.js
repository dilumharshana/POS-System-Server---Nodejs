const router = require("express").Router();

const createSystem = require("./createSystem.js");

//create System
router.route("/create").post(createSystem);

module.exports = router;
