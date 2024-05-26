const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL);

const isConnected = mongoose.connection;

isConnected.on("connected", () =>
  console.log("MongoDB has been connected successfully!")
);

isConnected.on("error", () => console.log("Failed to connect to MongoDB!"));

module.exports = isConnected;
