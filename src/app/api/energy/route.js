export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeHistorical = searchParams.get("historical") === "true";

    // Mock energy-specific CME data
    const energyData = {
      sector: "Energy Sector (Solar, Grid, Nuclear)",
      lastUpdated: new Date().toISOString(),
      currentAlerts: [
        {
          id: "ENG-001",
          type: "Transformer Overload Predictor",
          severity: "High",
          description:
            "CME-induced current spikes detected in power grid transformers",
          affectedAreas: [
            "Northeast power grid",
            "Eastern Canada",
            "Northern Europe",
          ],
          recommendation:
            "Activate grid protection systems and monitor transformer loads",
          validUntil: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
          currentSpike: "Elevated",
          protectionStatus: "Required",
        },
        {
          id: "ENG-002",
          type: "Solar Panel Efficiency Tracker",
          severity: "Medium",
          description:
            "Radiation changes affecting solar panel output expectations",
          affectedSystems: [
            "Utility-scale solar farms",
            "Residential solar installations",
          ],
          recommendation:
            "Adjust output forecasts and grid integration planning",
          validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          efficiencyChange: "-5 to -10%",
          gridImpact: "Moderate",
        },
        {
          id: "ENG-003",
          type: "Smart Load Balancing Assistant",
          severity: "Low",
          description:
            "Energy redistribution recommendations during grid instability",
          affectedGrids: ["Northeast", "Midwest", "Eastern Canada"],
          recommendation: "Implement suggested load balancing strategies",
          validUntil: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          balancingEfficiency: "Improved",
          gridStability: "Enhanced",
        },
      ],
      forecasts: {
        gridStability: {
          next24h: "High risk of transformer overloads",
          next48h: "Moderate risk, protection systems active",
          next72h: "Low risk, normal operations",
        },
        solarEfficiency: {
          next24h: "5-10% reduction in solar output",
          next48h: "2-5% reduction, improving",
          next72h: "Normal solar efficiency restored",
        },
        loadBalancing: {
          next24h: "Enhanced load balancing required",
          next48h: "Standard balancing protocols",
          next72h: "Optimal grid performance",
        },
      },
      recommendations: [
        "Activate all grid protection systems",
        "Monitor transformer loads continuously",
        "Adjust solar output forecasts",
        "Implement smart load balancing strategies",
      ],
      gridStatus: {
        totalTransformers: 567,
        affectedTransformers: 89,
        highRiskTransformers: 23,
        protectionSystems: "Active",
      },
    };

    if (includeHistorical) {
      energyData.historical = [
        {
          date: "2024-01-15",
          events: 3,
          maxSeverity: "High",
          affectedTransformers: 89,
        },
        {
          date: "2024-01-14",
          events: 2,
          maxSeverity: "Medium",
          affectedTransformers: 56,
        },
        {
          date: "2024-01-13",
          events: 1,
          maxSeverity: "Low",
          affectedTransformers: 23,
        },
      ];
    }

    return new Response(JSON.stringify(energyData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch energy data",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
