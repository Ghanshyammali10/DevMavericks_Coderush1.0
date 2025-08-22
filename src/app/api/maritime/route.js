export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeHistorical = searchParams.get("historical") === "true";

    // Mock maritime-specific CME data
    const maritimeData = {
      sector: "Navy & Maritime Operations",
      lastUpdated: new Date().toISOString(),
      currentAlerts: [
        {
          id: "MAR-001",
          type: "Underwater Communications Risk",
          severity: "High",
          description:
            "CME-induced interference detected in sonar and underwater communications",
          affectedAreas: ["North Atlantic", "Arctic Ocean", "North Pacific"],
          recommendation: "Activate backup communication protocols",
          validUntil: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
          sonarPerformance: "Degraded",
          underwaterComms: "Unreliable",
        },
        {
          id: "MAR-002",
          type: "Navigation Accuracy Alert",
          severity: "Medium",
          description:
            "GPS degradation affecting vessel navigation in northern waters",
          affectedAreas: ["Above 55°N latitude"],
          recommendation: "Use celestial navigation and backup systems",
          validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          gpsAccuracy: "Reduced by 25%",
          alternativeNav: "Required",
        },
        {
          id: "MAR-003",
          type: "Oceanic Weather-CME Fusion",
          severity: "Low",
          description:
            "Combined marine weather and CME data suggests route optimization opportunities",
          affectedRoutes: ["Transatlantic", "Arctic passages"],
          recommendation: "Consider alternative routing for fuel efficiency",
          validUntil: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          weatherImpact: "Moderate",
          routingEfficiency: "Improved",
        },
      ],
      forecasts: {
        underwaterComms: {
          next24h: "High interference expected in polar regions",
          next48h: "Moderate interference, improving",
          next72h: "Low interference, normal operations",
        },
        navigation: {
          next24h: "GPS accuracy 70-80% in northern regions",
          next48h: "GPS accuracy 85-90%, improving",
          next72h: "Normal GPS accuracy restored",
        },
        weatherCME: {
          next24h: "Enhanced storm activity in affected zones",
          next48h: "Moderate storm activity",
          next72h: "Normal weather patterns",
        },
      },
      recommendations: [
        "Activate underwater communication backup systems",
        "Implement enhanced navigation protocols",
        "Monitor weather-CME fusion models for routing",
        "Prepare for potential communication delays",
      ],
      fleetStatus: {
        totalVessels: 156,
        affectedVessels: 23,
        highRiskZones: 3,
        communicationStatus: "Degraded",
      },
    };

    if (includeHistorical) {
      maritimeData.historical = [
        {
          date: "2024-01-15",
          events: 3,
          maxSeverity: "High",
          affectedVessels: 23,
        },
        {
          date: "2024-01-14",
          events: 2,
          maxSeverity: "Medium",
          affectedVessels: 15,
        },
        {
          date: "2024-01-13",
          events: 1,
          maxSeverity: "Low",
          affectedVessels: 7,
        },
      ];
    }

    return new Response(JSON.stringify(maritimeData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch maritime data",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
