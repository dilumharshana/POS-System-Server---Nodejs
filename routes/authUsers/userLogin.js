const bcrypt = require("bcrypt");

//user model
const user = require("../../models/userModel");
const generateToken = require("../../utils/generateToken");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await user.findOne({ email });

  if (!userExists) return res.status(401).json("Incorrect email address !");

  const matchingPassword = await bcrypt.compare(password, userExists.password);

  if (!matchingPassword) return res.status(401).json("Password is incoreect");

  const token = generateToken(userExists._doc._id);

  res.status(200).json({ ...userExists._doc, token });
};

module.exports = userLogin;
