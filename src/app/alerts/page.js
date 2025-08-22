"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AlertCard from "@/components/AlertCard";
import {
  Filter,
  Search,
  Bell,
  AlertTriangle,
  Zap,
  Clock,
  MapPin,
  ChevronDown,
} from "lucide-react";

export default function Alerts() {
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Sample alert data
  const alerts = [
    {
      id: "CME-2024-001",
      title: "Major CME Event Detected",
      description:
        "Large coronal mass ejection detected from active region 1234 with high intensity and potential for significant geomagnetic storms.",
      severity: "critical",
      timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
      location: "Solar Region 1234",
      estimatedArrival: "24-48 hours",
      speed: "1200 km/s",
      intensity: "G4 (Severe)",
      source: "Aditya-L1",
      impactAssessment:
        "This CME may cause severe geomagnetic storms affecting satellite communications, power grids, and GPS systems. Satellite operators should prepare for potential communication disruptions and consider protective measures.",
    },
    {
      id: "CME-2024-002",
      title: "Moderate Solar Flare Activity",
      description:
        "M-class solar flare followed by moderate CME with potential for geomagnetic disturbances.",
      severity: "high",
      timestamp: Date.now() - 4 * 60 * 60 * 1000, // 4 hours ago
      location: "Solar Region 1230",
      estimatedArrival: "36-72 hours",
      speed: "800 km/s",
      intensity: "G2 (Moderate)",
      source: "SOHO",
      impactAssessment:
        "Moderate geomagnetic storm expected. Minor impacts on satellite operations and power grids in high-latitude regions. Aurora activity likely.",
    },
    {
      id: "CME-2024-003",
      title: "Minor CME Detection",
      description: "Small coronal mass ejection with minimal impact potential.",
      severity: "medium",
      timestamp: Date.now() - 6 * 60 * 60 * 1000, // 6 hours ago
      location: "Solar Region 1228",
      estimatedArrival: "48-96 hours",
      speed: "500 km/s",
      intensity: "G1 (Minor)",
      source: "STEREO-A",
      impactAssessment:
        "Minor geomagnetic activity expected. No significant impacts on infrastructure. Possible minor aurora activity.",
    },
    {
      id: "CME-2024-004",
      title: "Solar Wind Enhancement",
      description: "Increased solar wind speed detected from coronal hole.",
      severity: "low",
      timestamp: Date.now() - 8 * 60 * 60 * 1000, // 8 hours ago
      location: "Coronal Hole",
      estimatedArrival: "12-24 hours",
      speed: "600 km/s",
      intensity: "G1 (Minor)",
      source: "DSCOVR",
      impactAssessment:
        "Minor geomagnetic activity from high-speed solar wind stream. Minimal impact on systems.",
    },
    {
      id: "CME-2024-005",
      title: "X-Class Solar Flare",
      description:
        "Extreme solar flare detected with potential for significant CME.",
      severity: "critical",
      timestamp: Date.now() - 1 * 60 * 60 * 1000, // 1 hour ago
      location: "Solar Region 1235",
      estimatedArrival: "12-36 hours",
      speed: "1500 km/s",
      intensity: "G5 (Extreme)",
      source: "Aditya-L1",
      impactAssessment:
        "Extreme geomagnetic storm possible. Widespread power outages, satellite communication disruptions, and GPS navigation issues expected. Critical infrastructure operators should implement protective measures.",
    },
  ];

  const severityFilters = [
    { value: "all", label: "All Alerts", count: alerts.length },
    {
      value: "critical",
      label: "Critical",
      count: alerts.filter((a) => a.severity === "critical").length,
    },
    {
      value: "high",
      label: "High",
      count: alerts.filter((a) => a.severity === "high").length,
    },
    {
      value: "medium",
      label: "Medium",
      count: alerts.filter((a) => a.severity === "medium").length,
    },
    {
      value: "low",
      label: "Low",
      count: alerts.filter((a) => a.severity === "low").length,
    },
  ];

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity =
      selectedSeverity === "all" || alert.severity === selectedSeverity;
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

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
        return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Alert Center</h1>
          <p className="text-gray-300">
            Monitor and manage CME alerts and solar weather warnings
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {severityFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedSeverity(filter.value)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedSeverity === filter.value
                        ? "bg-orange-500 text-white"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Alerts Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {severityFilters.slice(1).map((filter) => (
            <div
              key={filter.value}
              className="bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    filter.value === "critical"
                      ? "bg-red-500/20"
                      : filter.value === "high"
                      ? "bg-orange-500/20"
                      : filter.value === "medium"
                      ? "bg-yellow-500/20"
                      : "bg-blue-500/20"
                  }`}
                >
                  {getSeverityIcon(filter.value)}
                </div>
                <div>
                  <p className="text-white font-medium">{filter.label}</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {filter.count}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-6">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))
          ) : (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No alerts found
              </h3>
              <p className="text-gray-400">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}
        </div>

        {/* Alert Statistics */}
        <div className="mt-12 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Alert Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-400 mb-2">
                {alerts.length}
              </p>
              <p className="text-gray-400">Total Alerts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-400 mb-2">
                {
                  alerts.filter(
                    (a) => a.severity === "critical" || a.severity === "high"
                  ).length
                }
              </p>
              <p className="text-gray-400">High Priority</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-400 mb-2">
                {Math.round(
                  (alerts.filter((a) => a.severity === "low").length /
                    alerts.length) *
                    100
                )}
                %
              </p>
              <p className="text-gray-400">Low Risk</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
