const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const salesforceRoutes = require("./src/routes/salesforceRoutes");

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    name: "sf-switch-session",
    secret: "sf-switch-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);

app.use("/", salesforceRoutes);

module.exports = app;
