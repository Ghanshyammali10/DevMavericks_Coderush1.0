"use client";

import {
  classifyStrength,
  estimateDirection,
  forecastImpact,
} from "@/lib/cme/placeholders";

export default function CMEInsights({ events = [] }) {
  const sample = events[0];
  if (!sample) {
    return (
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Insights</h3>
        <p className="text-gray-400 text-sm">No events loaded.</p>
      </div>
    );
  }

  const strength = classifyStrength(sample);
  const direction = estimateDirection(sample);
  const forecast = forecastImpact(sample);

  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Insights (Placeholder)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="p-3 bg-white/5 rounded">
          <div className="text-gray-400">Strength</div>
          <div className="text-white font-medium truncate">{strength.class}</div>
          <div className="text-gray-500 text-xs truncate">{strength.rationale}</div>
        </div>
        <div className="p-3 bg-white/5 rounded">
          <div className="text-gray-400">Direction</div>
          <div className="text-white font-medium truncate">
            {direction.directionLabel}
          </div>
          <div className="text-gray-500 text-xs truncate">
            lat {direction.latitude}, lon {direction.longitude}
          </div>
        </div>
        <div className="p-3 bg-white/5 rounded">
          <div className="text-gray-400">Forecast</div>
          <div className="text-white font-medium truncate">
            ETA ~{forecast.etaHours} h
          </div>
          <div className="text-gray-500 text-xs truncate">
            likelihood {Math.round(forecast.likelihood * 100)}%
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-3">
        These are placeholders. Replace with real models/data.
      </div>
    </div>
  );
}
