export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeHistorical = searchParams.get("historical") === "true";

    // Mock construction-specific CME data
    const constructionData = {
      sector: "Construction & Infrastructure",
      lastUpdated: new Date().toISOString(),
      currentAlerts: [
        {
          id: "CON-001",
          type: "Precision Equipment Risk Alert",
          severity: "Medium",
          description:
            "GPS-guided cranes and survey tools may experience accuracy issues",
          affectedEquipment: [
            "GPS-guided cranes",
            "Survey equipment",
            "Drone mapping systems",
          ],
          recommendation: "Use manual guidance or backup positioning systems",
          validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          gpsAccuracy: "Reduced by 20%",
          safetyRisk: "Moderate",
        },
        {
          id: "CON-002",
          type: "Grid Surge Forecast",
          severity: "High",
          description:
            "Transformer overload risks detected at construction sites",
          affectedSites: ["Northeast construction zones", "High-rise projects"],
          recommendation:
            "Activate surge protection and monitor power consumption",
          validUntil: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
          surgeRisk: "High",
          protectionStatus: "Required",
        },
        {
          id: "CON-003",
          type: "Logistics Planning Assistant",
          severity: "Low",
          description:
            "Optimal material delivery windows identified based on CME activity",
          affectedOperations: [
            "Material transport",
            "Equipment delivery",
            "Supply chain",
          ],
          recommendation:
            "Optimize delivery schedules for reduced risk periods",
          validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          deliveryRisk: "Low",
          optimization: "Recommended",
        },
      ],
      forecasts: {
        equipmentAccuracy: {
          next24h: "GPS accuracy 80-85% in affected regions",
          next48h: "GPS accuracy improving to 90-95%",
          next72h: "Normal GPS accuracy restored",
        },
        powerStability: {
          next24h: "High surge risk, activate protection",
          next48h: "Moderate risk, monitor closely",
          next72h: "Low risk, normal operations",
        },
        logistics: {
          next24h: "Optimal delivery windows available",
          next48h: "Standard delivery protocols",
          next72h: "Enhanced delivery opportunities",
        },
      },
      recommendations: [
        "Implement backup positioning systems for precision equipment",
        "Activate all surge protection measures",
        "Optimize material delivery schedules",
        "Monitor GPS accuracy for safety-critical operations",
      ],
      siteStatus: {
        totalSites: 89,
        affectedSites: 23,
        highRiskSites: 7,
        safetyProtocols: "Active",
      },
    };

    if (includeHistorical) {
      constructionData.historical = [
        {
          date: "2024-01-15",
          events: 3,
          maxSeverity: "High",
          affectedSites: 23,
        },
        {
          date: "2024-01-14",
          events: 2,
          maxSeverity: "Medium",
          affectedSites: 15,
        },
        {
          date: "2024-01-13",
          events: 1,
          maxSeverity: "Low",
          affectedSites: 8,
        },
      ];
    }

    return new Response(JSON.stringify(constructionData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch construction data",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
