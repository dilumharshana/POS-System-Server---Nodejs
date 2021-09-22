const jwt_decode = require("jwt-decode");

//user model
const user = require("../../models/userModel");

const getUser = async (req, res) => {
  try {
    const { id } = jwt_decode(req.params.id);
    const isUserExists = await user.findOne({ _id: id });
    if (isUserExists) {
      if (isUserExists._doc.isAccountActivated) {
        const { password, ...other } = isUserExists._doc;
        return res.status(200).json(other);
      }
      return res.status(500).json("your account is not activated !");
    }
    res.status(404).json("User not found");
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = getUser;
