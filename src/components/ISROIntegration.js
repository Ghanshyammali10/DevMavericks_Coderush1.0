"use client";

import { useState, useEffect } from "react";
import {
  Satellite,
  Radio,
  Database,
  Wifi,
  Activity,
  Clock,
  Signal,
  Shield,
  TrendingUp,
  Globe,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function ISROIntegration({ systemStatus, dataFlow }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dataFlowStatus, setDataFlowStatus] = useState({
    adityaL1: "OPERATIONAL",
    deepSpaceNetwork: "OPERATIONAL",
    groundStation1: "OPERATIONAL",
    groundStation2: "OPERATIONAL",
    dataProcessing: "OPERATIONAL",
    dashboard: "OPERATIONAL",
  });
  const [transmissionLog, setTransmissionLog] = useState([]);
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
    // Simulate data flow updates
    const interval = setInterval(() => {
      const newLog = {
        timestamp: new Date().toISOString(),
        source: "Aditya-L1",
        destination: "Ground Station 01",
        dataType: "ASPEX_SOLAR_WIND",
        status: "TRANSMITTED",
        latency: Math.round(2 + Math.random() * 3) + " minutes",
      };

      setTransmissionLog((prev) => [newLog, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "OPERATIONAL":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "WARNING":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case "CRITICAL":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
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

  const getDataFlowStep = (step) => {
    const steps = [
      {
        name: "Aditya-L1 Spacecraft",
        description: "L1 Lagrange Point",
        icon: <Satellite className="w-6 h-6 text-blue-400" />,
        status: dataFlowStatus.adityaL1,
      },
      {
        name: "Deep Space Network",
        description: "Interplanetary Communication",
        icon: <Radio className="w-6 h-6 text-purple-400" />,
        status: dataFlowStatus.deepSpaceNetwork,
      },
      {
        name: "ISRO Ground Station 01",
        description: "Primary Data Reception",
        icon: <Wifi className="w-6 h-6 text-green-400" />,
        status: dataFlowStatus.groundStation1,
      },
      {
        name: "ISRO Ground Station 02",
        description: "Backup Reception",
        icon: <Wifi className="w-6 h-6 text-green-400" />,
        status: dataFlowStatus.groundStation2,
      },
      {
        name: "Data Processing Center",
        description: "Real-time Analysis",
        icon: <Database className="w-6 h-6 text-orange-400" />,
        status: dataFlowStatus.dataProcessing,
      },
      {
        name: "SolarFlux Dashboard",
        description: "User Interface",
        icon: <Globe className="w-6 h-6 text-indigo-400" />,
        status: dataFlowStatus.dashboard,
      },
    ];

    return steps[step];
  };

  const getTransmissionStatusIcon = (status) => {
    switch (status) {
      case "TRANSMITTED":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "PROCESSING":
        return <Activity className="w-4 h-4 text-blue-400" />;
      case "FAILED":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  // Format time consistently to avoid hydration issues
  const formatTime = (date) => {
    if (!isClient) return "--:--:--";
    // Use a fixed format that doesn't depend on locale settings
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md border border-slate-600/30 rounded-xl p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Satellite className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              ISRO Integration
            </h3>
            <p className="text-sm text-slate-300">
              Aditya-L1 → Ground Stations → Dashboard
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-300">INTEGRATED</span>
        </div>
      </div>

      {/* Data Flow Pipeline */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <h4 className="text-lg font-semibold text-white">
            Data Flow Pipeline
          </h4>
        </div>

        <div className="space-y-4">
          {[0, 1, 2, 3, 4, 5].map((step) => {
            const stepData = getDataFlowStep(step);
            return (
              <div key={step} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center border border-slate-600/30">
                  {stepData.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-white">
                        {stepData.name}
                      </h5>
                      <p className="text-sm text-slate-300">
                        {stepData.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(stepData.status)}
                      <span
                        className={`text-sm ${getStatusColor(stepData.status)}`}
                      >
                        {stepData.status}
                      </span>
                    </div>
                  </div>
                </div>
                {step < 5 && (
                  <div className="w-8 h-0.5 bg-gradient-to-r from-slate-600 to-slate-400"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Transmission Log */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="w-5 h-5 text-purple-400" />
          <h4 className="text-lg font-semibold text-white">
            Real-time Transmission Log
          </h4>
          <span className="text-xs text-slate-300 bg-purple-500/20 px-2 py-1 rounded border border-purple-500/30">
            Live updates
          </span>
        </div>

        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {transmissionLog.map((log, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-600/20 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getTransmissionStatusIcon(log.status)}
                  <div>
                    <div className="text-sm font-medium text-white">
                      {log.source} → {log.destination}
                    </div>
                    <div className="text-xs text-slate-300">{log.dataType}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-400">{log.status}</div>
                  <div className="text-xs text-slate-400">{log.latency}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ground Station Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
          <div className="flex items-center space-x-2 mb-3">
            <Wifi className="w-5 h-5 text-green-400" />
            <h5 className="font-semibold text-white">Ground Station 01</h5>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Status:</span>
              <span className="text-green-400">OPERATIONAL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Data Quality:</span>
              <span className="text-blue-400">EXCELLENT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Last Update:</span>
              <span className="text-slate-300">Just now</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Signal Strength:</span>
              <span className="text-green-400">98%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
          <div className="flex items-center space-x-2 mb-3">
            <Wifi className="w-5 h-5 text-green-400" />
            <h5 className="font-semibold text-white">Ground Station 02</h5>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Status:</span>
              <span className="text-green-400">OPERATIONAL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Data Quality:</span>
              <span className="text-blue-400">EXCELLENT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Last Update:</span>
              <span className="text-slate-300">Just now</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Signal Strength:</span>
              <span className="text-green-400">96%</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
        <div className="flex items-center space-x-2 mb-4">
          <Signal className="w-5 h-5 text-blue-400" />
          <h4 className="text-lg font-semibold text-white">System Metrics</h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">99.9%</div>
            <div className="text-xs text-slate-300">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">~5 min</div>
            <div className="text-xs text-slate-300">Data Latency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">1.2 TB</div>
            <div className="text-xs text-slate-300">Daily Data</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">24/7</div>
            <div className="text-xs text-slate-300">Monitoring</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-600/30">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Last Update: {formatTime(currentTime)}</span>
          <span>ISRO Integration: OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
}
