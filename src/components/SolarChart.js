"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Activity, TrendingUp, AlertTriangle } from "lucide-react";

export default function SolarChart({
  data,
  title,
  type = "line",
  height = 300,
}) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data) {
      setChartData(data);
    } else {
      // Generate sample data if no data provided
      const sampleData = Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        value: Math.random() * 100,
        solarFlux: Math.random() * 200 + 50,
        cmeIntensity: Math.random() * 10,
      }));
      setChartData(sampleData);
    }
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-white font-medium">{`Time: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (type === "area") {
      return (
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis dataKey="time" stroke="#ffffff80" fontSize={12} />
          <YAxis stroke="#ffffff80" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#ff6b6b"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      );
    }

    return (
      <LineChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
        <XAxis dataKey="time" stroke="#ffffff80" fontSize={12} />
        <YAxis stroke="#ffffff80" fontSize={12} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#ff6b6b"
          strokeWidth={2}
          dot={{ fill: "#ff6b6b", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "#ff6b6b", strokeWidth: 2 }}
        />
      </LineChart>
    );
  };

  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400">
              Real-time solar activity data
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Live</span>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-400">24</p>
          <p className="text-xs text-gray-400">Active Regions</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-400">3</p>
          <p className="text-xs text-gray-400">CME Events</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-400">156</p>
          <p className="text-xs text-gray-400">Solar Flux</p>
        </div>
      </div>
    </div>
  );
}
