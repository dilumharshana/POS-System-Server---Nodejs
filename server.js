const express = require("express");
const dotenv = require("dotenv").config();

//middlewares
const notFound = require("./middlewares/errorMiddlewares/notFound/notFound");
const errHandler = require("./middlewares/errorMiddlewares/errHandler");

//configs
const app = express();
app.use(express.json());

//routes
const users = require("./routes/user/userRouter");

//server
app.listen(process.env.PORT || 2001, () => console.log("server started"));

app.use("/users", users);
app.use(notFound);
app.use(errHandler);
