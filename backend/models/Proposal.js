const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({
  rfpId: { type: mongoose.Schema.Types.ObjectId, ref: "RFP", required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  vendorEmail: { type: String, required: true },
  rawEmail: String,
  parsed: {
    price: String,
    deliveryTime: String,
    warranty: String,
    paymentTerms: String,
    additionalNotes: String,
  },
  aiScore: Number,
  aiSummary: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Proposal", ProposalSchema);
