"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Timeline from "@/components/Timeline";
import {
  Search,
  Calendar,
  Filter,
  Download,
  BarChart3,
  ChevronDown,
  Clock,
  MapPin,
} from "lucide-react";

export default function Archive() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Sample historical events
  const historicalEvents = [
    {
      id: 1,
      date: "2024-01-15",
      time: "14:30 UTC",
      title: "Major CME Event",
      description:
        "Large coronal mass ejection detected from active region 1234",
      severity: "high",
      location: "Solar Region 1234",
      impact: "G3 (Strong) geomagnetic storm",
      source: "Aditya-L1",
      details:
        "This CME caused significant geomagnetic disturbances affecting satellite communications and power grids in high-latitude regions.",
    },
    {
      id: 2,
      date: "2024-01-12",
      time: "09:15 UTC",
      title: "Moderate Solar Flare",
      description: "M-class solar flare followed by CME",
      severity: "medium",
      location: "Solar Region 1230",
      impact: "G2 (Moderate) geomagnetic storm",
      source: "SOHO",
      details:
        "Moderate geomagnetic storm with minor impacts on satellite operations.",
    },
    {
      id: 3,
      date: "2024-01-08",
      time: "22:45 UTC",
      title: "Minor CME Detection",
      description: "Small coronal mass ejection with minimal impact",
      severity: "low",
      location: "Solar Region 1228",
      impact: "G1 (Minor) geomagnetic storm",
      source: "STEREO-A",
      details:
        "Minor geomagnetic activity with no significant impacts reported.",
    },
    {
      id: 4,
      date: "2024-01-05",
      time: "16:20 UTC",
      title: "Critical CME Event",
      description:
        "Extreme coronal mass ejection requiring immediate attention",
      severity: "critical",
      location: "Solar Region 1225",
      impact: "G4 (Severe) geomagnetic storm",
      source: "Aditya-L1",
      details:
        "Severe geomagnetic storm causing widespread power outages and satellite communication disruptions.",
    },
    {
      id: 5,
      date: "2023-12-28",
      time: "11:30 UTC",
      title: "X-Class Solar Flare",
      description: "Extreme solar flare with significant CME",
      severity: "critical",
      location: "Solar Region 1220",
      impact: "G5 (Extreme) geomagnetic storm",
      source: "SOHO",
      details:
        "One of the most intense solar events of the year, causing widespread disruptions.",
    },
    {
      id: 6,
      date: "2023-12-20",
      time: "08:45 UTC",
      title: "Moderate CME Activity",
      description: "Multiple moderate CMEs detected",
      severity: "medium",
      location: "Solar Region 1215",
      impact: "G2 (Moderate) geomagnetic storm",
      source: "STEREO-A",
      details:
        "Series of moderate CMEs with cumulative effects on geomagnetic activity.",
    },
  ];

  const years = ["all", "2024", "2023", "2022", "2021"];
  const severities = ["all", "critical", "high", "medium", "low"];

  const filteredEvents = historicalEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear =
      selectedYear === "all" || event.date.startsWith(selectedYear);
    const matchesSeverity =
      selectedSeverity === "all" || event.severity === selectedSeverity;
    return matchesSearch && matchesYear && matchesSeverity;
  });

  const getEventStats = () => {
    const total = historicalEvents.length;
    const critical = historicalEvents.filter(
      (e) => e.severity === "critical"
    ).length;
    const high = historicalEvents.filter((e) => e.severity === "high").length;
    const medium = historicalEvents.filter(
      (e) => e.severity === "medium"
    ).length;
    const low = historicalEvents.filter((e) => e.severity === "low").length;

    return { total, critical, high, medium, low };
  };

  const stats = getEventStats();

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Historical Archive
          </h1>
          <p className="text-gray-300">
            Browse historical CME events and solar weather data
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-white mb-1">{stats.total}</p>
            <p className="text-sm text-gray-400">Total Events</p>
          </div>
          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-red-400 mb-1">
              {stats.critical}
            </p>
            <p className="text-sm text-gray-400">Critical</p>
          </div>
          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-orange-400 mb-1">
              {stats.high}
            </p>
            <p className="text-sm text-gray-400">High</p>
          </div>
          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400 mb-1">
              {stats.medium}
            </p>
            <p className="text-sm text-gray-400">Medium</p>
          </div>
          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-400 mb-1">{stats.low}</p>
            <p className="text-sm text-gray-400">Low</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search historical events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-orange-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year === "all" ? "All Years" : year}
                  </option>
                ))}
              </select>

              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-orange-500"
              >
                {severities.map((severity) => (
                  <option key={severity} value={severity}>
                    {severity === "all"
                      ? "All Severities"
                      : severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>More</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Additional Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Date Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                    <input
                      type="date"
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Source
                  </label>
                  <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500">
                    <option value="">All Sources</option>
                    <option value="aditya-l1">Aditya-L1</option>
                    <option value="soho">SOHO</option>
                    <option value="stereo-a">STEREO-A</option>
                    <option value="dscovr">DSCOVR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Impact Level
                  </label>
                  <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500">
                    <option value="">All Levels</option>
                    <option value="g5">G5 (Extreme)</option>
                    <option value="g4">G4 (Severe)</option>
                    <option value="g3">G3 (Strong)</option>
                    <option value="g2">G2 (Moderate)</option>
                    <option value="g1">G1 (Minor)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Export Options */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-300">
              Showing {filteredEvents.length} of {historicalEvents.length}{" "}
              events
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors">
              <BarChart3 className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* Timeline */}
        <Timeline events={filteredEvents} />

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No events found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
