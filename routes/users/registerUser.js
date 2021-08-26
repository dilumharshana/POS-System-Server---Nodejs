const bcrypt = require("bcrypt");

//user model
const user = require("../../models/userModel");

const generateToken = require("../../utils/generateToken");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await user.findOne({ email });

  if (userExists)
    return res.status(401).json("This email is exists please sign in !");

  const createNewUser = await user.create(req.body);

  if (createNewUser) {
    const { password, isAdmin, ...newUser } = createNewUser._doc;
    const token = generateToken(createNewUser._id);

    res.status(200).json({ ...newUser, token });
  }
};

module.exports = registerUser;
