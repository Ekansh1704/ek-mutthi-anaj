// src/components/PuneMap.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet's default marker icon paths don't resolve correctly with most
// bundlers, so point them at a CDN instead. This runs once, only when this
// chunk actually loads (i.e. only when a map is rendered).
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

/**
 * Renders the Pune collections map. Kept as its own component (rather than
 * inline in Dashboard.jsx) so it can be React.lazy()-loaded — leaflet is a
 * sizeable dependency that shouldn't have to download before the rest of
 * the dashboard (stats, charts) can paint.
 */
const PuneMap = ({ markers = [], center, zoom = 12, formatKg }) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m, idx) => (
        <Marker key={idx} position={[m.lat, m.lng]}>
          <Popup>
            <div className="text-sm">
              <strong>{m.label}</strong>
              <div>{formatKg(m.kg)}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default PuneMap;
