const express = require("express");
const app = express();

require("dotenv").config();
require("./db/mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");

const userRouter = require("./router/userRouter");
const todoRouter = require("./router/todoRouter");

const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/task", todoRouter);

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("connected to port: ", port);
});
