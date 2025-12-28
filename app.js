const express = require("express");
const cors = require("cors");
require("dotenv").config();

const salesforceRoutes = require("./src/routes/salesforceRoutes");

const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Salesforce Switch Backend is running");
});

app.use("/api", salesforceRoutes);

module.exports = app;
