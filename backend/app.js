// app.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./database/database");
require("dotenv").config();

const app = express();

connectDB();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Routes
const userRoute = require("./routes/userRoute");
const projectRoute = require("./routes/projectRoutes");
const aiRoute = require("./routes/generateCodeROute");

app.use("/api/v1/user", userRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/ai", aiRoute);

module.exports = app;
