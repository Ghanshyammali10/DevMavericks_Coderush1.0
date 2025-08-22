"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { AlertTriangle } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function SolarWindChartWithAnomalies({
  data = [],
  loading = false,
  error = null,
  anomalies = null,
  onAnalyzeAnomalies = null,
}) {
  const [chartData, setChartData] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState("speed"); // Default to speed
  const chartRef = useRef(null);

  // Function to detect anomalies in the selected dataset
  const detectAnomalies = async () => {
    if (!data || data.length === 0) return;

    // Extract the selected data series
    const series = data.map((entry) => entry[selectedDataset]);

    try {
      const response = await fetch("/api/anomaly", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ series }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      if (onAnalyzeAnomalies) {
        onAnalyzeAnomalies(result, selectedDataset);
      }
    } catch (err) {
      console.error("Failed to analyze anomalies:", err);
    }
  };

  useEffect(() => {
    if (!data || data.length === 0) {
      setChartData(null);
      return;
    }

    // Prepare data for chart
    const timestamps = data.map((entry) => entry.timestamp);
    const speeds = data.map((entry) => entry.speed);
    const densities = data.map((entry) => entry.density);
    const temperatures = data.map((entry) => entry.temperature);
    const magneticFields = data.map((entry) => entry.bt);

    // Create datasets
    const datasets = [
      {
        label: "Solar Wind Speed (km/s)",
        data: speeds,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        yAxisID: "y",
        tension: 0.1,
      },
      {
        label: "Density (protons/cm³)",
        data: densities,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.1)",
        yAxisID: "y1",
        tension: 0.1,
      },
      {
        label: "Temperature (K)",
        data: temperatures,
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgba(255, 205, 86, 0.1)",
        yAxisID: "y2",
        tension: 0.1,
      },
      {
        label: "Magnetic Field (nT)",
        data: magneticFields,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.1)",
        yAxisID: "y3",
        tension: 0.1,
      },
    ];

    // Add anomaly points if available
    if (anomalies && anomalies.anomalies && anomalies.anomalies.length > 0) {
      // Create a dataset for anomaly points based on the selected dataset
      const anomalyData = new Array(timestamps.length).fill(null);

      // Fill in only the anomaly points
      anomalies.anomalies.forEach((anomaly) => {
        if (anomaly.index >= 0 && anomaly.index < anomalyData.length) {
          anomalyData[anomaly.index] = anomaly.value;
        }
      });

      // Add the anomaly dataset
      datasets.push({
        label: "Anomalies",
        data: anomalyData,
        borderColor: "rgba(255, 0, 0, 0)", // No line
        backgroundColor: "rgba(255, 0, 0, 1)", // Red points
        pointRadius: 6,
        pointHoverRadius: 8,
        pointStyle: "rectRot", // Diamond shape
        yAxisID:
          selectedDataset === "speed"
            ? "y"
            : selectedDataset === "density"
            ? "y1"
            : selectedDataset === "temperature"
            ? "y2"
            : "y3",
      });
    }

    setChartData({
      labels: timestamps,
      datasets: datasets,
    });
  }, [data, anomalies, selectedDataset]);

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Solar Wind Data with Anomaly Detection",
        color: "white",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            hour: "HH:mm",
          },
        },
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Speed (km/s)",
          color: "white",
        },
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Density (protons/cm³)",
          color: "white",
        },
        ticks: {
          color: "white",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: "linear",
        display: false,
        title: {
          display: true,
          text: "Temperature (K)",
          color: "white",
        },
        ticks: {
          color: "white",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y3: {
        type: "linear",
        display: false,
        title: {
          display: true,
          text: "Magnetic Field (nT)",
          color: "white",
        },
        ticks: {
          color: "white",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-white/10 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-white/5 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <div className="text-red-400 text-center">
          <p className="text-lg font-semibold mb-2">
            Error Loading Solar Wind Data
          </p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <div className="text-gray-400 text-center">
          <p className="text-lg font-semibold mb-2">No Solar Wind Data</p>
          <p className="text-sm">Data will appear here when available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h3 className="text-white font-medium">
            Solar Wind with Anomaly Detection
          </h3>
          {anomalies &&
            anomalies.anomalies &&
            anomalies.anomalies.length > 0 && (
              <div className="ml-4 flex items-center text-yellow-400 text-sm">
                <AlertTriangle className="w-4 h-4 mr-1" />
                <span>{anomalies.anomalies.length} anomalies detected</span>
              </div>
            )}
        </div>
        <div className="flex items-center space-x-4">
          <select
            className="bg-black/30 text-white border border-white/20 rounded px-2 py-1 text-sm"
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
          >
            <option value="speed">Wind Speed</option>
            <option value="density">Density</option>
            <option value="temperature">Temperature</option>
            <option value="bt">Magnetic Field</option>
          </select>
          <button
            onClick={detectAnomalies}
            className="bg-blue-500/80 hover:bg-blue-600/80 text-white px-3 py-1 rounded text-sm"
          >
            Detect Anomalies
          </button>
        </div>
      </div>

      {anomalies && (
        <div className="mb-4 p-3 bg-black/40 rounded border border-white/10">
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-gray-400">Average:</span>
              <span className="text-white ml-1">
                {anomalies.average?.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Threshold:</span>
              <span className="text-yellow-400 ml-1">
                {anomalies.threshold?.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Anomalies:</span>
              <span className="text-red-400 ml-1">
                {anomalies.anomalies?.length || 0}
              </span>
            </div>
          </div>
        </div>
      )}

      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
}
