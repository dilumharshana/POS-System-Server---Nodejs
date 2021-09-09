const express = require("express");
const router = express.Router();

//modles
const registerUser = require("./registerUser");
const getUser = require("./getUser");

router.route("/register").post(registerUser);
router.route("/:id").get(getUser);

module.exports = router;
