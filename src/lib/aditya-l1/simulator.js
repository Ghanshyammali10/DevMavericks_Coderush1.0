// Aditya-L1 Data Simulator
// Generates realistic ASPEX and SUIT payload data for hackathon demo

class AdityaL1Simulator {
  constructor() {
    this.baseTime = Date.now();
    this.solarWindData = [];
    this.particleFluxData = [];
    this.magnetometerData = [];
    this.cmeEvents = [];
    this.anomalyThresholds = {
      windSpeed: { low: 300, medium: 500, high: 800, extreme: 1200 },
      particleFlux: { low: 1000, medium: 5000, high: 15000, extreme: 30000 },
      magneticField: { low: 10, medium: 20, high: 30, extreme: 50 },
    };
    this.initializeData();
  }

  // Initialize with realistic baseline data
  initializeData() {
    const now = Date.now();

    // Generate 24 hours of historical data
    for (let i = 24; i >= 0; i--) {
      const timestamp = now - i * 60 * 60 * 1000;
      this.solarWindData.push(this.generateSolarWindData(timestamp));
      this.particleFluxData.push(this.generateParticleFluxData(timestamp));
      this.magnetometerData.push(this.generateMagnetometerData(timestamp));
    }

    // Generate realistic CME events
    this.generateCMEEvents();
  }

  // Generate realistic solar wind data
  generateSolarWindData(timestamp) {
    const baseSpeed = 400 + Math.random() * 200; // 400-600 km/s baseline
    const solarActivity = this.getSolarActivityFactor(timestamp);
    const speed = baseSpeed * (1 + solarActivity * 0.5);

    return {
      timestamp: new Date(timestamp).toISOString(),
      windSpeed: Math.round(speed),
      density: Math.round(5 + Math.random() * 10), // particles/cm³
      temperature: Math.round(100000 + Math.random() * 200000), // Kelvin
      magneticField: Math.round(5 + Math.random() * 15), // nT
      source: "ASPEX_PAYLOAD",
      quality: "HIGH",
      groundStation: "ISRO_GROUND_STATION_01",
    };
  }

  // Generate realistic particle flux data
  generateParticleFluxData(timestamp) {
    const baseFlux = 2000 + Math.random() * 3000; // 2000-5000 particles/cm²/s
    const solarActivity = this.getSolarActivityFactor(timestamp);
    const flux = baseFlux * (1 + solarActivity * 2);

    return {
      timestamp: new Date(timestamp).toISOString(),
      particleFlux: Math.round(flux),
      energyRange: "1-10 MeV",
      detector: "ASPEX_PARTICLE_DETECTOR",
      calibration: "RECENT",
      background: Math.round(100 + Math.random() * 200),
      source: "ASPEX_PAYLOAD",
      quality: "HIGH",
      groundStation: "ISRO_GROUND_STATION_01",
    };
  }

  // Generate realistic magnetometer data
  generateMagnetometerData(timestamp) {
    const solarActivity = this.getSolarActivityFactor(timestamp);

    // Base values for magnetic field components (in nT - nanotesla)
    const baseBx = 0 + (Math.random() - 0.5) * 10;
    const baseBy = 0 + (Math.random() - 0.5) * 10;
    const baseBz = -5 + (Math.random() - 0.5) * 10;

    // Add solar activity influence
    const bx = baseBx * (1 + solarActivity * 0.5);
    const by = baseBy * (1 + solarActivity * 0.5);
    const bz = baseBz * (1 + solarActivity * 1.5); // Bz is more affected by solar activity

    // Calculate total field magnitude
    const totalField = Math.sqrt(bx * bx + by * by + bz * bz);

    return {
      timestamp: new Date(timestamp).toISOString(),
      bx: parseFloat(bx.toFixed(2)),
      by: parseFloat(by.toFixed(2)),
      bz: parseFloat(bz.toFixed(2)),
      totalField: parseFloat(totalField.toFixed(2)),
      instrument: "MAG_VECTOR_FIELD_SENSOR",
      calibration: "RECENT",
      source: "MAG_PAYLOAD",
      quality: "HIGH",
      groundStation: "ISRO_GROUND_STATION_01",
    };
  }

  // Generate realistic CME events
  generateCMEEvents() {
    // Use a fixed base time to prevent hydration issues
    const baseTime = new Date("2024-08-22T20:00:00Z").getTime();

    const events = [
      {
        id: "CME-2024-001",
        startTime: new Date(baseTime - 2 * 60 * 60 * 1000).toISOString(),
        source: "Aditya-L1 SUIT",
        latitude: "15.2",
        longitude: "-45.8",
        speed: 850,
        speedKmSec: 850,
        halfAngle: 45,
        earthImpact: true,
        etaHours: 48,
        confidence: 0.87,
        classification: "High",
        note: "Earth-directed CME detected by SUIT imaging",
        isMostAccurate: true,
        catalog: "M2M_CATALOG",
      },
      {
        id: "CME-2024-002",
        startTime: new Date(baseTime - 6 * 60 * 60 * 1000).toISOString(),
        source: "Aditya-L1 ASPEX",
        latitude: "-22.1",
        longitude: "78.3",
        speed: 650,
        speedKmSec: 650,
        halfAngle: 35,
        earthImpact: false,
        etaHours: null,
        confidence: 0.73,
        classification: "Medium",
        note: "Sideways CME - no Earth impact expected",
        isMostAccurate: true,
        catalog: "M2M_CATALOG",
      },
      {
        id: "CME-2024-003",
        startTime: new Date(baseTime - 12 * 60 * 60 * 1000).toISOString(),
        source: "Aditya-L1 SUIT",
        latitude: "8.7",
        longitude: "-12.4",
        speed: 1200,
        speedKmSec: 1200,
        halfAngle: 60,
        earthImpact: true,
        etaHours: 24,
        confidence: 0.94,
        classification: "High",
        note: "Extreme CME - high-speed Earth-directed event",
        isMostAccurate: true,
        catalog: "M2M_CATALOG",
      },
      {
        id: "CME-2024-004",
        startTime: new Date(baseTime - 18 * 60 * 60 * 1000).toISOString(),
        source: "Aditya-L1 ASPEX",
        latitude: "5.3",
        longitude: "120.7",
        speed: 450,
        speedKmSec: 450,
        halfAngle: 25,
        earthImpact: false,
        etaHours: null,
        confidence: 0.65,
        classification: "Low",
        note: "Low-intensity CME - minimal impact expected",
        isMostAccurate: false,
        catalog: "ESTIMATE",
      },
      {
        id: "CME-2024-005",
        startTime: new Date(baseTime - 24 * 60 * 60 * 1000).toISOString(),
        source: "Aditya-L1 SUIT",
        latitude: "-12.8",
        longitude: "-89.2",
        speed: 950,
        speedKmSec: 950,
        halfAngle: 50,
        earthImpact: true,
        etaHours: 36,
        confidence: 0.82,
        classification: "High",
        note: "High-speed CME with wide angle - significant impact possible",
        isMostAccurate: true,
        catalog: "M2M_CATALOG",
      },
    ];

    this.cmeEvents = events;
  }

  // Get solar activity factor based on time (simulates solar cycle)
  getSolarActivityFactor(timestamp) {
    const solarCycle = Math.sin(
      (timestamp / (11 * 365 * 24 * 60 * 60 * 1000)) * 2 * Math.PI
    );
    const randomVariation = Math.random() * 0.3;
    return Math.max(0, solarCycle * 0.5 + randomVariation);
  }

  // Generate real-time data updates
  generateRealTimeUpdate() {
    const now = Date.now();
    const newWindData = this.generateSolarWindData(now);
    const newFluxData = this.generateParticleFluxData(now);
    const newMagData = this.generateMagnetometerData(now);

    // Add to data arrays
    this.solarWindData.push(newWindData);
    this.particleFluxData.push(newFluxData);
    this.magnetometerData.push(newMagData);

    // Keep only last 24 hours
    if (this.solarWindData.length > 24) {
      this.solarWindData.shift();
      this.particleFluxData.shift();
      this.magnetometerData.shift();
    }

    // Check for anomalies
    const anomalies = this.detectAnomalies(
      newWindData,
      newFluxData,
      newMagData
    );

    return {
      timestamp: new Date(now).toISOString(),
      solarWind: newWindData,
      particleFlux: newFluxData,
      magnetometer: newMagData,
      anomalies: anomalies,
      systemStatus: "OPERATIONAL",
      dataQuality: "EXCELLENT",
      groundStationStatus: "NOMINAL",
    };
  }

  // Detect anomalies in real-time
  detectAnomalies(windData, fluxData, magData) {
    const anomalies = [];

    // Wind speed anomaly detection
    if (windData.windSpeed > this.anomalyThresholds.windSpeed.extreme) {
      anomalies.push({
        type: "EXTREME_WIND_SPEED",
        severity: "CRITICAL",
        value: windData.windSpeed,
        threshold: this.anomalyThresholds.windSpeed.extreme,
        description:
          "Extreme solar wind speed detected - potential CME precursor",
        timestamp: windData.timestamp,
        source: "ASPEX_ANOMALY_DETECTOR",
      });
    } else if (windData.windSpeed > this.anomalyThresholds.windSpeed.high) {
      anomalies.push({
        type: "HIGH_WIND_SPEED",
        severity: "HIGH",
        value: windData.windSpeed,
        threshold: this.anomalyThresholds.windSpeed.high,
        description: "High solar wind speed - monitoring required",
        timestamp: windData.timestamp,
        source: "ASPEX_ANOMALY_DETECTOR",
      });
    }

    // Particle flux anomaly detection
    if (fluxData.particleFlux > this.anomalyThresholds.particleFlux.extreme) {
      anomalies.push({
        type: "EXTREME_PARTICLE_FLUX",
        severity: "CRITICAL",
        value: fluxData.particleFlux,
        threshold: this.anomalyThresholds.particleFlux.extreme,
        description:
          "Extreme particle flux detected - radiation storm possible",
        timestamp: fluxData.timestamp,
        source: "ASPEX_ANOMALY_DETECTOR",
      });
    } else if (
      fluxData.particleFlux > this.anomalyThresholds.particleFlux.high
    ) {
      anomalies.push({
        type: "HIGH_PARTICLE_FLUX",
        severity: "HIGH",
        value: fluxData.particleFlux,
        threshold: this.anomalyThresholds.particleFlux.high,
        description: "High particle flux - enhanced monitoring active",
        timestamp: fluxData.timestamp,
        source: "ASPEX_ANOMALY_DETECTOR",
      });
    }

    // Magnetic field anomaly detection
    if (
      magData &&
      magData.totalField > this.anomalyThresholds.magneticField.extreme
    ) {
      anomalies.push({
        type: "EXTREME_MAGNETIC_FIELD",
        severity: "CRITICAL",
        value: magData.totalField,
        threshold: this.anomalyThresholds.magneticField.extreme,
        description:
          "Extreme magnetic field detected - geomagnetic storm likely",
        timestamp: magData.timestamp,
        source: "MAG_ANOMALY_DETECTOR",
      });
    } else if (
      magData &&
      magData.totalField > this.anomalyThresholds.magneticField.high
    ) {
      anomalies.push({
        type: "HIGH_MAGNETIC_FIELD",
        severity: "HIGH",
        value: magData.totalField,
        threshold: this.anomalyThresholds.magneticField.high,
        description: "High magnetic field - potential geomagnetic disturbance",
        timestamp: magData.timestamp,
        source: "MAG_ANOMALY_DETECTOR",
      });
    }

    return anomalies;
  }

  // Get current system status
  getSystemStatus() {
    return {
      timestamp: new Date().toISOString(),
      adityaL1Status: "OPERATIONAL",
      aspexPayload: "NOMINAL",
      suitPayload: "NOMINAL",
      magPayload: "NOMINAL",
      groundStations: [
        {
          name: "ISRO_GROUND_STATION_01",
          status: "OPERATIONAL",
          dataQuality: "EXCELLENT",
          lastUpdate: new Date().toISOString(),
        },
        {
          name: "ISRO_GROUND_STATION_02",
          status: "OPERATIONAL",
          dataQuality: "EXCELLENT",
          lastUpdate: new Date().toISOString(),
        },
      ],
      dataLatency: "~5 minutes",
      systemHealth: "EXCELLENT",
    };
  }

  // Get historical data for charts
  getHistoricalData(hours = 24) {
    const endIndex = this.solarWindData.length;
    const startIndex = Math.max(0, endIndex - hours);

    return {
      solarWind: this.solarWindData.slice(startIndex, endIndex),
      particleFlux: this.particleFluxData.slice(startIndex, endIndex),
      magnetometer: this.magnetometerData.slice(startIndex, endIndex),
      anomalies: this.getAnomalyHistory(hours),
    };
  }

  // Get anomaly history
  getAnomalyHistory(hours = 24) {
    const anomalies = [];
    const now = Date.now();

    for (let i = 0; i < hours; i++) {
      const timestamp = now - i * 60 * 60 * 1000;
      const windData = this.generateSolarWindData(timestamp);
      const fluxData = this.generateParticleFluxData(timestamp);
      const magData = this.generateMagnetometerData(timestamp);
      const hourAnomalies = this.detectAnomalies(windData, fluxData, magData);

      if (hourAnomalies.length > 0) {
        anomalies.push({
          timestamp: new Date(timestamp).toISOString(),
          count: hourAnomalies.length,
          severity: hourAnomalies.reduce((max, a) =>
            this.getSeverityLevel(a.severity) >
            this.getSeverityLevel(max.severity)
              ? a
              : max
          ).severity,
        });
      }
    }

    return anomalies.reverse();
  }

  // Helper function to get severity level
  getSeverityLevel(severity) {
    const levels = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
    return levels[severity] || 0;
  }

  // Simulate CME detection
  simulateCMEDetection() {
    // Use fixed base time to prevent hydration issues
    const baseTime = new Date("2024-08-22T20:00:00Z").getTime();
    const speed = Math.round(400 + Math.random() * 800);
    const halfAngle = Math.round(20 + Math.random() * 50);
    const earthImpact = Math.random() > 0.3;
    const etaHours = earthImpact ? Math.round(24 + Math.random() * 72) : null;

    const newCME = {
      id: `CME-2024-${String(this.cmeEvents.length + 1).padStart(3, "0")}`,
      startTime: new Date(
        baseTime - Math.random() * 24 * 60 * 60 * 1000
      ).toISOString(),
      source: Math.random() > 0.5 ? "Aditya-L1 SUIT" : "Aditya-L1 ASPEX",
      latitude: ((Math.random() - 0.5) * 60).toFixed(1),
      longitude: ((Math.random() - 0.5) * 360).toFixed(1),
      speed: speed,
      speedKmSec: speed,
      halfAngle: halfAngle,
      earthImpact: earthImpact,
      etaHours: etaHours,
      confidence: 0.7 + Math.random() * 0.25,
      classification: this.getIntensityLevel(Math.random()),
      note: earthImpact
        ? `Simulated CME detected - Earth impact expected in ${etaHours} hours`
        : "Simulated CME detected - no Earth impact expected",
      isMostAccurate: Math.random() > 0.2,
      catalog: Math.random() > 0.2 ? "M2M_CATALOG" : "ESTIMATE",
    };

    this.cmeEvents.unshift(newCME);

    // Keep only last 10 events
    if (this.cmeEvents.length > 10) {
      this.cmeEvents = this.cmeEvents.slice(0, 10);
    }

    return newCME;
  }

  // Helper function to get intensity level
  getIntensityLevel(random) {
    if (random < 0.1) return "EXTREME";
    if (random < 0.3) return "HIGH";
    if (random < 0.6) return "MEDIUM";
    return "LOW";
  }

  // Helper function to get CME classification
  getCMEClassification(random) {
    if (random < 0.2) return "EARTH-DIRECTED_EXTREME_CME";
    if (random < 0.4) return "EARTH-DIRECTED_CME";
    if (random < 0.6) return "SIDEWAYS_CME";
    if (random < 0.8) return "AWAY_FROM_EARTH_CME";
    return "CORONAL_HOLE_HIGH_SPEED_STREAM";
  }
}

// Export singleton instance
export const adityaL1Simulator = new AdityaL1Simulator();

// Export the class for testing
export default AdityaL1Simulator;
