function validateRegistration(req, res, next) {
  const { name, email, password, type } = req.body;
  if (!name || !email || !password || !type)
    return res.status(400).json({ error: "All fields are required." });

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
    return res.status(400).json({ error: "Invalid email format." });

  if (!["vendor", "rider"].includes(type))
    return res.status(400).json({ error: "Type must be 'vendor' or 'rider'." });

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required." });
  next();
}

function validateOrderCreation(req, res, next) {
  const { vendorId, pickup, delivery, recipient, package: pkg } = req.body;
  if (!vendorId || !pickup || !delivery || !recipient || !pkg)
    return res.status(400).json({ error: "All order fields are required." });
  next();
}

function validateOrderAcceptance(req, res, next) {
  const { riderId, orderId } = req.body;
  if (!riderId || !orderId)
    return res.status(400).json({ error: "riderId and orderId are required." });
  next();
}

function validateLocationUpdate(req, res, next) {
  const { riderId, orderId, location } = req.body;
  if (
    !riderId ||
    !orderId ||
    !location ||
    typeof location.latitude !== "number" ||
    typeof location.longitude !== "number"
  )
    return res
      .status(400)
      .json({ error: "Valid riderId, orderId, and location are required." });
  next();
}

function validateAvailabilityUpdate(req, res, next) {
  const { riderId, available, location } = req.body;
  if (!riderId || typeof available !== "boolean" || !location)
    return res.status(400).json({
      error: "Valid riderId, availability status, and location required.",
    });

  if (
    typeof location.latitude !== "number" ||
    typeof location.longitude !== "number"
  )
    return res
      .status(400)
      .json({ error: "Location must include valid latitude and longitude." });

  next();
}

module.exports = {
  validateRegistration,
  validateLogin,
  validateOrderCreation,
  validateOrderAcceptance,
  validateLocationUpdate,
  validateAvailabilityUpdate,
};
