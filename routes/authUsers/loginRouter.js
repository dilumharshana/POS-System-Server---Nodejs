const express = require("express");
const router = express.Router();

//modules
const userLogin = require("./userLogin");

router.route("/").post(userLogin);

module.exports = router;
