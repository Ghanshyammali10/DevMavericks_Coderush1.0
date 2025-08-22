"use client";

import { AlertTriangle, Zap, Shield, Activity } from "lucide-react";

export default function AlertCard({ alert }) {
  const getAlertIcon = (type) => {
    switch (type) {
      case "EXTREME_WIND_SPEED":
      case "HIGH_WIND_SPEED":
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case "EXTREME_PARTICLE_FLUX":
      case "HIGH_PARTICLE_FLUX":
        return <Shield className="w-5 h-5 text-red-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-orange-400" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return "border-red-500/50 bg-red-500/10 text-red-400";
      case "HIGH":
        return "border-orange-500/50 bg-orange-500/10 text-orange-400";
      case "MEDIUM":
        return "border-yellow-500/50 bg-yellow-500/10 text-yellow-400";
      case "LOW":
        return "border-blue-500/50 bg-blue-500/10 text-blue-400";
      default:
        return "border-gray-500/50 bg-gray-500/10 text-gray-400";
    }
  };

  const getSeverityBadgeColor = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-500/20 border-red-500/30 text-red-400";
      case "HIGH":
        return "bg-orange-500/20 border-orange-500/30 text-orange-400";
      case "MEDIUM":
        return "bg-yellow-500/20 border-yellow-500/30 text-yellow-400";
      case "LOW":
        return "bg-blue-500/20 border-blue-500/30 text-blue-400";
      default:
        return "bg-gray-500/20 border-gray-500/30 text-gray-400";
    }
  };

  const formatTimeAgo = (timestamp) => {
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

  const getAlertTitle = (type) => {
    switch (type) {
      case "EXTREME_WIND_SPEED":
        return "Extreme Solar Wind Speed";
      case "HIGH_WIND_SPEED":
        return "High Solar Wind Speed";
      case "EXTREME_PARTICLE_FLUX":
        return "Extreme Particle Flux";
      case "HIGH_PARTICLE_FLUX":
        return "High Particle Flux";
      default:
        return "System Alert";
    }
  };

  const getRecommendation = (type, severity) => {
    if (severity === "CRITICAL") {
      switch (type) {
        case "EXTREME_WIND_SPEED":
          return "Immediate satellite protection protocols required. Consider orbital adjustments.";
        case "EXTREME_PARTICLE_FLUX":
          return "Activate radiation shielding. Monitor astronaut safety protocols.";
        default:
          return "Immediate action required. Follow emergency protocols.";
      }
    } else if (severity === "HIGH") {
      switch (type) {
        case "HIGH_WIND_SPEED":
          return "Enhanced monitoring recommended. Prepare for potential CME impact.";
        case "HIGH_PARTICLE_FLUX":
          return "Monitor radiation levels. Consider protective measures.";
        default:
          return "Enhanced monitoring recommended.";
      }
    } else {
      return "Continue monitoring. No immediate action required.";
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {getAlertIcon(alert.type)}
          <div>
            <h4 className="font-semibold text-white">
              {getAlertTitle(alert.type)}
            </h4>
            <p className="text-sm text-slate-300">{alert.description}</p>
          </div>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded border ${getSeverityBadgeColor(
            alert.severity
          )}`}
        >
          {alert.severity}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
        <div>
          <span className="text-slate-400">Value:</span>
          <span className="text-white font-medium ml-2">{alert.value}</span>
        </div>
        <div>
          <span className="text-slate-400">Threshold:</span>
          <span className="text-white font-medium ml-2">{alert.threshold}</span>
        </div>
        <div>
          <span className="text-slate-400">Source:</span>
          <span className="text-white font-medium ml-2">{alert.source}</span>
        </div>
        <div>
          <span className="text-slate-400">Time:</span>
          <span className="text-white font-medium ml-2">
            {formatTimeAgo(alert.timestamp)}
          </span>
        </div>
      </div>

      <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
        <div className="flex items-start space-x-2">
          <Activity className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <span className="text-sm font-medium text-blue-400">
              Recommendation:
            </span>
            <p className="text-sm text-slate-200 mt-1">
              {getRecommendation(alert.type, alert.severity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
