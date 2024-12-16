const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://jacksparrow4705:lv5ioVcApzUVeUy7@cluster0.kfbqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
};

module.exports = connectDB;
