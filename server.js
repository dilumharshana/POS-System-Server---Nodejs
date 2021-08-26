const express = require("express");
const dotenv = require("dotenv").config();

//configs
const app = express();
app.use(express.json());

//routes
const users = require("./routes/user/userRouter");

//server
app.listen(process.env.PORT || 2001, () => console.log("server started"));

app.use("/users", users);
