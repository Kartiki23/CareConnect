// frontend/src/utils/location.js
import axios from "axios";

const BASE = "http://localhost:3001/api/v1/location";

export const getBrowserPosition = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error("Geolocation not supported"));
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });

export const reverseGeocode = async (lat, lon) => {
  const { data } = await axios.get(`${BASE}/reverse, { params: { lat, lon } }`);
  return data; // { formattedAddress, addressLine, city, state, postalCode, country }
};

export const forwardGeocode = async (q) => {
  const { data } = await axios.get(`${BASE}/forward, { params: { q } }`);
  return data; // { lat, lon, formattedAddress }
};