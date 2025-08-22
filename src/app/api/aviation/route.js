export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeHistorical = searchParams.get("historical") === "true";

    // Mock aviation-specific CME data
    const aviationData = {
      sector: "Airlines & Aviation",
      lastUpdated: new Date().toISOString(),
      currentAlerts: [
        {
          id: "AV-001",
          type: "Polar Route Risk",
          severity: "High",
          description:
            "High-latitude paths above 60°N experiencing solar radiation spikes",
          affectedRoutes: ["JFK-HEL", "LHR-ANC", "CDG-ARN"],
          recommendation: "Reroute to lower latitudes or delay flights",
          validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours
          radiationLevel: "Elevated",
          gpsAccuracy: "Degraded",
        },
        {
          id: "AV-002",
          type: "GPS Reliability",
          severity: "Medium",
          description: "GPS accuracy reduced by 15-20% in northern regions",
          affectedAreas: ["Northern Europe", "Canada", "Alaska"],
          recommendation: "Use backup navigation systems",
          validUntil: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
          gpsAccuracy: "Reduced",
          autopilotImpact: "Minor",
        },
        {
          id: "AV-003",
          type: "Communication Disruption",
          severity: "Low",
          description: "HF radio blackout zones detected in polar regions",
          affectedFrequencies: ["HF bands 3-30 MHz"],
          recommendation: "Use satellite communications as backup",
          validUntil: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          commsStatus: "Partial Outage",
        },
      ],
      forecasts: {
        polarRoutes: {
          next24h: "Moderate risk, monitor radiation levels",
          next48h: "Low risk, normal operations expected",
          next72h: "Low risk, normal operations expected",
        },
        gpsReliability: {
          next24h: "15-20% degradation in northern regions",
          next48h: "5-10% degradation, improving",
          next72h: "Normal accuracy restored",
        },
        radiationExposure: {
          current: "Elevated above 60°N",
          trend: "Decreasing",
          crewDose: "Within safe limits",
        },
      },
      recommendations: [
        "Activate polar route monitoring protocols",
        "Ensure backup navigation systems are operational",
        "Monitor crew radiation exposure limits",
        "Prepare for potential communication delays",
      ],
    };

    if (includeHistorical) {
      aviationData.historical = [
        {
          date: "2024-01-15",
          events: 3,
          maxSeverity: "High",
          affectedFlights: 45,
        },
        {
          date: "2024-01-14",
          events: 2,
          maxSeverity: "Medium",
          affectedFlights: 23,
        },
        {
          date: "2024-01-13",
          events: 1,
          maxSeverity: "Low",
          affectedFlights: 8,
        },
      ];
    }

    return new Response(JSON.stringify(aviationData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch aviation data",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
