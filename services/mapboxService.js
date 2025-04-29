const axios = require("axios");
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

async function geocode(address) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address,
  )}.json?access_token=${MAPBOX_TOKEN}`;
  const response = await axios.get(url);
  const coords = response.data.features[0]?.geometry.coordinates;
  return coords || null;
}

module.exports = { geocode };
