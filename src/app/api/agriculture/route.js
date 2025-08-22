export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeHistorical = searchParams.get("historical") === "true";

    // Mock agriculture-specific CME data
    const agricultureData = {
      sector: "Agriculture & Farming",
      lastUpdated: new Date().toISOString(),
      currentAlerts: [
        {
          id: "AGR-001",
          type: "Rainfall Anomaly Predictor",
          severity: "Medium",
          description:
            "CME data suggests drought risk in Midwest regions over next 30 days",
          affectedAreas: ["Iowa", "Illinois", "Indiana", "Ohio"],
          recommendation:
            "Adjust irrigation schedules and prepare drought-resistant measures",
          validUntil: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          droughtProbability: "65%",
          rainfallDeficit: "Expected 40% below normal",
        },
        {
          id: "AGR-002",
          type: "Machinery Disruption Alert",
          severity: "Low",
          description: "GPS accuracy reduced in northern farming regions",
          affectedAreas: ["North Dakota", "Minnesota", "Wisconsin"],
          recommendation: "Use manual guidance or backup positioning systems",
          validUntil: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
          gpsAccuracy: "Reduced by 15%",
          smartTractorImpact: "Minor",
        },
        {
          id: "AGR-003",
          type: "Pest & Disease Risk Index",
          severity: "Medium",
          description:
            "UV radiation changes post-CME may affect pest populations",
          affectedCrops: ["Corn", "Soybeans", "Wheat"],
          recommendation:
            "Monitor pest populations and adjust treatment schedules",
          validUntil: new Date(
            Date.now() + 14 * 24 * 60 * 60 * 1000
          ).toISOString(),
          pestRisk: "Elevated",
          diseaseRisk: "Moderate",
        },
      ],
      forecasts: {
        rainfall: {
          next7d: "Below normal precipitation expected",
          next14d: "Drought conditions developing",
          next30d: "Extended dry period likely",
        },
        machinery: {
          next24h: "GPS accuracy 85-90% in affected regions",
          next48h: "GPS accuracy improving to 95%",
          next72h: "Normal GPS accuracy restored",
        },
        pestDisease: {
          next7d: "Monitor for early pest emergence",
          next14d: "Increased pest activity expected",
          next30d: "Peak pest pressure period",
        },
      },
      recommendations: [
        "Implement water conservation measures",
        "Activate backup GPS systems for precision farming",
        "Increase pest monitoring frequency",
        "Prepare drought-resistant crop varieties",
      ],
      regionalImpact: {
        highRisk: ["Midwest", "Great Plains"],
        moderateRisk: ["Northeast", "Southeast"],
        lowRisk: ["West Coast", "Southwest"],
      },
    };

    if (includeHistorical) {
      agricultureData.historical = [
        {
          date: "2024-01-15",
          events: 3,
          maxSeverity: "Medium",
          affectedAcres: 2500000,
        },
        {
          date: "2024-01-14",
          events: 2,
          maxSeverity: "Low",
          affectedAcres: 1200000,
        },
        {
          date: "2024-01-13",
          events: 1,
          maxSeverity: "Low",
          affectedAcres: 500000,
        },
      ];
    }

    return new Response(JSON.stringify(agricultureData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch agriculture data",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
