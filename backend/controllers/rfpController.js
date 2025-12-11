const RFP = require("../models/RFP");
const Vendor = require("../models/Vendor");
const { parseRfpWithAI } = require("../utils/aiService");
const { renderRfp } = require("../utils/renderRfp");
const { sendRfpEmail } = require("../utils/sendEmail");

exports.createRfp = async (req, res) => {
  try {
    const { buyerText, vendorIds } = req.body;
    if (!buyerText) return res.status(400).json({ error: "buyerText required" });

    const parsed = await parseRfpWithAI(buyerText);
    const html = renderRfp(parsed);

    const rfp = await RFP.create({
      title: parsed.title,
      buyerText,
      parsed,
      html,
      vendorsSent: vendorIds || [],
      status: "draft",
    });

    if (vendorIds?.length) {
      const vendors = await Vendor.find({ _id: { $in: vendorIds } });
      const emails = vendors.map(v => v.email);
      
      if (emails.length > 0) {
        await sendRfpEmail(emails, parsed.title, html, rfp._id);
        rfp.status = "sent";
        await rfp.save();
      }
    }

    res.json({ rfp, parsed, html });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRfps = async (req, res) => {
  try {
    const rfps = await RFP.find().populate("vendorsSent").sort({ createdAt: -1 });
    res.json(rfps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRfpById = async (req, res) => {
  try {
    const rfp = await RFP.findById(req.params.id).populate("vendorsSent");
    if (!rfp) return res.status(404).json({ error: "RFP not found" });
    res.json(rfp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
