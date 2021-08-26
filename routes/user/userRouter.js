const express = require("express");
const router = express.Router();

//modles
const registerUser = require("./routerModules/registerUser");

router.route("/").post(registerUser);

module.exports = router;
