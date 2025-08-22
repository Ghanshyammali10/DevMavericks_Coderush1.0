"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Clock,
  MapPin,
  Zap,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Bell,
} from "lucide-react";

export default function AlertCard({ alert }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const severityColors = {
    low: {
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
      icon: "text-yellow-400",
      glow: "glow-yellow",
    },
    medium: {
      bg: "bg-orange-500/20",
      border: "border-orange-500/30",
      text: "text-orange-400",
      icon: "text-orange-400",
      glow: "glow-orange",
    },
    high: {
      bg: "bg-red-500/20",
      border: "border-red-500/30",
      text: "text-red-400",
      icon: "text-red-400",
      glow: "glow-red",
    },
    critical: {
      bg: "bg-red-600/30",
      border: "border-red-600/50",
      text: "text-red-300",
      icon: "text-red-300",
      glow: "glow-red",
    },
  };

  const severity = alert?.severity || "medium";
  const colors = severityColors[severity];

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical":
        return <Zap className="w-5 h-5" />;
      case "high":
        return <AlertTriangle className="w-5 h-5" />;
      case "medium":
        return <AlertTriangle className="w-5 h-5" />;
      case "low":
        return <Bell className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <div
      className={`${colors.bg} ${colors.border} border rounded-lg p-4 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] ${colors.glow}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div
            className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center ${colors.icon}`}
          >
            {getSeverityIcon(severity)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-white truncate">
                {alert?.title || "CME Detection Alert"}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${colors.bg} ${colors.text} uppercase tracking-wide`}
              >
                {severity}
              </span>
            </div>

            <p className="text-gray-300 text-sm mb-2 line-clamp-2">
              {alert?.description ||
                "A Coronal Mass Ejection has been detected and is heading towards Earth."}
            </p>

            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{formatTime(alert?.timestamp || Date.now())}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{alert?.location || "Solar Region 1234"}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Estimated Arrival</p>
              <p className="text-white font-medium">
                {alert?.estimatedArrival || "24-48 hours"}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Speed</p>
              <p className="text-white font-medium">
                {alert?.speed || "800 km/s"}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Intensity</p>
              <p className="text-white font-medium">
                {alert?.intensity || "G2 (Moderate)"}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Source</p>
              <p className="text-white font-medium">
                {alert?.source || "Aditya-L1"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-2">Impact Assessment</p>
            <p className="text-white text-sm">
              {alert?.impactAssessment ||
                "This CME may cause moderate geomagnetic storms. Satellite operators should monitor for potential communication disruptions. Power grid operators should be aware of possible voltage fluctuations."}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Alert ID:</span>
              <span className="text-xs text-white font-mono">
                {alert?.id || "CME-2024-001"}
              </span>
            </div>
            <button className="flex items-center space-x-1 px-3 py-1 bg-white/10 rounded-md text-sm text-white hover:bg-white/20 transition-colors">
              <ExternalLink className="w-3 h-3" />
              <span>Details</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
