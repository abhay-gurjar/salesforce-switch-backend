const express = require("express");
const cors = require("cors");
require("dotenv").config();

const salesforceRoutes = require("./src/routes/salesforceRoutes");
const { callback } = require("./src/controllers/salesforceController");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Salesforce Switch Backend is running");
});

app.get("/oauth/callback", callback);

app.use("/api", salesforceRoutes);

module.exports = app;
