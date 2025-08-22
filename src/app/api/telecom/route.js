export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeHistorical = searchParams.get("historical") === "true";

    // Mock telecom-specific CME data
    const telecomData = {
      sector: "Telecom & Internet Providers",
      lastUpdated: new Date().toISOString(),
      currentAlerts: [
        {
          id: "TEL-001",
          type: "Signal Degradation Predictor",
          severity: "High",
          description:
            "CME-induced drops in satellite and fiber performance detected",
          affectedServices: [
            "Satellite internet",
            "Fiber optic networks",
            "Wireless communications",
          ],
          recommendation:
            "Activate backup networks and implement traffic rerouting",
          validUntil: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
          signalQuality: "Degraded",
          networkPerformance: "Reduced by 30%",
        },
        {
          id: "TEL-002",
          type: "Maintenance Crew Alert System",
          severity: "Medium",
          description: "Preemptive alerts for outage-prone zones identified",
          affectedZones: ["Northeast US", "Eastern Canada", "Northern Europe"],
          recommendation: "Deploy maintenance crews to high-risk areas",
          validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          outageRisk: "Elevated",
          crewDeployment: "Recommended",
        },
        {
          id: "TEL-003",
          type: "AI-Driven Network Rerouting",
          severity: "Low",
          description:
            "Alternate network paths suggested to maintain service continuity",
          affectedRoutes: [
            "Transatlantic cables",
            "Satellite links",
            "Terrestrial networks",
          ],
          recommendation: "Implement AI-suggested routing optimizations",
          validUntil: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          routingEfficiency: "Improved",
          serviceContinuity: "Maintained",
        },
      ],
      forecasts: {
        signalQuality: {
          next24h: "Continued degradation in affected regions",
          next48h: "Gradual improvement expected",
          next72h: "Normal signal quality restored",
        },
        networkPerformance: {
          next24h: "Performance at 70-80% of normal",
          next48h: "Performance improving to 85-90%",
          next72h: "Normal performance restored",
        },
        outageRisk: {
          next24h: "High risk in northern regions",
          next48h: "Moderate risk, monitoring required",
          next72h: "Low risk, normal operations",
        },
      },
      recommendations: [
        "Activate all backup network systems",
        "Deploy maintenance crews to high-risk zones",
        "Implement AI-driven traffic optimization",
        "Monitor network performance continuously",
      ],
      networkStatus: {
        totalNodes: 1247,
        affectedNodes: 89,
        highRiskNodes: 23,
        backupSystems: "Active",
      },
    };

    if (includeHistorical) {
      telecomData.historical = [
        {
          date: "2024-01-15",
          events: 3,
          maxSeverity: "High",
          affectedNodes: 89,
        },
        {
          date: "2024-01-14",
          events: 2,
          maxSeverity: "Medium",
          affectedNodes: 56,
        },
        {
          date: "2024-01-13",
          events: 1,
          maxSeverity: "Low",
          affectedNodes: 23,
        },
      ];
    }

    return new Response(JSON.stringify(telecomData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch telecom data",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
