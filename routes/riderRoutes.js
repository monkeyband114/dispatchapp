const express = require("express");
const router = express.Router();
const {
  updateAvailability,
  getAvailableRiders,
  getOrdersByRiderId,
} = require("../controllers/riderController");
const { validateAvailabilityUpdate } = require("../utils/validation");

router.post("/availability", validateAvailabilityUpdate, updateAvailability);
router.get("/available", getAvailableRiders);

module.exports = router;
