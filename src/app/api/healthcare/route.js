export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeHistorical = searchParams.get("historical") === "true";

    // Mock healthcare-specific CME data
    const healthcareData = {
      sector: "Healthcare & Emergency Services",
      lastUpdated: new Date().toISOString(),
      currentAlerts: [
        {
          id: "HC-001",
          type: "Medical Equipment Surge Alert",
          severity: "High",
          description: "Power instability risks detected in affected regions",
          affectedAreas: ["Northeast US", "Eastern Canada"],
          recommendation:
            "Activate surge protection protocols and backup power systems",
          validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          powerStability: "Unstable",
          criticalEquipment: "At Risk",
        },
        {
          id: "HC-002",
          type: "Ambulance GPS Reliability Tracker",
          severity: "Medium",
          description:
            "GPS accuracy reduced in northern regions affecting emergency response",
          affectedAreas: ["Above 45°N latitude"],
          recommendation:
            "Use backup navigation systems and dispatch coordination",
          validUntil: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
          gpsAccuracy: "Reduced by 20%",
          responseTime: "Potentially Delayed",
        },
        {
          id: "HC-003",
          type: "Emergency Response Optimization",
          severity: "Low",
          description:
            "CME impact severity zones identified for response prioritization",
          affectedZones: [
            "High Impact: Northeast",
            "Medium Impact: Midwest",
            "Low Impact: Southwest",
          ],
          recommendation: "Prioritize resources to high-impact zones",
          validUntil: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          priorityLevel: "High",
          resourceAllocation: "Optimized",
        },
      ],
      forecasts: {
        powerStability: {
          next24h: "Unstable conditions in affected regions",
          next48h: "Improving stability, monitor closely",
          next72h: "Normal power conditions restored",
        },
        gpsReliability: {
          next24h: "GPS accuracy 80-85% in northern regions",
          next48h: "GPS accuracy 90-95%, improving",
          next72h: "Normal GPS accuracy restored",
        },
        emergencyResponse: {
          next24h: "Enhanced coordination required",
          next48h: "Standard response protocols",
          next72h: "Normal emergency operations",
        },
      },
      recommendations: [
        "Activate all surge protection systems",
        "Ensure backup power systems are operational",
        "Implement enhanced GPS coordination protocols",
        "Prioritize emergency response in high-impact zones",
      ],
      hospitalStatus: {
        totalFacilities: 234,
        affectedFacilities: 45,
        criticalEquipment: "Protected",
        backupPower: "Operational",
      },
    };

    if (includeHistorical) {
      healthcareData.historical = [
        {
          date: "2024-01-15",
          events: 3,
          maxSeverity: "High",
          affectedFacilities: 45,
        },
        {
          date: "2024-01-14",
          events: 2,
          maxSeverity: "Medium",
          affectedFacilities: 28,
        },
        {
          date: "2024-01-13",
          events: 1,
          maxSeverity: "Low",
          affectedFacilities: 12,
        },
      ];
    }

    return new Response(JSON.stringify(healthcareData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch healthcare data",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
