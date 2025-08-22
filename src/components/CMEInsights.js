"use client";

import { useState, useEffect } from "react";
import {
  classifyStrength,
  estimateDirection,
  forecastImpact,
  detectAnomalies,
} from "@/lib/cme/placeholders";
import { sendCMEAlert } from "@/lib/telegram";

export default function CMEInsights({ events = [] }) {
  const [anomalies, setAnomalies] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Process events for anomalies
  useEffect(() => {
    if (events && events.length > 0) {
      // Convert events to ASPEX format for anomaly detection
      const aspexData = events.map((event) => ({
        timestamp: event.startTime,
        windSpeed: event.speed || event.speedKmSec,
        particleFlux: event.particleFlux || 0,
        ...event,
      }));

      const anomalyResult = detectAnomalies(aspexData);
      setAnomalies(anomalyResult.anomalies || []);

      // Generate alerts for rule-based anomalies
      const newAlerts = [];
      anomalyResult.anomalies?.forEach(async (anomaly) => {
        if (anomaly.isRuleBased) {
          const forecast = forecastImpact(anomaly);
          const alert = {
            id: `alert-${Date.now()}-${Math.random()}`,
            reason: anomaly.reason,
            etaHours: forecast.etaHours,
            timestamp: anomaly.timestamp,
            severity: "high",
          };
          newAlerts.push(alert);

          // Send Telegram alert for rule-based anomalies
          try {
            const telegramResult = await sendCMEAlert(anomaly, forecast);
            if (telegramResult.success) {
              console.log("Telegram alert sent for anomaly:", anomaly.reason);
            } else {
              console.warn(
                "Failed to send Telegram alert:",
                telegramResult.error
              );
            }
          } catch (error) {
            console.error("Error sending Telegram alert:", error);
          }
        }
      });
      setAlerts(newAlerts);
    }
  }, [events]);

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
        CME Insights & Alerts
      </h3>

      {/* Alert Section */}
      {alerts.length > 0 && (
        <div className="mb-6">
          <h4 className="text-md font-semibold text-white mb-3">
            🚨 Active Alerts
          </h4>
          {alerts.map((alert, index) => (
            <div
              key={alert.id}
              className="mb-3 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🚨</span>
                <span className="text-red-300 font-semibold">
                  CME Detected!
                </span>
              </div>
              <div className="text-red-200 text-sm mb-1">
                <strong>Reason:</strong> {alert.reason}
              </div>
              <div className="text-red-200 text-sm">
                <strong>ETA:</strong> {alert.etaHours} hours
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="p-3 bg-white/5 rounded">
          <div className="text-gray-400">Strength</div>
          <div className="text-white font-medium truncate">
            {strength.class}
          </div>
          <div className="text-gray-500 text-xs truncate">
            {strength.rationale}
          </div>
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

      {/* Anomaly Summary */}
      {anomalies.length > 0 && (
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
          <div className="text-yellow-300 text-sm">
            <strong>Anomalies Detected:</strong> {anomalies.length}
            {anomalies.some((a) => a.isRuleBased) && (
              <span className="ml-2 text-red-300">(Including Rule-Based)</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
