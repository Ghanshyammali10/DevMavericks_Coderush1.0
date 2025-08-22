export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeHistorical = searchParams.get("historical") === "true";

    // Mock space-specific CME data
    const spaceData = {
      sector: "Space Agencies & Satellite Operators",
      lastUpdated: new Date().toISOString(),
      currentAlerts: [
        {
          id: "SPC-001",
          type: "Satellite Shielding Alerts",
          severity: "High",
          description:
            "High radiation levels detected, activate protective protocols for satellites",
          affectedSatellites: [
            "GPS constellation",
            "Communication satellites",
            "Earth observation satellites",
          ],
          recommendation:
            "Activate radiation shielding and reduce sensitive operations",
          validUntil: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          radiationLevel: "High",
          shieldingStatus: "Active",
        },
        {
          id: "SPC-002",
          type: "Launch Window Optimization",
          severity: "Medium",
          description:
            "CME activity affecting optimal launch windows for upcoming missions",
          affectedMissions: [
            "Commercial satellite launches",
            "Space station resupply",
            "Exploration missions",
          ],
          recommendation:
            "Delay launches or adjust trajectories for optimal conditions",
          validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          launchRisk: "Elevated",
          optimalWindows: "Limited",
        },
        {
          id: "SPC-003",
          type: "Trajectory Disruption Forecasts",
          severity: "Low",
          description:
            "Potential orbital drift or control issues for satellites in affected orbits",
          affectedOrbits: [
            "Low Earth Orbit",
            "Medium Earth Orbit",
            "Geostationary Orbit",
          ],
          recommendation:
            "Monitor satellite positions and prepare for orbital corrections",
          validUntil: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
          driftRisk: "Low",
          correctionRequired: "Monitoring",
        },
      ],
      forecasts: {
        radiationLevels: {
          next24h: "High radiation levels in affected orbits",
          next48h: "Moderate levels, gradually decreasing",
          next72h: "Normal radiation levels restored",
        },
        launchConditions: {
          next24h: "Poor launch conditions, delays recommended",
          next48h: "Improving conditions, monitor closely",
          next72h: "Good launch conditions available",
        },
        orbitalStability: {
          next24h: "Minor orbital perturbations expected",
          next48h: "Stable orbital conditions",
          next72h: "Optimal orbital stability",
        },
      },
      recommendations: [
        "Activate radiation shielding for all affected satellites",
        "Delay non-critical launches until conditions improve",
        "Monitor satellite positions and prepare for corrections",
        "Implement enhanced radiation monitoring protocols",
      ],
      satelliteStatus: {
        totalSatellites: 2345,
        affectedSatellites: 156,
        highRiskSatellites: 23,
        shieldingActive: "Yes",
      },
    };

    if (includeHistorical) {
      spaceData.historical = [
        {
          date: "2024-01-15",
          events: 3,
          maxSeverity: "High",
          affectedSatellites: 156,
        },
        {
          date: "2024-01-14",
          events: 2,
          maxSeverity: "Medium",
          affectedSatellites: 89,
        },
        {
          date: "2024-01-13",
          events: 1,
          maxSeverity: "Low",
          affectedSatellites: 45,
        },
      ];
    }

    return new Response(JSON.stringify(spaceData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch space data",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
