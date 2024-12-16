const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./utils/database");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB()
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(() => {
    console.error("Failed to connect to MongoDB");
    process.exit(1);
  });
