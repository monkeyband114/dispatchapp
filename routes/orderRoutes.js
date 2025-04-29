const express = require("express");
const router = express.Router();
const {
  createOrder,
  getVendorOrders,
  acceptOrder,
  updateRiderLocation,
  getRiderLocation,
} = require("../controllers/orderController");

const {
  validateOrderCreation,
  validateOrderAcceptance,
  validateLocationUpdate,
} = require("../utils/validation");

router.post("/create", validateOrderCreation, createOrder);
router.get("/vendor/:vendorId", getVendorOrders);
router.post("/accept", validateOrderAcceptance, acceptOrder);
router.post("/location/update", validateLocationUpdate, updateRiderLocation);
router.get("/location/:orderId", getRiderLocation);

module.exports = router;
