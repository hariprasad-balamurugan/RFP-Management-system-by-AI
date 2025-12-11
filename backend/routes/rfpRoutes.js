const express = require("express");
const { createRfp, getAllRfps, getRfpById } = require("../controllers/rfpController");

const router = express.Router();

router.post("/", createRfp);
router.get("/", getAllRfps);
router.get("/:id", getRfpById);

module.exports = router;
