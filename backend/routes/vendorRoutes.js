const express = require("express");
const {
  createVendor,
  getAllVendors,
  updateVendor,
  deleteVendor,
} = require("../controllers/vendorController");

const router = express.Router();

router.post("/", createVendor);
router.get("/", getAllVendors);
router.put("/:id", updateVendor);
router.delete("/:id", deleteVendor);

module.exports = router;
