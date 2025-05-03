const express = require("express");
const router = express.Router();
const {
  createOrder,
  getVendorOrders,
  acceptOrder,
  updateRiderLocation,
  getRiderLocation,
  getAvaliableOrders,
  getOrdersByRiderId,
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
router.get("/available", getAvaliableOrders);
router.get("/rider/:riderId", getOrdersByRiderId);
module.exports = router;
