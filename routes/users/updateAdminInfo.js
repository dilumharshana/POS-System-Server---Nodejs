const user = require("../../models/userModel");

const updateAdminInfo = async (req, res) => {
  try {
    const owner = await user.findOne({ _id: req.params.id });

    if (owner) {
      owner.name = req.body.name;
      owner.save();
      return res.status(200).json("User updated successfully");
    }

    return res.status(404).json("user not found");
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = updateAdminInfo;
