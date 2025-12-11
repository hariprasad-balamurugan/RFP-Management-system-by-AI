const Proposal = require("../models/Proposal");
const RFP = require("../models/RFP");
const { parseProposalWithAI, compareProposals } = require("../utils/aiService");

exports.createProposal = async (req, res) => {
  try {
    const { rfpId, vendorEmail, rawEmail } = req.body;
    
    const rfp = await RFP.findById(rfpId);
    if (!rfp) return res.status(404).json({ error: "RFP not found" });

    const parsed = await parseProposalWithAI(rawEmail, rfp.parsed);
    
    const proposal = await Proposal.create({
      rfpId,
      vendorEmail,
      rawEmail,
      parsed,
    });

    res.status(201).json(proposal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProposalsByRfp = async (req, res) => {
  try {
    const proposals = await Proposal.find({ rfpId: req.params.rfpId })
      .populate("vendorId")
      .sort({ createdAt: -1 });
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.compareProposalsForRfp = async (req, res) => {
  try {
    const rfp = await RFP.findById(req.params.rfpId);
    if (!rfp) return res.status(404).json({ error: "RFP not found" });

    const proposals = await Proposal.find({ rfpId: req.params.rfpId });
    if (proposals.length === 0) {
      return res.status(400).json({ error: "No proposals to compare" });
    }

    const comparison = await compareProposals(rfp, proposals);
    
    for (const rec of comparison.recommendations) {
      const proposal = proposals.find(p => p.vendorEmail === rec.vendorEmail);
      if (proposal) {
        proposal.aiScore = rec.score;
        proposal.aiSummary = rec.summary;
        await proposal.save();
      }
    }

    res.json(comparison);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
