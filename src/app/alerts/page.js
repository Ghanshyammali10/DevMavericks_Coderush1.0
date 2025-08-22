"use client";

import { useState, useMemo } from "react";
import AlertCard from "@/components/AlertCard";
import Navbar from "@/components/Navbar";
import { Search, Filter, Clock, MapPin, ChevronDown, AlertTriangle, Zap, Shield, Bell } from "lucide-react";

const severityOptions = [
  { value: "all", label: "All Alerts", icon: <Filter className="w-4 h-4 mr-2" /> },
  { value: "critical", label: "Critical", icon: <AlertTriangle className="w-4 h-4 mr-2 text-red-500" /> },
  { value: "high", label: "High", icon: <Zap className="w-4 h-4 mr-2 text-orange-400" /> },
  { value: "medium", label: "Medium", icon: <Shield className="w-4 h-4 mr-2 text-yellow-400" /> },
  { value: "low", label: "Low", icon: <Shield className="w-4 h-4 mr-2 text-blue-400" /> },
];

export default function Alerts() {
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Enhanced alert data with more accurate information
  const alerts = useMemo(() => [
    {
      id: `CME-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      title: "Fast Halo CME Detected",
      description: "A full halo CME was observed by SOHO/LASCO C2 and C3 coronagraphs. Initial analysis indicates a potential Earth-directed component with significant geomagnetic storm potential.",
      severity: "critical",
      type: "CME",
      timestamp: Date.now() - 45 * 60 * 1000, // 45 minutes ago
      location: "Active Region 1234 (N15E25)",
      estimatedArrival: "36-48 hours",
      speed: "1200 ± 150 km/s",
      intensity: "G3 (Strong) to G4 (Severe) expected",
      source: "SOHO/LASCO, STEREO-A, Aditya-L1",
      kpIndex: 7,
      confidence: 0.8,
      impactAssessment: [
        "Power systems: Possible voltage control problems, some grid systems may experience voltage alarms. Transformers may experience heating.",
        "Spacecraft operations: Surface charging may occur on satellite components, increased drag on low Earth orbit satellites.",
        "Navigation: Intermittent satellite navigation (GPS) problems, including loss-of-lock and increased range error.",
        "Radio: HF radio propagation may be intermittent or fade out completely on sunlit side of Earth.",
        "Aurora: Aurora may be seen as low as 45° geomagnetic latitude."
      ],
      recommendedActions: [
        "Power grid operators: Be prepared for voltage corrections and possible transformer damage.",
        "Satellite operators: Monitor for increased surface charging and adjust operations if necessary.",
        "Airlines: Be aware of increased radiation exposure at high altitudes and high latitudes.",
        "Space agencies: Monitor radiation levels for astronauts on ISS and plan EVAs accordingly."
      ]
    },
    {
      id: `FLR-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      title: "X2.8 Solar Flare Detected",
      description: "An X2.8 (R3 - Strong) solar flare was observed from Active Region 1234. This flare was associated with a Type II radio burst and a 10cm radio burst, indicating a potential CME.",
      severity: "high",
      type: "SOLAR_FLARE",
      timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
      location: "Active Region 1234 (N15E25)",
      peakTime: new Date().toISOString(),
      xrayClass: "X2.8",
      radioBlackout: "R3 (Strong) - HF Radio: Wide area blackout of HF radio communication, loss of radio contact, and navigation signals degraded for about an hour.",
      source: "GOES-16, Aditya-L1",
      impactAssessment: [
        "Radio: Wide area blackout of HF (high frequency) radio communication for about an hour.",
        "Navigation: Degraded low-frequency navigation signals for about an hour.",
        "Satellites: Potential for limited blackout of HF radio communication on sunlit side of Earth.",
        "Aircraft: Possible degradation of HF communications on transpolar routes."
      ],
      recommendedActions: [
        "Airlines: Expect HF communication disruptions on polar routes.",
        "Maritime operations: Expect degraded HF communications on sunlit side of Earth.",
        "Emergency services: Be aware of potential communication issues.",
        "Amateur radio operators: Expect degraded conditions on HF bands."
      ]
    },
    {
      id: `SEP-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      title: "Solar Radiation Storm in Progress",
      description: "A solar radiation storm (S2 - Moderate) is in progress following an X2.8 flare from Active Region 1234. Elevated proton levels have been detected by the GOES satellites.",
      severity: "medium",
      type: "SOLAR_RADIATION_STORM",
      timestamp: Date.now() - 3 * 60 * 60 * 1000, // 3 hours ago
      location: "Active Region 1234",
      currentLevel: "S2 (Moderate)",
      peakFlux: "1.2e3 pfu (pfu = particles·s⁻¹·ster⁻¹·cm⁻²)",
      source: "GOES-16/SUVI, GOES-16/EXIS, Aditya-L1/HEL1OS",
      impactAssessment: [
        "Spacecraft: Single-event upsets, noise in imaging systems, and slight reduction of efficiency in solar panels are likely.",
        "Polar routes: Small radiation exposure risk for passengers and crew in high-flying aircraft at high latitudes.",
        "Satellite operations: May experience single-event upsets and noise in star-tracker systems.",
        "HF radio: Minor degradation of HF radio propagation through polar regions."
      ],
      recommendedActions: [
        "Airlines: Consider rerouting high-altitude flights away from polar regions.",
        "Spacecraft operators: Monitor for single-event upsets and noise in imaging systems.",
        "Astronauts: EVA activities should be evaluated for increased radiation exposure."
      ]
    },
    {
      id: `GEO-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      title: "Geomagnetic Storm Watch",
      description: "A G2 (Moderate) Geomagnetic Storm Watch is in effect for 24-48 hours from now due to the anticipated arrival of a CME associated with yesterday's M5.6 flare.",
      severity: "medium",
      type: "GEOMAGNETIC_STORM",
      timestamp: Date.now() - 6 * 60 * 60 * 1000, // 6 hours ago
      watchStart: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      watchEnd: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      expectedKp: 6,
      source: "NOAA SWPC, Aditya-L1/MAG",
      impactAssessment: [
        "Power systems: High-latitude power systems may experience voltage alarms.",
        "Spacecraft: Possible orientation irregularities; increased drag on LEO satellites.",
        "Navigation: Intermittent satellite navigation (GPS) problems possible.",
        "Aurora: Aurora may be seen as low as New York to Wisconsin to Washington state."
      ],
      recommendedActions: [
        "Power grid operators: Be prepared for possible voltage control problems.",
        "Satellite operators: Monitor for increased drag and possible orientation issues.",
        "Aurora watchers: Favorable viewing conditions possible at mid-latitudes."
      ]
    },
    {
      id: `RAD-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      title: "Radio Blackout Event",
      description: "An R1 (Minor) radio blackout occurred on the sunlit side of Earth following an M1.2 solar flare. The blackout affected primarily HF radio communications.",
      severity: "low",
      type: "RADIO_BLACKOUT",
      timestamp: Date.now() - 8 * 60 * 60 * 1000, // 8 hours ago
      location: "Active Region 1232 (S22W45)",
      blackoutLevel: "R1 (Minor)",
      affectedFrequencies: "3-30 MHz (HF)",
      duration: "Approximately 30 minutes",
      source: "GOES-16/SUVI, GOES-16/EXIS",
      impactAssessment: [
        "Radio: Weak or minor degradation of HF radio communication on sunlit side.",
        "Navigation: Low-frequency navigation signals may be degraded for brief intervals.",
        "Impact Area: Primarily over the Pacific Ocean and surrounding regions."
      ],
      recommendedActions: [
        "Maritime operations: Be aware of possible brief HF communication degradation.",
        "Aviation: Expect minor HF communication issues on polar routes.",
        "Emergency services: Be aware of potential brief communication issues."
      ]
    }
  ], []);

  const severityFilters = useMemo(() => [
    { 
      value: "all", 
      label: "All Alerts", 
      count: alerts.length,
      icon: <Filter className="w-4 h-4 mr-2" />
    },
    {
      value: "critical",
      label: "Critical",
      count: alerts.filter((a) => a.severity === "critical").length,
      icon: <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
    },
    {
      value: "high",
      label: "High",
      count: alerts.filter((a) => a.severity === "high").length,
      icon: <AlertTriangle className="w-4 h-4 mr-2 text-orange-400" />
    },
    {
      value: "medium",
      label: "Medium",
      count: alerts.filter((a) => a.severity === "medium").length,
      icon: <AlertTriangle className="w-4 h-4 mr-2 text-yellow-400" />
    },
    {
      value: "low",
      label: "Low",
      count: alerts.filter((a) => a.severity === "low").length,
      icon: <AlertTriangle className="w-4 h-4 mr-2 text-blue-400" />
    },
  ], [alerts]);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSeverity =
        selectedSeverity === "all" ||
        alert.severity.toLowerCase() === selectedSeverity.toLowerCase();
      
      const matchesSearch = searchQuery === "" ||
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (alert.location && alert.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (alert.type && alert.type.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesSeverity && matchesSearch;
    });
  }, [alerts, selectedSeverity, searchQuery]);

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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Solar Activity Alerts
            </h1>
            <p className="text-gray-400">
              Real-time monitoring of solar events and space weather alerts
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              isRefreshing
                ? 'bg-gray-700/50 border-gray-600/50 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600/20 border-blue-500/50 text-blue-400 hover:bg-blue-600/30 transition-colors'
            }`}
          >
            {isRefreshing ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Refreshing...</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh Data</span>
              </>
            )}
          </button>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search alerts by title, description, location, or type..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white placeholder-gray-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-lg hover:bg-gray-700/70 transition-colors text-sm font-medium"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
              <ChevronDown 
                className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} 
                aria-hidden="true"
              />
            </button>
          </div>
          
          {showFilters && (
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 transition-all">
              <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter by Severity
              </h3>
              <div className="flex flex-wrap gap-2">
                {severityFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedSeverity(filter.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center transition-all ${
                      selectedSeverity === filter.value
                        ? 'bg-blue-600/90 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                    }`}
                  >
                    {filter.icon}
                    {filter.label}
                    <span 
                      className={`ml-1.5 min-w-[20px] h-5 flex items-center justify-center px-1.5 rounded-full text-xs ${
                        selectedSeverity === filter.value 
                          ? 'bg-white/20' 
                          : 'bg-black/20'
                      }`}
                    >
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Alerts List */}
        <div className="space-y-6">
          {isRefreshing ? (
            // Show loading skeletons while refreshing
            Array(3).fill(0).map((_, index) => (
              <AlertCard key={`skeleton-${index}`} loading />
            ))
          ) : filteredAlerts.length > 0 ? (
            // Show filtered alerts
            filteredAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))
          ) : (
            // No alerts found
            <div className="text-center py-12 bg-gray-900/30 rounded-xl border border-dashed border-gray-700/50">
              <Bell className="w-16 h-16 text-gray-500/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No alerts found
              </h3>
              <p className="text-gray-500">
                {searchQuery || selectedSeverity !== 'all' 
                  ? 'Try adjusting your filters or search terms'
                  : 'No active alerts at the moment. Check back later for updates.'}
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
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
        <p>SolarFlux Alert System - Real-time solar activity monitoring</p>
        <p className="mt-1">Data sources: NOAA SWPC, NASA, Aditya-L1, and other space weather monitoring stations</p>
      </div>
    </footer>
  );
}
