"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  Globe,
  Satellite,
  Zap,
  TrendingUp,
  Shield,
  Database,
  Wifi,
  Radio,
  Clock,
} from "lucide-react";
import SolarChart from "@/components/SolarChart";
import SolarWindChart from "@/components/SolarWindChart";
import MagnetometerChart from "@/components/MagnetometerChart";
import CMEMap from "@/components/CMEMap";
import CMEInsights from "@/components/CMEInsights";
import CMETable from "@/components/CMETable";
import AlertCard from "@/components/AlertCard";
import AdityaL1Monitor from "@/components/AdityaL1Monitor";
import NasaApiStatus from "@/components/NasaApiStatus";
// LiveAlertSystem and ISROIntegration imports removed
import { adityaL1Simulator } from "@/lib/aditya-l1/simulator";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveData, setLiveData] = useState(null);
  const [systemStatus, setSystemStatus] = useState(null);
  const [anomalies, setAnomalies] = useState([]);
  const [cmeEvents, setCmeEvents] = useState([]);
  const [cmeLoading, setCmeLoading] = useState(false);
  const [cmeError, setCmeError] = useState(null);
  const [isSimulating, setIsSimulating] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Initialize simulator data
    const initializeData = async () => {
      const status = adityaL1Simulator.getSystemStatus();
      const historical = adityaL1Simulator.getHistoricalData();
      
      // Ensure magnetometer data is included in historical data
      if (!historical.magnetometer) {
        historical.magnetometer = [];
      }
      
      // Generate initial magnetometer data if empty
      if (historical.magnetometer.length === 0) {
        const now = Date.now();
        for (let i = 24; i >= 0; i--) {
          const timestamp = now - i * 60 * 60 * 1000;
          historical.magnetometer.push(adityaL1Simulator.generateMagnetometerData(timestamp));
        }
      }
      
      // Initialize with simulator data first to ensure we have something to display
      console.log('Initializing with simulator data:', adityaL1Simulator.cmeEvents);
      setCmeEvents(adityaL1Simulator.cmeEvents);
      
      // Fetch real CME data from NASA DONKI API
      setCmeLoading(true);
      setCmeError(null);
      try {
        const response = await fetch('/api/cactus');
        if (response.ok) {
          const data = await response.json();
          console.log('API response:', data);
          if (data.ok && Array.isArray(data.data)) {
            console.log('Setting CME events from API:', data.data);
            setCmeEvents(data.data);
            if (data.fallback) {
              setCmeError(data.note || 'Using fallback data');
            }
          } else {
            // Fallback to simulator data if API response is not as expected
            console.log('Invalid API response, using simulator data');
            setCmeEvents(adityaL1Simulator.cmeEvents);
            setCmeError('Invalid response format: Expected an array of CME events');
          }
        } else {
          // Fallback to simulator data if API call fails
          console.log('API call failed, using simulator data');
          setCmeEvents(adityaL1Simulator.cmeEvents);
          setCmeError(`API error: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching CME data:', error);
        // Fallback to simulator data if API call throws an error
        console.log('Error fetching data, using simulator data:', adityaL1Simulator.cmeEvents);
        setCmeEvents(adityaL1Simulator.cmeEvents);
        setCmeError(`Error: ${error.message}`);
      } finally {
        setCmeLoading(false);
      }
      
      // Ensure we have at least the simulator data if API fails or returns empty
      setTimeout(() => {
        setCmeEvents(prevEvents => {
          if (!prevEvents || prevEvents.length === 0) {
            console.log('No events found, using simulator data as fallback');
            return adityaL1Simulator.cmeEvents;
          }
          return prevEvents;
        });
      }, 1000);

      setSystemStatus(status);
      setLiveData(historical);
    };

    initializeData();

    // Start real-time simulation
    const simulationInterval = setInterval(() => {
      if (isSimulating) {
        const update = adityaL1Simulator.generateRealTimeUpdate();
        setLiveData((prev) => ({
          ...prev,
          solarWind: [...(prev?.solarWind || []), update.solarWind],
          particleFlux: [...(prev?.particleFlux || []), update.particleFlux],
          magnetometer: [...(prev?.magnetometer || []), update.magnetometer],
        }));
        setAnomalies(update.anomalies);
      }
    }, 10000); // Update every 10 seconds

    // Simulate CME detection every 30 seconds
    const cmeInterval = setInterval(() => {
      if (isSimulating && Math.random() < 0.3) {
        // 30% chance
        const newCME = adityaL1Simulator.simulateCMEDetection();
        setCmeEvents((prev) => [newCME, ...prev]);
      }
    }, 30000);

    // Update current time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(simulationInterval);
      clearInterval(cmeInterval);
      clearInterval(timeInterval);
    };
  }, [isSimulating]);

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "OPERATIONAL":
        return "text-green-400";
      case "WARNING":
        return "text-yellow-400";
      case "CRITICAL":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-md border-b border-slate-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Satellite className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  SolarFlux Dashboard
                </h1>
                <p className="text-slate-300">
                  Real-time Aditya-L1 CME Detection & Monitoring
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isSimulating ? "bg-green-400" : "bg-gray-400"
                  } animate-pulse`}
                ></div>
                <span className="text-sm text-slate-300">
                  {isSimulating ? "SIMULATION ACTIVE" : "SIMULATION PAUSED"}
                </span>
              </div>
              <button
                onClick={toggleSimulation}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isSimulating
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {isSimulating ? "Pause" : "Start"} Simulation
              </button>
              <div className="text-sm text-slate-400">
                {formatTime(currentTime)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Solar Activity & CME Map */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Solar Activity & CME Map
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Solar Activity Chart */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md border border-slate-600/30 rounded-xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Solar Activity
                  </h3>
                </div>
                <SolarChart data={liveData?.solarWind || []} />
              </div>
            </div>

            {/* CME Map */}
            <div className="lg:col-span-2">
              {/* Force direct use of simulator data if cmeEvents is empty */}
              <CMEMap events={cmeEvents && cmeEvents.length > 0 ? cmeEvents : adityaL1Simulator.cmeEvents} />
              {cmeEvents && cmeEvents.length === 0 && (
                <div className="mt-2 text-xs text-amber-400">
                  Using simulator fallback data for visualization
                </div>
              )}
            </div>
          </div>


        </div>

        {/* Data Analysis & Insights */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Data Analysis & Insights
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Solar Wind Chart */}
            <div>
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md border border-slate-600/30 rounded-xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Wifi className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Solar Wind Analysis
                  </h3>
                </div>
                <SolarWindChart data={liveData?.solarWind || []} />
              </div>
            </div>

            {/* Magnetometer Chart */}
            <div>
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md border border-slate-600/30 rounded-xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Radio className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Magnetometer Data
                  </h3>
                </div>
                <MagnetometerChart data={liveData?.magnetometer || []} />
              </div>
            </div>

            {/* CME Insights */}
            <div>
              <CMEInsights events={cmeEvents} />
            </div>
          </div>
        </div>

        {/* Real-time Monitoring */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Real-time Monitoring
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Current Alerts */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md border border-slate-600/30 rounded-xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Bell className="w-5 h-5 text-orange-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Current Alerts
                  </h3>
                  <span className="text-xs text-slate-300 bg-orange-500/20 px-2 py-1 rounded border border-orange-500/30">
                    {anomalies.length} active
                  </span>
                </div>

                {anomalies.length > 0 ? (
                  <div className="space-y-3">
                    {anomalies.map((anomaly, index) => (
                      <AlertCard key={index} alert={anomaly} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <Shield className="w-12 h-12 mx-auto mb-2 text-green-400" />
                    <p>All systems operational</p>
                    <p className="text-xs">No active alerts</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md border border-slate-600/30 rounded-xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Quick Actions
                  </h3>
                </div>

                <div className="space-y-3">
                  <button className="w-full p-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 text-sm font-medium transition-colors">
                    Generate CME Report
                  </button>
                  <button className="w-full p-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-400 text-sm font-medium transition-colors">
                    Export Data
                  </button>
                  <button className="w-full p-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-purple-400 text-sm font-medium transition-colors">
                    System Diagnostics
                  </button>
                  <button className="w-full p-3 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 rounded-lg text-orange-400 text-sm font-medium transition-colors">
                    Emergency Protocol
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Aditya-L1 Real-Time Monitor */}
        <div className="mb-8">
          <AdityaL1Monitor
            data={liveData}
            systemStatus={systemStatus}
            anomalies={anomalies}
          />
        </div>

        {/* CME Events Table */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              CME Events Database
            </h2>
          </div>

          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md border border-slate-600/30 rounded-xl p-6 shadow-xl">
            <CMETable 
              events={cmeEvents} 
              loading={cmeLoading} 
              error={cmeError} 
              onRefresh={async () => {
                setCmeLoading(true);
                setCmeError(null);
                try {
                  const response = await fetch('/api/cactus', {
                    cache: 'no-store' // Ensure we get fresh data
                  });
                  if (response.ok) {
                    const data = await response.json();
                    if (data.ok && Array.isArray(data.data)) {
                      setCmeEvents(data.data);
                      if (data.fallback) {
                        setCmeError(data.note || 'Using fallback data');
                      }
                    } else {
                      // Fallback to simulator data if API response is not as expected
                      setCmeEvents(adityaL1Simulator.cmeEvents);
                      setCmeError('Invalid response format: Expected an array of CME events');
                    }
                  } else {
                    setCmeError(`API error: ${response.status}`);
                    // Fallback to simulator data
                    setCmeEvents(adityaL1Simulator.cmeEvents);
                  }
                } catch (error) {
                  console.error('Error refreshing CME data:', error);
                  setCmeError(`Error: ${error.message}`);
                  // Fallback to simulator data
                  setCmeEvents(adityaL1Simulator.cmeEvents);
                } finally {
                  setCmeLoading(false);
                }
              }}
            />
          </div>
        </div>

        {/* System Status Footer */}
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md border border-slate-600/30 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-300">System Status:</span>
                <span
                  className={`text-sm font-medium ${getStatusColor(
                    systemStatus?.systemHealth || "EXCELLENT"
                  )}`}
                >
                  {systemStatus?.systemHealth || "EXCELLENT"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">Data Latency:</span>
                <span className="text-sm font-medium text-blue-400">
                  {systemStatus?.dataLatency || "~5 minutes"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <NasaApiStatus />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleSimulation}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${isSimulating ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors`}
                >
                  {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              <span>Last Update: {formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
