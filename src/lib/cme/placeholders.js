// Real CME prediction utilities - replacing placeholders with actual algorithms

export function detectAnomalies(aspexSeries = []) {
  // Enhanced anomaly detection with rule-based and statistical methods
  if (!aspexSeries || aspexSeries.length === 0) {
    return { method: "no-data", anomalies: [] };
  }

  const windSpeeds = aspexSeries
    .map((p) => p.windSpeed)
    .filter((s) => s !== null && s !== undefined);
  const particleFluxes = aspexSeries
    .map((p) => p.particleFlux)
    .filter((f) => f !== null && f !== undefined);

  if (windSpeeds.length === 0 && particleFluxes.length === 0) {
    return { method: "no-valid-data", anomalies: [] };
  }

  // Rule-based thresholds (as per requirements)
  const RULE_BASED_WIND_THRESHOLD = 700;
  const RULE_BASED_FLUX_THRESHOLD = 500;

  // Calculate statistical thresholds for anomaly detection
  const windMean =
    windSpeeds.length > 0
      ? windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length
      : 0;
  const windStd =
    windSpeeds.length > 0
      ? Math.sqrt(
          windSpeeds.reduce((sq, n) => sq + Math.pow(n - windMean, 2), 0) /
            windSpeeds.length
        )
      : 0;
  const windThreshold = Math.max(
    windMean + 2 * windStd,
    RULE_BASED_WIND_THRESHOLD
  );

  const fluxMean =
    particleFluxes.length > 0
      ? particleFluxes.reduce((a, b) => a + b, 0) / particleFluxes.length
      : 0;
  const fluxStd =
    particleFluxes.length > 0
      ? Math.sqrt(
          particleFluxes.reduce((sq, n) => sq + Math.pow(n - fluxMean, 2), 0) /
            particleFluxes.length
        )
      : 0;
  const fluxThreshold = Math.max(
    fluxMean + 2 * fluxStd,
    RULE_BASED_FLUX_THRESHOLD
  );

  // Detect anomalies with enhanced rule-based detection
  const anomalies = aspexSeries
    .map((p, idx) => {
      const windAnomaly = p.windSpeed && p.windSpeed > windThreshold;
      const fluxAnomaly = p.particleFlux && p.particleFlux > fluxThreshold;

      // Rule-based detection (as per requirements)
      const ruleBasedWindAnomaly =
        p.windSpeed && p.windSpeed > RULE_BASED_WIND_THRESHOLD;
      const ruleBasedFluxAnomaly =
        p.particleFlux && p.particleFlux > RULE_BASED_FLUX_THRESHOLD;

      if (
        windAnomaly ||
        fluxAnomaly ||
        ruleBasedWindAnomaly ||
        ruleBasedFluxAnomaly
      ) {
        const score = Math.max(
          windAnomaly ? (p.windSpeed - windMean) / windStd : 0,
          fluxAnomaly ? (p.particleFlux - fluxMean) / fluxStd : 0,
          ruleBasedWindAnomaly ? 5 : 0, // High priority for rule-based
          ruleBasedFluxAnomaly ? 5 : 0 // High priority for rule-based
        );

        // Determine reason for anomaly
        let reason = "";
        if (ruleBasedWindAnomaly && ruleBasedFluxAnomaly) {
          reason = "High Solar Wind Speed & High Particle Flux";
        } else if (ruleBasedWindAnomaly) {
          reason = "High Solar Wind Speed";
        } else if (ruleBasedFluxAnomaly) {
          reason = "High Particle Flux";
        } else if (windAnomaly && fluxAnomaly) {
          reason = "Statistical Anomaly: Wind & Flux";
        } else if (windAnomaly) {
          reason = "Statistical Anomaly: Wind Speed";
        } else if (fluxAnomaly) {
          reason = "Statistical Anomaly: Particle Flux";
        }

        return {
          timestamp: p.timestamp || new Date().toISOString(),
          windSpeed: p.windSpeed,
          particleFlux: p.particleFlux,
          score: Math.min(score, 5), // Cap at 5
          type:
            windAnomaly && fluxAnomaly ? "both" : windAnomaly ? "wind" : "flux",
          reason: reason,
          isRuleBased: ruleBasedWindAnomaly || ruleBasedFluxAnomaly,
          ruleBasedThresholds: {
            windSpeed: RULE_BASED_WIND_THRESHOLD,
            particleFlux: RULE_BASED_FLUX_THRESHOLD,
          },
        };
      }
      return null;
    })
    .filter((a) => a !== null);

  return {
    method: "enhanced-rule-based-statistical",
    anomalies,
    thresholds: {
      windSpeed: windThreshold,
      particleFlux: fluxThreshold,
      ruleBased: {
        windSpeed: RULE_BASED_WIND_THRESHOLD,
        particleFlux: RULE_BASED_FLUX_THRESHOLD,
      },
    },
  };
}

export function estimateDirection(event) {
  // Real direction estimation based on CME parameters
  if (!event) {
    return {
      latitude: 0,
      longitude: 0,
      directionLabel: "Unknown",
      confidence: 0,
    };
  }

  const lat = parseFloat(event.latitude) || 0;
  const lon = parseFloat(event.longitude) || 0;
  const speed = parseFloat(event.speed) || 0;
  const halfAngle = parseFloat(event.halfAngle) || 0;

  // Determine direction based on latitude/longitude
  let directionLabel = "Unknown";
  let confidence = 0.5; // Base confidence

  if (lat !== 0 || lon !== 0) {
    // Convert to cardinal directions
    if (lat > 30) directionLabel = "North";
    else if (lat < -30) directionLabel = "South";
    else if (lon > 30) directionLabel = "East";
    else if (lon < -30) directionLabel = "West";
    else directionLabel = "Central";

    confidence = 0.8; // High confidence when coordinates are available
  }

  // Adjust confidence based on data quality
  if (speed > 0) confidence += 0.1;
  if (halfAngle > 0) confidence += 0.1;
  confidence = Math.min(confidence, 1.0);

  return {
    latitude: lat,
    longitude: lon,
    directionLabel,
    confidence,
    method: "coordinate-analysis",
  };
}

export function classifyStrength(event) {
  // Real CME strength classification based on multiple parameters
  if (!event) {
    return { class: "Unknown", rationale: "No event data provided" };
  }

  const speed = parseFloat(event.speed) || 0;
  const halfAngle = parseFloat(event.halfAngle) || 0;
  const particleFlux = parseFloat(event.particleFlux) || 0;

  // Multi-parameter classification
  let score = 0;
  let rationale = [];

  // Speed contribution (40% weight)
  if (speed > 1000) {
    score += 40;
    rationale.push("Very high speed (>1000 km/s)");
  } else if (speed > 800) {
    score += 30;
    rationale.push("High speed (800-1000 km/s)");
  } else if (speed > 500) {
    score += 20;
    rationale.push("Moderate speed (500-800 km/s)");
  } else if (speed > 300) {
    score += 10;
    rationale.push("Low speed (300-500 km/s)");
  }

  // Half angle contribution (30% weight)
  if (halfAngle > 60) {
    score += 30;
    rationale.push("Very wide angle (>60°)");
  } else if (halfAngle > 45) {
    score += 25;
    rationale.push("Wide angle (45-60°)");
  } else if (halfAngle > 30) {
    score += 20;
    rationale.push("Moderate angle (30-45°)");
  } else if (halfAngle > 15) {
    score += 15;
    rationale.push("Narrow angle (15-30°)");
  }

  // Particle flux contribution (30% weight)
  if (particleFlux > 1000) {
    score += 30;
    rationale.push("Very high particle flux");
  } else if (particleFlux > 500) {
    score += 25;
    rationale.push("High particle flux");
  } else if (particleFlux > 100) {
    score += 20;
    rationale.push("Moderate particle flux");
  } else if (particleFlux > 10) {
    score += 15;
    rationale.push("Low particle flux");
  }

  // Classify based on total score
  let cls = "Low";
  if (score >= 70) cls = "High";
  else if (score >= 40) cls = "Medium";

  return {
    class: cls,
    score: score,
    rationale: rationale.join(", "),
    method: "multi-parameter-scoring",
  };
}

export function forecastImpact(event) {
  // Real CME impact forecasting with propagation modeling
  if (!event) {
    return {
      etaHours: null,
      likelihood: 0,
      summary: "No event data for forecasting",
    };
  }

  const speed = parseFloat(event.speed) || 400;
  const halfAngle = parseFloat(event.halfAngle) || 30;
  const latitude = parseFloat(event.latitude) || 0;
  const longitude = parseFloat(event.longitude) || 0;

  // Enhanced ETA calculation with 2 decimal precision (as per requirements)
  const DISTANCE_EARTH_SUN_KM = 150_000_000; // As per requirements
  const SOLAR_RADIUS_KM = 696_340; // Solar radius in km

  // Calculate propagation time with 2 decimal precision
  const distanceToEarth = DISTANCE_EARTH_SUN_KM - SOLAR_RADIUS_KM;
  const etaHours = parseFloat(
    (distanceToEarth / (speed * 1000) / 3600).toFixed(2)
  );

  // Calculate Earth impact likelihood based on geometry
  let likelihood = 0.5; // Base likelihood

  // Adjust based on latitude (CMEs near solar equator are more likely to hit Earth)
  const absLat = Math.abs(latitude);
  if (absLat < 15) likelihood += 0.3; // High likelihood for equatorial CMEs
  else if (absLat < 30) likelihood += 0.1; // Moderate likelihood
  else likelihood -= 0.2; // Low likelihood for high-latitude CMEs

  // Adjust based on half angle (wider CMEs are more likely to hit Earth)
  if (halfAngle > 45) likelihood += 0.2;
  else if (halfAngle > 30) likelihood += 0.1;
  else likelihood -= 0.1;

  // Adjust based on speed (faster CMEs may have different propagation characteristics)
  if (speed > 800) likelihood += 0.1;
  else if (speed < 400) likelihood -= 0.1;

  // Clamp likelihood between 0 and 1
  likelihood = Math.max(0, Math.min(1, likelihood));

  // Generate impact summary
  let summary = "CME propagation forecast";
  if (likelihood > 0.7) {
    summary = "High probability of Earth impact";
  } else if (likelihood > 0.4) {
    summary = "Moderate probability of Earth impact";
  } else {
    summary = "Low probability of Earth impact";
  }

  return {
    etaHours: likelihood > 0.3 ? etaHours : null, // Only provide ETA if significant likelihood
    likelihood: Math.round(likelihood * 100) / 100,
    summary,
    method: "enhanced-geometric-propagation-model",
    confidence: event.isMostAccurate ? 0.8 : 0.6,
    distanceKm: DISTANCE_EARTH_SUN_KM,
    speedKmSec: speed,
  };
}

// Additional utility functions for CME analysis
export function calculateGeomagneticStormIntensity(event) {
  // Estimate geomagnetic storm intensity based on CME parameters
  if (!event) return { intensity: "Unknown", kpIndex: 0 };

  const speed = parseFloat(event.speed) || 400;
  const halfAngle = parseFloat(event.halfAngle) || 30;

  // Simplified Kp index estimation
  let kpIndex = 2; // Base Kp index

  if (speed > 1000) kpIndex += 3;
  else if (speed > 800) kpIndex += 2;
  else if (speed > 500) kpIndex += 1;

  if (halfAngle > 45) kpIndex += 1;

  kpIndex = Math.min(kpIndex, 9); // Kp index max is 9

  let intensity = "G1";
  if (kpIndex >= 8) intensity = "G4";
  else if (kpIndex >= 6) intensity = "G3";
  else if (kpIndex >= 5) intensity = "G2";
  else if (kpIndex >= 4) intensity = "G1";
  else intensity = "G0";

  return {
    intensity,
    kpIndex,
    description: `${intensity} (${
      kpIndex === 0
        ? "Quiet"
        : kpIndex <= 3
        ? "Minor"
        : kpIndex <= 5
        ? "Moderate"
        : kpIndex <= 7
        ? "Strong"
        : "Severe"
    }) geomagnetic storm`,
  };
}

export function predictSectorImpacts(event) {
  // Predict impacts on different sectors based on CME characteristics
  if (!event) return {};

  const speed = parseFloat(event.speed) || 400;
  const halfAngle = parseFloat(event.halfAngle) || 30;
  const { intensity } = calculateGeomagneticStormIntensity(event);

  const impacts = {
    aviation: {
      risk: speed > 800 ? "High" : speed > 500 ? "Medium" : "Low",
      effects: [
        "GPS degradation",
        "Radio communication disruption",
        "Radiation exposure",
      ],
      recommendations: [
        "Reroute polar flights",
        "Activate backup navigation",
        "Monitor radiation levels",
      ],
    },
    power: {
      risk:
        intensity === "G4" || intensity === "G3"
          ? "High"
          : intensity === "G2"
          ? "Medium"
          : "Low",
      effects: [
        "Transformer overload",
        "Grid instability",
        "Voltage fluctuations",
      ],
      recommendations: [
        "Activate surge protection",
        "Monitor transformer loads",
        "Prepare load shedding",
      ],
    },
    satellites: {
      risk: speed > 600 ? "High" : "Medium",
      effects: [
        "Orbital perturbations",
        "Communication disruption",
        "Radiation damage",
      ],
      recommendations: [
        "Activate safe mode",
        "Adjust orbital parameters",
        "Monitor radiation levels",
      ],
    },
    telecom: {
      risk: intensity === "G3" || intensity === "G4" ? "High" : "Medium",
      effects: ["Signal degradation", "Network outages", "GPS timing errors"],
      recommendations: [
        "Activate backup systems",
        "Implement traffic rerouting",
        "Monitor network performance",
      ],
    },
  };

  return impacts;
}
