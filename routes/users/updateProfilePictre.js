const user = require("../../models/userModel");

const updateProfilePicture = async (req, res) => {
  try {
    const user = await user.findOne({ _id: req.params.id });
    if (!user) return res.status(404).json("User not found !");

    user.image = req.file.originalname;

    await user.save();
    res.status(200).json(req.file.path);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = updateProfilePicture;
