"use client";

import { useState, useEffect } from "react";
import {
  Satellite,
  Activity,
  AlertTriangle,
  Zap,
  Globe,
  Clock,
  Signal,
  Database,
  Wifi,
  Shield,
  TrendingUp,
  TrendingDown,
  Radio,
} from "lucide-react";

export default function AdityaL1Monitor({ data, systemStatus, anomalies }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isConnected, setIsConnected] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return "text-red-400 bg-red-500/20 border-red-500/30";
      case "HIGH":
        return "text-orange-400 bg-orange-500/20 border-orange-500/30";
      case "MEDIUM":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
      case "LOW":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "OPERATIONAL":
        return <Signal className="w-4 h-4 text-green-400" />;
      case "NOMINAL":
        return <Shield className="w-4 h-4 text-green-400" />;
      case "WARNING":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case "CRITICAL":
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendIcon = (current, previous) => {
    if (!previous) return <Activity className="w-4 h-4 text-gray-400" />;
    return current > previous ? (
      <TrendingUp className="w-4 h-4 text-green-400" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-400" />
    );
  };

  // Format time consistently to avoid hydration issues
  const formatTime = (date) => {
    if (!isClient) return "--:--:--";
    // Use a fixed format that doesn't depend on locale settings
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md border border-slate-600/30 rounded-xl p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Satellite className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              Aditya-L1 Real-Time Monitor
            </h3>
            <p className="text-sm text-slate-300">ASPEX, SUIT & MAG Payload Data</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? "bg-green-400" : "bg-red-400"
            } animate-pulse`}
          ></div>
          <span className="text-sm text-slate-300">
            {isConnected ? "LIVE" : "OFFLINE"}
          </span>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-300">Aditya-L1 Status</span>
            {getStatusIcon(systemStatus?.adityaL1Status)}
          </div>
          <div className="text-lg font-semibold text-white truncate">
            {systemStatus?.adityaL1Status || "OPERATIONAL"}
          </div>
          <div className="text-xs text-slate-400 truncate">Spacecraft Health</div>
        </div>

        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-300">Data Latency</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-lg font-semibold text-white truncate">
            {systemStatus?.dataLatency || "~5 minutes"}
          </div>
          <div className="text-xs text-slate-400 truncate">Ground Station</div>
        </div>

        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-300">System Health</span>
            <Shield className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-lg font-semibold text-white truncate">
            {systemStatus?.systemHealth || "EXCELLENT"}
          </div>
          <div className="text-xs text-slate-400 truncate">Overall Status</div>
        </div>
      </div>

      {/* Real-time Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* ASPEX Data */}
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-5 h-5 text-blue-400" />
            <h4 className="text-lg font-semibold text-white">ASPEX Payload</h4>
            <span className="text-xs text-slate-300 bg-slate-600/50 px-2 py-1 rounded">
              SOLAR WIND
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Wind Speed</span>
              <div className="flex items-center space-x-2">
                {getTrendIcon(
                  data?.solarWind?.[data?.solarWind?.length - 1]?.windSpeed,
                  data?.solarWind?.[data?.solarWind?.length - 2]?.windSpeed
                )}
                <span className="text-lg font-semibold text-white truncate">
                  {data?.solarWind?.[data?.solarWind?.length - 1]?.windSpeed || "0"} km/s
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Density</span>
              <span className="text-white font-medium truncate">
                {data?.solarWind?.[data?.solarWind?.length - 1]?.density || "0"} particles/cm³
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Temperature</span>
              <span className="text-white font-medium truncate">
                {data?.solarWind?.[data?.solarWind?.length - 1]?.temperature || "0"} K
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Magnetic Field</span>
              <span className="text-white font-medium truncate">
                {data?.solarWind?.[data?.solarWind?.length - 1]?.magneticField || "0"} nT
              </span>
            </div>
          </div>
        </div>

        {/* MAG Data */}
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
          <div className="flex items-center space-x-2 mb-4">
            <Radio className="w-5 h-5 text-purple-400" />
            <h4 className="text-lg font-semibold text-white">MAG Payload</h4>
            <span className="text-xs text-slate-300 bg-slate-600/50 px-2 py-1 rounded">
              MAGNETOMETER
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Bx Component</span>
              <div className="flex items-center space-x-2">
                {getTrendIcon(
                  data?.magnetometer?.[data?.magnetometer?.length - 1]?.bx,
                  data?.magnetometer?.[data?.magnetometer?.length - 2]?.bx
                )}
                <span className="text-lg font-semibold text-white truncate">
                  {data?.magnetometer?.[data?.magnetometer?.length - 1]?.bx || "0"} nT
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">By Component</span>
              <span className="text-white font-medium truncate">
                {data?.magnetometer?.[data?.magnetometer?.length - 1]?.by || "0"} nT
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Bz Component</span>
              <span className="text-white font-medium truncate">
                {data?.magnetometer?.[data?.magnetometer?.length - 1]?.bz || "0"} nT
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Total Field</span>
              <span className="text-white font-medium truncate">
                {data?.magnetometer?.[data?.magnetometer?.length - 1]?.totalField || "0"} nT
              </span>
            </div>
          </div>
        </div>

        {/* SUIT Data */}
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-5 h-5 text-green-400" />
            <h4 className="text-lg font-semibold text-white">SUIT Payload</h4>
            <span className="text-xs text-slate-300 bg-slate-600/50 px-2 py-1 rounded">
              IMAGING
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Particle Flux</span>
              <div className="flex items-center space-x-2">
                {getTrendIcon(
                  data?.particleFlux?.[data?.particleFlux?.length - 1]?.particleFlux,
                  data?.particleFlux?.[data?.particleFlux?.length - 2]?.particleFlux
                )}
                <span className="text-lg font-semibold text-white truncate">
                  {data?.particleFlux?.[data?.particleFlux?.length - 1]?.particleFlux || "0"} p/cm²/s
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Energy Range</span>
              <span className="text-white font-medium truncate">
                {data?.particleFlux?.[data?.particleFlux?.length - 1]?.energyRange || "1-10 MeV"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Background</span>
              <span className="text-white font-medium truncate">
                {data?.particleFlux?.[data?.particleFlux?.length - 1]?.background || "0"} p/cm²/s
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Detector</span>
              <span className="text-white font-medium truncate">
                {data?.particleFlux?.[data?.particleFlux?.length - 1]?.detector || "ASPEX_PARTICLE_DETECTOR"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Anomalies */}
      {anomalies && anomalies.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <h4 className="text-lg font-semibold text-white">
              Active Anomalies
            </h4>
            <span className="text-xs text-slate-300 bg-orange-500/20 px-2 py-1 rounded border border-orange-500/30">
              {anomalies.length} detected
            </span>
          </div>

          <div className="space-y-3">
            {anomalies.map((anomaly, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getSeverityColor(
                  anomaly.severity
                )}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{anomaly.type}</span>
                  <span className="text-xs opacity-75">{anomaly.severity}</span>
                </div>
                <p className="text-sm mb-2 truncate">{anomaly.description}</p>
                <div className="flex items-center justify-between text-xs opacity-75">
                  <span className="truncate">Value: {anomaly.value}</span>
                  <span className="truncate">Threshold: {anomaly.threshold}</span>
                  <span className="truncate">Source: {anomaly.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ground Station Status */}
      <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
        <div className="flex items-center space-x-2 mb-4">
          <Database className="w-5 h-5 text-purple-400" />
          <h4 className="text-lg font-semibold text-white">
            Ground Station Status
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systemStatus?.groundStations?.map((station, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-600/20 rounded-lg"
            >
              <div>
                <div className="font-medium text-white truncate">{station.name}</div>
                <div className="text-sm text-slate-300 truncate">
                  Quality: {station.dataQuality}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(station.status)}
                <span className="text-sm text-slate-300 truncate">{station.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-600/30">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="truncate">Last Update: {formatTime(currentTime)}</span>
          <span className="truncate">Data Source: ISRO Ground Stations</span>
        </div>
      </div>
    </div>
  );
}
