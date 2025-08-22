"use client";

import { useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const TOPO_JSON =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function CMEMap({ events = [] }) {
  const markers = useMemo(() => {
    return events
      .filter(
        (e) => typeof e.latitude === "number" && typeof e.longitude === "number"
      )
      .map((e, idx) => ({
        id: `${e.time21_5 || idx}-${idx}`,
        coordinates: [e.longitude, e.latitude],
        speed: e.speed,
        time: e.time21_5,
        note: e.note,
        isMostAccurate: !!e.isMostAccurate,
      }));
  }, [events]);

  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">CME Map</h3>
        <span className="text-xs text-gray-400">react-simple-maps</span>
      </div>
      <div className="w-full h-[380px]">
        <ComposableMap
          projectionConfig={{ scale: 140 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Geographies geography={TOPO_JSON}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "#0b1220",
                      stroke: "#1f2a44",
                      strokeWidth: 0.5,
                    },
                    hover: { fill: "#111b33" },
                    pressed: { fill: "#111b33" },
                  }}
                />
              ))
            }
          </Geographies>

          {markers.map((m) => (
            <Marker key={m.id} coordinates={m.coordinates}>
              <circle
                r={m.isMostAccurate ? 4 : 3}
                fill={m.isMostAccurate ? "#f87171" : "#fb7185"}
                stroke="#ffffff55"
                strokeWidth={1}
              />
              <title>
                {`${m.time || ""}\nSpeed: ${m.speed ?? "—"} km/s\n${
                  m.note || ""
                }`}
              </title>
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </div>
  );
}
