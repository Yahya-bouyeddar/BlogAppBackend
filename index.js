const PORT = process.env.PORT || 5000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./src/routes_tem/auth");
const blogRoutes = require("./src/routes_tem/blogs");
require("dotenv").config();

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://yahya:Velenoverde124@cluster0.wiieb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.get('/',(req , res) => {
  res.status(200).json({
    message : "backend is running",
    environment : process.env.NODE_ENV
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;