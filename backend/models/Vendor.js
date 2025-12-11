const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  company: String,
  specialization: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Vendor", VendorSchema);
