const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./utils/database");
const authRoutes = require("./routes/authRoute");
const profileRoutes = require("./routes/profileRoute");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", authRoutes);
app.use("/api/v1/user/profile", profileRoutes);

const PORT = parseInt(process.env.PORT, 10) || 8000;

connectDB()
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.error("Failed to connect to MongoDB");
    process.exit(1);
  });
