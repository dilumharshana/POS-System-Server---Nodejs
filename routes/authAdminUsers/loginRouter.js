const router = require("express").Router();

//modules
const userLogin = require("./userLogin");

router.route("/").post(userLogin);

module.exports = router;
