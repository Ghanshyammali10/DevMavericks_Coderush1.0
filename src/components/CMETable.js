"use client";

import { AlertTriangle } from "lucide-react";

export default function CMETable({ events = [], loading = false, onRefresh, error }) {
  const isFallbackData = error && error.includes("fallback");
  
  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">CME Events</h3>
          <p className="text-sm text-gray-400">
            NASA DONKI CMEAnalysis {isFallbackData && "(Fallback Data)"}
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-md disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>
      
      {/* Fallback Data Warning */}
      {isFallbackData && (
        <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <p className="text-yellow-300 text-sm">
              {error}
            </p>
          </div>
        </div>
      )}

      <div className="overflow-auto rounded-lg border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-gray-300">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Date/Time</th>
              <th className="px-3 py-2 text-left font-medium">Speed (km/s)</th>
              <th className="px-3 py-2 text-left font-medium">Latitude</th>
              <th className="px-3 py-2 text-left font-medium">Longitude</th>
              <th className="px-3 py-2 text-left font-medium">Half Angle</th>
              <th className="px-3 py-2 text-left font-medium">Earth Impact</th>
              <th className="px-3 py-2 text-left font-medium">Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-gray-200">
            {events.length === 0 && !loading && (
              <tr>
                <td colSpan={7} className="px-3 py-4 text-center text-gray-400">
                  No data
                </td>
              </tr>
            )}
            {events.map((e, idx) => (
              <tr key={idx} className="hover:bg-white/5">
                <td className="px-3 py-2 whitespace-nowrap">
                  {e.time21_5 || "—"}
                </td>
                <td className="px-3 py-2">{e.speed ?? "—"}</td>
                <td className="px-3 py-2">{e.latitude ?? "—"}</td>
                <td className="px-3 py-2">{e.longitude ?? "—"}</td>
                <td className="px-3 py-2">{e.halfAngle ?? "—"}</td>
                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      e.isMostAccurate
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                    }`}
                  >
                    {e.isMostAccurate ? "Most Accurate" : "Estimate"}
                  </span>
                </td>
                <td
                  className="px-3 py-2 max-w-xs truncate"
                  title={e.note || ""}
                >
                  {e.note || ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
