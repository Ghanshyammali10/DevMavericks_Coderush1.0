// Test CME API to verify data generation
export async function GET() {
  try {
    // Import the simulator to get test data
    const { adityaL1Simulator } = await import("@/lib/aditya-l1/simulator");

    // Get simulator CME events
    const simulatorEvents = adityaL1Simulator.cmeEvents;

    // Generate some additional test events with fixed timestamps
    const baseTime = new Date("2024-08-22T20:00:00Z").getTime();
    const testEvents = [
      {
        id: "TEST-CME-001",
        startTime: new Date(baseTime - 1 * 60 * 60 * 1000).toISOString(),
        source: "Test API",
        latitude: "10.5",
        longitude: "45.2",
        speed: 750,
        speedKmSec: 750,
        halfAngle: 40,
        earthImpact: true,
        etaHours: 36,
        confidence: 0.85,
        classification: "High",
        note: "Test CME event - Earth impact expected",
        isMostAccurate: true,
        catalog: "TEST_CATALOG",
      },
      {
        id: "TEST-CME-002",
        startTime: new Date(baseTime - 3 * 60 * 60 * 1000).toISOString(),
        source: "Test API",
        latitude: "-15.3",
        longitude: "120.8",
        speed: 550,
        speedKmSec: 550,
        halfAngle: 30,
        earthImpact: false,
        etaHours: null,
        confidence: 0.72,
        classification: "Medium",
        note: "Test CME event - no Earth impact",
        isMostAccurate: false,
        catalog: "TEST_CATALOG",
      },
    ];

    // Combine simulator and test events
    const allEvents = [...simulatorEvents, ...testEvents];

    return new Response(
      JSON.stringify({
        success: true,
        source: "TEST_CME_API",
        timestamp: new Date().toISOString(),
        count: allEvents.length,
        events: allEvents,
        simulatorCount: simulatorEvents.length,
        testCount: testEvents.length,
        note: "Test CME data for debugging",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Test CME API error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        note: "Test CME API failed",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
