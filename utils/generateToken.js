const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });

module.exports = generateToken;
