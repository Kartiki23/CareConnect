// backend/src/controller/LocationController.js
// Uses Google if GOOGLE_MAPS_API_KEY is set, else falls back to OSM Nominatim.
// Requires Node 18+ for global fetch.

const googleKey = process.env.GOOGLE_MAPS_API_KEY || "";

export const reverseGeocode = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ message: "lat & lon are required" });

    let data;
    if (googleKey) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleKey}`;
      const r = await fetch(url);
      data = await r.json();
      if (!data?.results?.length) return res.status(404).json({ message: "No address found" });

      const result = data.results[0];
      const components = Object.fromEntries(
        result.address_components.flatMap(c =>
          c.types.map(t => [t, c.long_name])
        )
      );

      return res.json({
        formattedAddress: result.formatted_address,
        addressLine: `${components.route || ""} ${components.sublocality || ""}`.trim() || result.formatted_address,
        city: components.locality || components.administrative_area_level_2 || "",
        state: components.administrative_area_level_1 || "",
        postalCode: components.postal_code || "",
        country: components.country || "",
      });
    } else {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
      const r = await fetch(url, { headers: { 'Accept': 'application/json' } });
      data = await r.json();
      if (!data?.address) return res.status(404).json({ message: "No address found" });

      const a = data.address;
      return res.json({
        formattedAddress: data.display_name,
        addressLine: [a.house_number, a.road, a.neighbourhood, a.suburb].filter(Boolean).join(' '),
        city: a.city || a.town || a.village || a.county || "",
        state: a.state || "",
        postalCode: a.postcode || "",
        country: a.country || "",
      });
    }
  } catch (err) {
    console.error("reverseGeocode error:", err);
    res.status(500).json({ message: "Reverse geocode failed" });
  }
};

export const forwardGeocode = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "q (query) is required" });

    if (googleKey) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(q)}&key=${googleKey}`;
      const r = await fetch(url);
      const data = await r.json();
      if (!data?.results?.length) return res.status(404).json({ message: "No results" });

      const result = data.results[0];
      const { lat, lng } = result.geometry.location;
      return res.json({ lat, lon: lng, formattedAddress: result.formatted_address });
    } else {
      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}`;
      const r = await fetch(url, { headers: { 'Accept': 'application/json' } });
      const list = await r.json();
      if (!list?.length) return res.status(404).json({ message: "No results" });

      const top = list[0];
      return res.json({ lat: Number(top.lat), lon: Number(top.lon), formattedAddress: top.display_name });
    }
  } catch (err) {
    console.error("forwardGeocode error:", err);
    res.status(500).json({ message: "Forward geocode failed" });
  }
};