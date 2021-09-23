const bcrypt = require("bcrypt");
const user = require("../../models/userModel");

const updateAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const owner = await user.findOne({ _id: req.params.id });
    if (owner) {
      if (await bcrypt.compare(currentPassword, owner.password)) {
        owner.password = newPassword;
        await owner.save();
        return res.status(200).json("user updated successfully");
      }
      return res.status(401).json("Current password is incorrect");
    }
    return res.status(404).json("user not found");
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = updateAdminPassword;
