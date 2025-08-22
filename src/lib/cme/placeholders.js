// Placeholder utilities for backend processing. Replace with real implementations.

export function detectAnomalies(aspexSeries = []) {
  // Returns mock anomalies. Input expected: [{ timestamp, windSpeed, particleFlux }]
  return {
    method: "zscore-mock",
    anomalies: aspexSeries
      .filter((_, idx) => idx % 17 === 0)
      .map((p) => ({
        timestamp: p.timestamp || new Date().toISOString(),
        windSpeed: p.windSpeed ?? null,
        particleFlux: p.particleFlux ?? null,
        score: 2.5,
      })),
  };
}

export function estimateDirection(event) {
  // Uses latitude/longitude if available; otherwise returns mock values
  return {
    latitude: event?.latitude ?? 0,
    longitude: event?.longitude ?? 0,
    directionLabel: "Mock-East",
    confidence: 0.6,
  };
}

export function classifyStrength(event) {
  const speed = Number(event?.speed ?? 0);
  const halfAngle = Number(event?.halfAngle ?? 0);
  let cls = "Low";
  if (speed > 800 || halfAngle > 60) cls = "High";
  else if (speed > 500 || halfAngle > 30) cls = "Medium";
  return { class: cls, rationale: "Mock rule-based classification" };
}

export function forecastImpact(event) {
  const speed = Number(event?.speed ?? 400) || 400;
  const AU_KM = 149_600_000; // placeholder distance
  const etaHours = Math.round(AU_KM / (speed * 1000) / 3600);
  return {
    etaHours,
    likelihood: event?.isMostAccurate ? 0.7 : 0.4,
    summary: "Mock propagation estimate",
  };
}
