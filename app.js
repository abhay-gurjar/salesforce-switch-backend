const express = require("express");
const cors = require("cors");
require("dotenv").config();

const salesforceRoutes = require("./src/routes/salesforceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", salesforceRoutes);

module.exports = app;
