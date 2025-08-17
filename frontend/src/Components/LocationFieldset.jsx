import React, { useState } from "react";
import { getBrowserPosition, reverseGeocode } from "../../../Backend/src/config/Location";

export default function LocationFieldset({ address, setAddress, lat, setLat, lng, setLng }) {
  const [busy, setBusy] = useState(false);

  const detect = async () => {
    try {
      setBusy(true);
      const { lat, lng } = await getBrowserPosition();
      setLat(String(lat));
      setLng(String(lng));
      try {
        const human = await reverseGeocode(lat, lng);
        setAddress(human);
      } catch {
        // ignore reverse geocode error; coords are enough
      }
    } catch (e) {
      alert(e.message || "Unable to get location");
    } finally {
      setBusy(false);
    }
  };

  return (
    <fieldset className="border rounded-lg p-4 space-y-2">
      <legend className="px-1 font-semibold text-gray-700">Location</legend>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={detect}
          disabled={busy}
          className="bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-50"
        >
          {busy ? "Detecting..." : "Use My Location"}
        </button>
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Address (auto-filled, editable)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      {/* <div className="grid grid-cols-2 gap-2">
        <input
          className="border rounded px-3 py-2"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
      </div> */}
      <p className="text-xs text-gray-500">
        Tip: Click “Use My Location” to auto-fill GPS and address (you can edit).
      </p>
    </fieldset>
  );
}