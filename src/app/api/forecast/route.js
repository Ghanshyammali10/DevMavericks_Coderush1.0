import {
  forecastImpact,
  calculateGeomagneticStormIntensity,
  predictSectorImpacts,
} from "@/lib/cme/placeholders";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const event = body?.event || {};

    // Generate comprehensive forecast
    const forecast = forecastImpact(event);
    const stormIntensity = calculateGeomagneticStormIntensity(event);
    const sectorImpacts = predictSectorImpacts(event);

    // Enhanced response with detailed predictions
    const enhancedForecast = {
      ...forecast,
      stormIntensity,
      sectorImpacts,
      timestamp: new Date().toISOString(),
      confidence: event.isMostAccurate ? 0.8 : 0.6,
      recommendations: generateRecommendations(event, forecast, stormIntensity),
    };

    return new Response(JSON.stringify({ forecast: enhancedForecast }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Forecast API error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to generate forecast",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const speed = searchParams.get("speed") || "500";
    const halfAngle = searchParams.get("halfAngle") || "30";
    const latitude = searchParams.get("latitude") || "0";
    const longitude = searchParams.get("longitude") || "0";

    // Create mock event from query parameters
    const mockEvent = {
      speed: parseFloat(speed),
      halfAngle: parseFloat(halfAngle),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      isMostAccurate: true,
    };

    // Generate forecast
    const forecast = forecastImpact(mockEvent);
    const stormIntensity = calculateGeomagneticStormIntensity(mockEvent);
    const sectorImpacts = predictSectorImpacts(mockEvent);

    const enhancedForecast = {
      ...forecast,
      stormIntensity,
      sectorImpacts,
      timestamp: new Date().toISOString(),
      confidence: 0.8,
      recommendations: generateRecommendations(
        mockEvent,
        forecast,
        stormIntensity
      ),
    };

    return new Response(JSON.stringify({ forecast: enhancedForecast }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Forecast GET API error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to generate forecast",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

function generateRecommendations(event, forecast, stormIntensity) {
  const recommendations = [];

  if (forecast.likelihood > 0.7) {
    recommendations.push(
      "High probability of Earth impact - activate emergency protocols"
    );
    recommendations.push("Notify all critical infrastructure operators");
    recommendations.push("Prepare for potential power grid disruptions");
  } else if (forecast.likelihood > 0.4) {
    recommendations.push(
      "Moderate probability of Earth impact - monitor closely"
    );
    recommendations.push(
      "Alert satellite operators to prepare for potential issues"
    );
    recommendations.push(
      "Notify aviation authorities about potential GPS disruptions"
    );
  }

  if (stormIntensity.intensity === "G4" || stormIntensity.intensity === "G3") {
    recommendations.push(
      "Severe geomagnetic storm expected - activate surge protection"
    );
    recommendations.push("Prepare for potential communication disruptions");
    recommendations.push("Monitor power grid stability closely");
  }

  if (parseFloat(event.speed) > 800) {
    recommendations.push("High-speed CME detected - expect rapid arrival");
    recommendations.push(
      "Prepare for potential satellite communication issues"
    );
  }

  if (parseFloat(event.halfAngle) > 45) {
    recommendations.push("Wide-angle CME - broad impact area expected");
    recommendations.push("Monitor multiple sectors for potential effects");
  }

  return recommendations.length > 0
    ? recommendations
    : ["Continue monitoring - no immediate action required"];
}
