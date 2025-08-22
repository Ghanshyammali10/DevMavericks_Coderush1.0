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

export default function SolarWindChart({
  data = [],
  loading = false,
  error = null,
}) {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

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

    setChartData({
      labels: timestamps,
      datasets: [
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
      ],
    });
  }, [data]);

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
        text: "Real-Time Solar Wind Data",
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
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
}
