const express = require("express");
const router = express.Router();

//middlewares
const adminProfilePicture = require("../../middlewares/uploads/adminProfilePicture");

//modles
const registerUser = require("./registerUser");
const getUser = require("./getUser");
const updateProfilePicture = require("./updateProfilePictre");
const getProfilePicture = require("./getProfilePicture");
const deleteProfilePicture = require("./deleteProfilePicture");
const updateUserInfo = require("./updateAdminInfo");
const updateAdminPassword = require("./updateAdminPassword");

router.route("/register").post(registerUser);
router.route("/:id").get(getUser);
router
  .route("/profilePicture/:id")
  .post(adminProfilePicture.single("file"), updateProfilePicture);

router.route("/profilePicture/:id").get(getProfilePicture);
router.route("/profilePicture/:id").delete(deleteProfilePicture);
router.route("/updateinfo/:id").post(updateUserInfo);
router.route("/updateAdminSecurity/:id").put(updateAdminPassword);

module.exports = router;
