const { readData, writeData } = require("../services/dbService");

exports.updateAvailability = (req, res) => {
  const { riderId, available, location } = req.body;
  const data = readData();
  const rider = data.riders.find((r) => r.id === riderId);
  if (!rider) return res.status(404).json({ error: "Rider not found." });

  rider.available = available;
  rider.location = location;
  writeData(data);
  res.status(200).json({ message: "Availability updated." });
};

exports.getAvailableRiders = (req, res) => {
  const data = readData();
  const riders = data.riders.filter((r) => r.available);
  res.status(200).json(riders);
};
