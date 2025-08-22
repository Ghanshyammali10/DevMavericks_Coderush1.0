export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeHistorical = searchParams.get("historical") === "true";

    // Mock education-specific CME data
    const educationData = {
      sector: "Students & Educational Institutions",
      lastUpdated: new Date().toISOString(),
      currentAlerts: [
        {
          id: "EDU-001",
          type: "Interactive CME Dashboards",
          severity: "Low",
          description:
            "Real-time CME data available for physics, astronomy, and earth science education",
          affectedSubjects: [
            "Physics",
            "Astronomy",
            "Earth Science",
            "Space Weather",
          ],
          recommendation:
            "Integrate CME data into classroom activities and research projects",
          validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          dataAvailability: "High",
          educationalValue: "Excellent",
        },
        {
          id: "EDU-002",
          type: "Aurora Visibility Alerts",
          severity: "Low",
          description:
            "Enhanced aurora activity expected in northern regions for observational learning",
          affectedRegions: [
            "Northern US",
            "Canada",
            "Northern Europe",
            "Alaska",
          ],
          recommendation:
            "Plan field trips and observational activities during peak aurora periods",
          validUntil: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
          auroraActivity: "High",
          visibility: "Excellent",
        },
        {
          id: "EDU-003",
          type: "STEM Project Simulators",
          severity: "Low",
          description:
            "Interactive tools available for modeling CME effects on real-world systems",
          affectedProjects: [
            "Solar storm modeling",
            "Satellite impact studies",
            "Grid stability analysis",
          ],
          recommendation:
            "Use simulators for hands-on learning and research projects",
          validUntil: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
          simulatorAvailability: "Active",
          projectComplexity: "Variable",
        },
      ],
      forecasts: {
        educationalData: {
          next24h: "High-quality CME data available for classroom use",
          next48h: "Continued data availability with enhanced features",
          next72h: "Comprehensive dataset for extended projects",
        },
        auroraActivity: {
          next24h: "Peak aurora activity in northern regions",
          next48h: "Moderate activity, good for observations",
          next72h: "Low activity, normal conditions",
        },
        simulatorAccess: {
          next24h: "All simulators operational with real-time data",
          next48h: "Enhanced features and additional datasets",
          next72h: "Full functionality with historical data access",
        },
      },
      recommendations: [
        "Integrate CME data into science curricula",
        "Plan aurora observation activities",
        "Utilize STEM simulators for hands-on learning",
        "Encourage student research projects using real data",
      ],
      educationalResources: {
        totalDatasets: 45,
        availableSimulators: 12,
        lessonPlans: 23,
        researchProjects: 8,
      },
    };

    if (includeHistorical) {
      educationData.historical = [
        {
          date: "2024-01-15",
          events: 3,
          maxSeverity: "Low",
          activeUsers: 156,
        },
        {
          date: "2024-01-14",
          events: 2,
          maxSeverity: "Low",
          activeUsers: 134,
        },
        {
          date: "2024-01-13",
          events: 1,
          maxSeverity: "Low",
          activeUsers: 98,
        },
      ];
    }

    return new Response(JSON.stringify(educationData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch education data",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
