"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Activity, AlertTriangle, TrendingUp } from "lucide-react";
import SolarChart from "@/components/SolarChart";
import CMETable from "@/components/CMETable";
import CMEMap from "@/components/CMEMap";
import CMEInsights from "@/components/CMEInsights";
import SolarWindStatus from "@/components/SolarWindStatus";
import SolarWindChartWithAnomalies from "@/components/SolarWindChartWithAnomalies";
import ApiStatusBanner from "@/components/ApiStatusBanner";

export default function Dashboard() {
  const [cmeEvents, setCmeEvents] = useState([]);
  const [solarWindData, setSolarWindData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solarWindLoading, setSolarWindLoading] = useState(true);
  const [error, setError] = useState(null);
  const [solarWindError, setSolarWindError] = useState(null);
  const [anomalyData, setAnomalyData] = useState(null);

  const fetchCMEData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cme");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setCmeEvents(data.events);

      // Check if we're using fallback data and provide a more informative message
      if (data.isFallback) {
        const reason = data.error || "NASA DONKI API unavailable";
        const source = data.source || "FALLBACK_DATA";

        if (source === "FALLBACK_RATE_LIMIT") {
          setError(`Using fallback CME data - ${reason}. Will retry shortly.`);
        } else if (source === "NASA_DONKI_CACHED") {
          setError(`Using cached CME data from ${data.cachedAt}`);
        } else {
          setError(`Using fallback CME data - ${reason}`);
        }
      } else {
        setError(null);
      }
    } catch (err) {
      console.error("Failed to fetch CME data:", err);
      setError("Failed to load CME data. Check API key and network.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSolarWindData = async () => {
    try {
      setSolarWindLoading(true);
      const response = await fetch("/api/solar-wind?source=ace&averages=true");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setSolarWindData(data);

      // Check if we're using fallback data
      if (data.isFallback) {
        setSolarWindError("Using fallback data - SWPC connection unavailable");
      } else {
        setSolarWindError(null);
      }
    } catch (err) {
      console.error("Failed to fetch solar wind data:", err);
      setSolarWindError("Failed to load solar wind data from SWPC.");
    } finally {
      setSolarWindLoading(false);
    }
  };

  useEffect(() => {
    fetchCMEData();
    fetchSolarWindData();
  }, []);

  const handleRefresh = () => {
    fetchCMEData();
    fetchSolarWindData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Solar Weather Dashboard
              </h1>
              <p className="text-gray-300">
                Real-time monitoring of solar activity and space weather
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </button>
          </div>
        </div>

        {/* API Status Banners */}
        {error && (
          <ApiStatusBanner
            message={error}
            type={error.includes("cached") ? "info" : "warning"}
          />
        )}

        {solarWindData?.isFallback && (
          <ApiStatusBanner
            message="SWPC solar wind data is temporarily unavailable. Displaying simulated data for demonstration."
            type="warning"
          />
        )}

        {/* Solar Wind Status */}
        <div className="mb-8">
          <SolarWindStatus
            data={solarWindData}
            loading={solarWindLoading}
            error={solarWindError}
          />
        </div>

        {/* Solar Wind Chart with Anomaly Detection */}
        <div className="mb-8">
          <SolarWindChartWithAnomalies
            data={solarWindData?.data || []}
            loading={solarWindLoading}
            error={solarWindError}
            anomalies={anomalyData}
            onAnalyzeAnomalies={(result, datasetType) => {
              setAnomalyData(result);
              console.log(
                `Anomalies detected in ${datasetType} dataset:`,
                result
              );
            }}
          />
        </div>

        {/* CME Events Table */}
        <div className="mb-8">
          <CMETable
            events={cmeEvents}
            loading={loading}
            error={error}
            onRefresh={handleRefresh}
          />
        </div>

        {/* Insights (Placeholder derived metrics) */}
        <div className="mb-8">
          <CMEInsights events={cmeEvents} />
        </div>

        {/* CME Map and Solar Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* CME Map */}
          <div className="lg:col-span-2">
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <CMEMap events={cmeEvents} />
            </div>
          </div>

          {/* Solar Activity Chart */}
          <div className="lg:col-span-1">
            <SolarChart />
          </div>
        </div>

        {/* Data Sources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">NASA DONKI</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Coronal Mass Ejection analysis and forecasting data
            </p>
            <div className="text-xs text-gray-500">
              Last updated: {loading ? "Loading..." : "Just now"}
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">
                SWPC Solar Wind
              </h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Real-time solar wind data from ACE and DSCOVR satellites
            </p>
            <div className="text-xs text-gray-500">
              Last updated: {solarWindLoading ? "Loading..." : "Just now"}
              {solarWindData?.isFallback && (
                <span className="text-yellow-400 ml-2">(Fallback)</span>
              )}
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Alert System</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Automated alerts for significant solar events
            </p>
            <div className="text-xs text-gray-500">Status: Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}
