const { v4: uuidv4 } = require("uuid");
const { readData, writeData } = require("../services/dbService");
const { geocode } = require("../services/mapboxService");

exports.createOrder = async (req, res) => {
  const { vendorId, pickup, delivery, recipient, package } = req.body;
  const data = readData();

  const pickupCoords = await geocode(pickup);
  const deliveryCoords = await geocode(delivery);
  if (!pickupCoords || !deliveryCoords)
    return res.status(400).json({ error: "Invalid addresses." });

  const order = {
    id: uuidv4(),
    vendorId,
    pickup,
    delivery,
    recipient,
    package,
    status: "pending",
    pickupCoords,
    deliveryCoords,
    assignedRider: null,
    riderLocation: null,
  };

  data.orders.push(order);
  writeData(data);
  res.status(201).json({ message: "Order created", order });
};

exports.getVendorOrders = (req, res) => {
  const { vendorId } = req.params;
  const data = readData();
  const orders = data.orders.filter((o) => o.vendorId === vendorId);
  res.status(200).json(orders);
};

exports.acceptOrder = (req, res) => {
  const { riderId, orderId } = req.body;
  const data = readData();

  const rider = data.riders.find((r) => r.id === riderId && r.available);
  const order = data.orders.find(
    (o) => o.id === orderId && o.status === "pending",
  );
  if (!rider || !order)
    return res.status(400).json({ error: "Invalid rider or order." });

  order.status = "assigned";
  order.assignedRider = riderId;
  order.riderLocation = rider.location;
  writeData(data);
  res.status(200).json({ message: "Order accepted." });
};

exports.updateRiderLocation = (req, res) => {
  const { riderId, orderId, location } = req.body;
  const data = readData();

  const order = data.orders.find(
    (o) => o.id === orderId && o.assignedRider === riderId,
  );
  if (!order)
    return res.status(404).json({ error: "Order not found or not assigned." });

  order.riderLocation = location;
  writeData(data);
  res.status(200).json({ message: "Rider location updated." });
};

exports.getRiderLocation = (req, res) => {
  const { orderId } = req.params;
  const data = readData();
  const order = data.orders.find((o) => o.id === orderId);
  if (!order) return res.status(404).json({ error: "Order not found." });

  res.status(200).json({ location: order.riderLocation });
};
