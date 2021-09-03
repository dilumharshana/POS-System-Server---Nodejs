const express = require("express");
const router = express.Router();

//modles
const registerUser = require("./registerUser");

router.route("/register").post(registerUser);

module.exports = router;
