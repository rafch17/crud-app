const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tls: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log("MongoDB Atlas conectado ✔");
  } catch (error) {
    console.error("Error MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
