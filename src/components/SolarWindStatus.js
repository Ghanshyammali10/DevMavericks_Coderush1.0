"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Activity, Thermometer, Zap, Gauge } from "lucide-react";

export default function SolarWindStatus({
  data = null,
  loading = false,
  error = null,
}) {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    if (data?.latest) {
      setLastUpdate(new Date());
    }
  }, [data]);

  const getStatusColor = (value, thresholds) => {
    if (value >= thresholds.high) return "text-red-400";
    if (value >= thresholds.medium) return "text-yellow-400";
    return "text-green-400";
  };

  const getStatusIcon = (value, thresholds) => {
    if (value >= thresholds.high) return "🔴";
    if (value >= thresholds.medium) return "🟡";
    return "🟢";
  };

  if (loading) {
    return (
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-white/10 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-white/5 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const isFallbackData = error && (error.includes("fallback") || error.includes("Fallback"));
    return (
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <div className={`text-center ${isFallbackData ? "text-yellow-400" : "text-red-400"}`}>
          <Activity className={`w-8 h-8 mx-auto mb-2 ${isFallbackData ? "text-yellow-400" : "text-red-400"}`} />
          <p className="text-lg font-semibold mb-2 truncate">
            {isFallbackData ? "Using Fallback Data" : "Solar Wind Data Unavailable"}
          </p>
          <p className="text-sm break-words overflow-hidden max-h-20">{error}</p>
          {isFallbackData && error.includes("SWPC") && (
            <p className="text-xs text-gray-300 mt-2 truncate">
              Displaying simulated data for demonstration purposes
            </p>
          )}
        </div>
      </div>
    );
  }

  if (!data?.latest) {
    return (
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <div className="text-gray-400 text-center">
          <Activity className="w-8 h-8 mx-auto mb-2" />
          <p className="text-lg font-semibold mb-2 truncate">No Solar Wind Data</p>
          <p className="text-sm truncate">Real-time data will appear here</p>
        </div>
      </div>
    );
  }

  const { latest, averages } = data;
  const speedColor = getStatusColor(latest.speed, {
    low: 300,
    medium: 500,
    high: 800,
  });
  const densityColor = getStatusColor(latest.density, {
    low: 1,
    medium: 10,
    high: 20,
  });
  const tempColor = getStatusColor(latest.temperature, {
    low: 50000,
    medium: 100000,
    high: 200000,
  });
  const bFieldColor = getStatusColor(latest.magneticField.bt, {
    low: 5,
    medium: 10,
    high: 20,
  });

  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Solar Wind Status
          </h3>
          <p className="text-sm text-gray-400">
            Last updated: {`${lastUpdate.getHours().toString().padStart(2, '0')}:${lastUpdate.getMinutes().toString().padStart(2, '0')}:${lastUpdate.getSeconds().toString().padStart(2, '0')}`}
          </p>
        </div>
        <RefreshCw className="w-5 h-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Solar Wind Speed */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Gauge className="w-5 h-5 text-blue-400" />
            <span className="text-2xl">
              {getStatusIcon(latest.speed, {
                low: 300,
                medium: 500,
                high: 800,
              })}
            </span>
          </div>
          <div className={speedColor}>
            <div className="text-2xl font-bold truncate">
              {Math.round(latest.speed || 0)}
            </div>
            <div className="text-xs">km/s</div>
          </div>
          <div className="text-xs text-gray-500 mt-1 truncate">
            {averages?.["1h"]
              ? `Avg: ${Math.round(averages["1h"].speed)}`
              : "No avg"}
          </div>
        </div>

        {/* Density */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5 text-green-400" />
            <span className="text-2xl">
              {getStatusIcon(latest.density, { low: 1, medium: 10, high: 20 })}
            </span>
          </div>
          <div className={densityColor}>
            <div className="text-2xl font-bold truncate">
              {Math.round(latest.density || 0)}
            </div>
            <div className="text-xs">protons/cm³</div>
          </div>
          <div className="text-xs text-gray-500 mt-1 truncate">
            {averages?.["1h"]
              ? `Avg: ${Math.round(averages["1h"].density)}`
              : "No avg"}
          </div>
        </div>

        {/* Temperature */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Thermometer className="w-5 h-5 text-orange-400" />
            <span className="text-2xl">
              {getStatusIcon(latest.temperature, {
                low: 50000,
                medium: 100000,
                high: 200000,
              })}
            </span>
          </div>
          <div className={tempColor}>
            <div className="text-2xl font-bold truncate">
              {Math.round((latest.temperature || 0) / 1000)}
            </div>
            <div className="text-xs">K (×1000)</div>
          </div>
          <div className="text-xs text-gray-500 mt-1 truncate">
            {averages?.["1h"]
              ? `Avg: ${Math.round(averages["1h"].temperature / 1000)}`
              : "No avg"}
          </div>
        </div>

        {/* Magnetic Field */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-2xl">
              {getStatusIcon(latest.magneticField.bt, {
                low: 5,
                medium: 10,
                high: 20,
              })}
            </span>
          </div>
          <div className={bFieldColor}>
            <div className="text-2xl font-bold truncate">
              {Math.round(latest.magneticField.bt || 0)}
            </div>
            <div className="text-xs">nT</div>
          </div>
          <div className="text-xs text-gray-500 mt-1 truncate">
            {averages?.["1h"]
              ? `Avg: ${Math.round(averages["1h"].bt)}`
              : "No avg"}
          </div>
        </div>
      </div>

      {/* Magnetic Field Components */}
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-white mb-3 truncate">
          Magnetic Field Components
        </h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-400 mb-1">Bx</div>
            <div className="text-lg font-mono text-blue-400 truncate">
              {latest.magneticField.bx
                ? latest.magneticField.bx.toFixed(1)
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">By</div>
            <div className="text-lg font-mono text-green-400 truncate">
              {latest.magneticField.by
                ? latest.magneticField.by.toFixed(1)
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Bz</div>
            <div className="text-lg font-mono text-red-400 truncate">
              {latest.magneticField.bz
                ? latest.magneticField.bz.toFixed(1)
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
