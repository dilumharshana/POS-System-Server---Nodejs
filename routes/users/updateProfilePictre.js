const user = require("../../models/userModel");
const path = require("path");

const updateProfilePicture = async (req, res) => {
  try {
    const owner = await user.findOne({ _id: req.params.id });
    if (!owner) return res.status(404).json("User not found !");

    owner.image = req.file.originalname;

    await owner.save();
    return res.status(200).json(req.file.path);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = updateProfilePicture;
