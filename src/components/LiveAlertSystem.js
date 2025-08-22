"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  AlertTriangle,
  Satellite,
  Zap,
  Globe,
  Clock,
  Shield,
  Activity,
  TrendingUp,
  Radio,
  Database,
  Wifi,
} from "lucide-react";

export default function LiveAlertSystem({ alerts, cmeEvents, systemStatus }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [alertHistory, setAlertHistory] = useState([]);
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

  useEffect(() => {
    if (alerts && alerts.length > 0) {
      setActiveAlerts(alerts);
      setAlertHistory((prev) => [...alerts, ...prev].slice(0, 50)); // Keep last 50 alerts
    }
  }, [alerts]);

  const getAlertIcon = (type) => {
    switch (type) {
      case "CME_DETECTION":
        return <Globe className="w-5 h-5 text-blue-400" />;
      case "SOLAR_FLARE":
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case "RADIATION_STORM":
        return <Shield className="w-5 h-5 text-red-400" />;
      case "SYSTEM_ALERT":
        return <Activity className="w-5 h-5 text-purple-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return "border-red-500/50 bg-red-500/10";
      case "HIGH":
        return "border-orange-500/50 bg-orange-500/10";
      case "MEDIUM":
        return "border-yellow-500/50 bg-yellow-500/10";
      case "LOW":
        return "border-blue-500/50 bg-blue-500/10";
      default:
        return "border-gray-500/50 bg-gray-500/10";
    }
  };

  const getSeverityTextColor = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return "text-red-400";
      case "HIGH":
        return "text-orange-400";
      case "MEDIUM":
        return "text-yellow-400";
      case "LOW":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  const formatTimeAgo = (timestamp) => {
    if (!isClient) return "Just now";
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffMs = now - alertTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    // Use a fixed format that doesn't depend on locale settings
    const month = alertTime.getMonth() + 1;
    const day = alertTime.getDate();
    const year = alertTime.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const getCMEClassificationColor = (classification) => {
    if (classification.includes("EXTREME")) return "text-red-400";
    if (classification.includes("HIGH")) return "text-orange-400";
    if (classification.includes("MEDIUM")) return "text-yellow-400";
    return "text-blue-400";
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
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              Live Alert System
            </h3>
            <p className="text-sm text-slate-300">
              Real-time CME Detection & Notifications
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-300">LIVE</span>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30 text-center">
          <div className="text-2xl font-bold text-white">
            {activeAlerts.length}
          </div>
          <div className="text-xs text-slate-300">Active Alerts</div>
        </div>
        <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30 text-center">
          <div className="text-2xl font-bold text-white">
            {cmeEvents?.length || 0}
          </div>
          <div className="text-xs text-slate-300">CME Events</div>
        </div>
        <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30 text-center">
          <div className="text-2xl font-bold text-green-400">
            {systemStatus?.adityaL1Status || "OPERATIONAL"}
          </div>
          <div className="text-xs text-slate-300">Spacecraft</div>
        </div>
        <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30 text-center">
          <div className="text-2xl font-bold text-blue-400">
            {systemStatus?.dataLatency || "~5m"}
          </div>
          <div className="text-xs text-slate-300">Latency</div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-400" />
          <h4 className="text-lg font-semibold text-white">Active Alerts</h4>
          <span className="text-xs text-slate-300 bg-orange-500/20 px-2 py-1 rounded border border-orange-500/30">
            {activeAlerts.length} critical
          </span>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {activeAlerts.length > 0 ? (
            activeAlerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getSeverityColor(
                  alert.severity
                )}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getAlertIcon(alert.type)}
                    <span className="font-semibold text-white">
                      {alert.type}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${getSeverityTextColor(
                      alert.severity
                    )} bg-slate-700/50`}
                  >
                    {alert.severity}
                  </span>
                </div>
                <p className="text-sm text-slate-200 mb-2 truncate">
                  {alert.description}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate">Source: {alert.source}</span>
                  <span className="truncate">
                    {formatTimeAgo(alert.timestamp)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-400">
              <Shield className="w-12 h-12 mx-auto mb-2 text-green-400" />
              <p>All systems operational</p>
              <p className="text-xs">No active alerts</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent CME Events */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Globe className="w-5 h-5 text-blue-400" />
          <h4 className="text-lg font-semibold text-white">
            Recent CME Events
          </h4>
          <span className="text-xs text-slate-300 bg-blue-500/20 px-2 py-1 rounded border border-blue-500/30">
            {cmeEvents?.length || 0} detected
          </span>
        </div>

        <div className="space-y-3 max-h-48 overflow-y-auto">
          {cmeEvents && cmeEvents.length > 0 ? (
            cmeEvents.slice(0, 5).map((cme, index) => (
              <div
                key={index}
                className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white truncate">
                    {cme.id}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${getCMEClassificationColor(
                      cme.classification
                    )} bg-slate-600/50 truncate`}
                  >
                    {cme.intensity}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-2">
                  <div className="truncate">Speed: {cme.speed} km/s</div>
                  <div className="truncate">Angle: {cme.halfAngle}°</div>
                  <div className="truncate">
                    Confidence: {Math.round(cme.confidence * 100)}%
                  </div>
                  <div className="truncate">
                    Earth Impact: {cme.earthImpact ? "Yes" : "No"}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate">Source: {cme.source}</span>
                  <span className="truncate">
                    {formatTimeAgo(cme.detectionTime)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-slate-400">
              <Satellite className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">No CME events detected</p>
            </div>
          )}
        </div>
      </div>

      {/* Ground Station Communications */}
      <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
        <div className="flex items-center space-x-2 mb-4">
          <Radio className="w-5 h-5 text-purple-400" />
          <h4 className="text-lg font-semibold text-white">
            Ground Station Communications
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systemStatus?.groundStations?.map((station, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-600/20 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4 text-green-400" />
                <div>
                  <div className="font-medium text-white truncate">
                    {station.name}
                  </div>
                  <div className="text-xs text-slate-300 truncate">
                    Quality: {station.dataQuality}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-green-400 truncate">
                  {station.status}
                </div>
                <div className="text-xs text-slate-400 truncate">
                  {formatTimeAgo(station.lastUpdate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-600/30">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Last Update: {formatTime(currentTime)}</span>
          <span>Alert System: OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
}
