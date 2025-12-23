const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const salesforceRoutes = require("./src/routes/salesforceRoutes");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());

app.use(
  session({
    secret: "sf-switch-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", salesforceRoutes);

module.exports = app;
