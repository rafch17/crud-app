const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String
}, {
  collection: "users" // coincide con Cosmos
});

module.exports = mongoose.model("User", userSchema);
