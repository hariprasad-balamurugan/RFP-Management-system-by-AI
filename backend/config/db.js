const mongoose = require("mongoose");

async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");
    console.log("MONGO_URI from env:", process.env.MONGO_URI);

    await mongoose.connect(
      "mongodb+srv://saravanan:saro123@cluster01.daufpsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01",
      {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 5000,
      }
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.warn("Continuing without database - API will fail");
  }
}

module.exports = connectDB;
