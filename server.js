const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const corsOption = {
  origin: "http://localhost:3000",
};

//middlewares
const notFound = require("./middlewares/errorMiddlewares/notFound/notFound");
const errHandler = require("./middlewares/errorMiddlewares/errHandler");

//configs
const app = express();
app.use(express.json());
app.use(cors(corsOption));

//server
app.listen(process.env.PORT || 2001, () => console.log("server started"));

//routes
const users = require("./routes/users/userRouter");
const login = require("./routes/authUsers/loginRouter");

app.use("/api/users", users);
app.use("/api/login", login);

app.use(notFound);
app.use(errHandler);
