const mongoose = require("mongoose");

const RfpSchema = new mongoose.Schema({
  title: String,
  buyerText: String,
  parsed: {
    items: [{
      name: String,
      quantity: Number,
      specifications: String,
    }],
    budget: String,
    deliveryTimeline: String,
    paymentTerms: String,
    warranty: String,
    additionalRequirements: String,
  },
  html: String,
  vendorsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }],
  status: { type: String, default: "draft" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RFP", RfpSchema);
