const jwt_decode = require("jwt-decode");

//user model
const user = require("../../models/userModel");

const getUser = async (req, res) => {
  try {
    const { id } = jwt_decode(req.params.id);

    //getting token and convert
    const isUserExists = await user.findOne({ _id: id });

    //validate token
    if (isUserExists) {
      if (isUserExists._doc.isAccountActivated) {
        const { password, ...other } = isUserExists._doc;
        return res.status(200).json(other);
      }
      return res.status(500).json("your account is not activated !");
    }

    console.log("invalid");
    //if token is invalid
    return res.status(404).json("User not found");
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = getUser;
