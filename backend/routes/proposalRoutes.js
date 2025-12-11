const express = require("express");
const {
  createProposal,
  getProposalsByRfp,
  compareProposalsForRfp,
} = require("../controllers/proposalController");

const router = express.Router();

router.post("/", createProposal);
router.get("/rfp/:rfpId", getProposalsByRfp);
router.get("/rfp/:rfpId/compare", compareProposalsForRfp);

module.exports = router;
