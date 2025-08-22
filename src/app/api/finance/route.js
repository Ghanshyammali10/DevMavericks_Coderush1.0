export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeHistorical = searchParams.get("historical") === "true";

    // Mock finance-specific CME data
    const financeData = {
      sector: "Financial Institutions",
      lastUpdated: new Date().toISOString(),
      currentAlerts: [
        {
          id: "FIN-001",
          type: "Latency Forecast for Trading Systems",
          severity: "High",
          description:
            "Timing disruptions detected in high-frequency trading systems",
          affectedSystems: [
            "HFT platforms",
            "Algorithmic trading",
            "Market data feeds",
          ],
          recommendation:
            "Activate backup systems and implement latency monitoring",
          validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          latencyIncrease: "15-25ms",
          tradingImpact: "Significant",
        },
        {
          id: "FIN-002",
          type: "Server Farm Surge Protection Alert",
          severity: "Medium",
          description: "Geomagnetic spikes may affect data center operations",
          affectedCenters: [
            "Northeast data centers",
            "High-frequency trading facilities",
          ],
          recommendation:
            "Activate surge protection and monitor power stability",
          validUntil: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
          surgeRisk: "Elevated",
          protectionStatus: "Active",
        },
        {
          id: "FIN-003",
          type: "Risk Modeling Dashboard",
          severity: "Low",
          description:
            "CME impact assessment on insurance, investment, and infrastructure portfolios",
          affectedPortfolios: [
            "Infrastructure funds",
            "Technology stocks",
            "Insurance portfolios",
          ],
          recommendation: "Review risk models and adjust portfolio allocations",
          validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          riskLevel: "Moderate",
          portfolioImpact: "Minimal",
        },
      ],
      forecasts: {
        tradingLatency: {
          next24h: "15-25ms increase in affected regions",
          next48h: "5-10ms increase, improving",
          next72h: "Normal latency restored",
        },
        dataCenterStability: {
          next24h: "Elevated surge risk, monitor closely",
          next48h: "Moderate risk, protection active",
          next72h: "Low risk, normal operations",
        },
        marketImpact: {
          next24h: "Potential trading delays in affected systems",
          next48h: "Minimal impact expected",
          next72h: "Normal trading operations",
        },
      },
      recommendations: [
        "Activate backup trading systems and latency monitoring",
        "Ensure all surge protection systems are operational",
        "Review and adjust risk models for CME impact",
        "Monitor data center performance continuously",
      ],
      marketStatus: {
        totalTradingSystems: 89,
        affectedSystems: 23,
        highRiskSystems: 7,
        backupSystems: "Operational",
      },
    };

    if (includeHistorical) {
      financeData.historical = [
        {
          date: "2024-01-15",
          events: 3,
          maxSeverity: "High",
          affectedSystems: 23,
        },
        {
          date: "2024-01-14",
          events: 2,
          maxSeverity: "Medium",
          affectedSystems: 15,
        },
        {
          date: "2024-01-13",
          events: 1,
          maxSeverity: "Low",
          affectedSystems: 8,
        },
      ];
    }

    return new Response(JSON.stringify(financeData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch finance data",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
