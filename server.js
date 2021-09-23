const express = require("express");
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

const port = process.env.PORT || 2001;
//server
app.listen(process.env.PORT || 2001, () => console.log(port));

//routes
const users = require("./routes/adminUsers/userRouter");
const login = require("./routes/authAdminUsers/loginRouter");
const posSystems = require("./routes/posSystems/posSystemRouter");

app.use("/api/users", users);
app.use("/api/login", login);
app.use("/api/possystems", posSystems);

app.use(notFound);
app.use(errHandler);
