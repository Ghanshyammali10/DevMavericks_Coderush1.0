// Generate fallback CME data when NASA API is unavailable
function generateFallbackCMEData() {
  const now = new Date();
  const events = [];

  // Generate 5 mock CME events with realistic data
  for (let i = 0; i < 5; i++) {
    const eventDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000); // One event per day
    const isMostAccurate = i % 2 === 0; // Alternate between accurate and estimate

    events.push({
      time21_5: eventDate.toISOString().replace("Z", ""),
      latitude: Math.round((Math.random() * 60 - 30) * 10) / 10, // -30 to +30 degrees
      longitude: Math.round((Math.random() * 180 - 90) * 10) / 10, // -90 to +90 degrees
      speed: Math.round(400 + Math.random() * 800), // 400-1200 km/s
      halfAngle: Math.round(10 + Math.random() * 50), // 10-60 degrees
      isMostAccurate: isMostAccurate,
      note: isMostAccurate
        ? "Fallback data - high confidence"
        : "Fallback data - estimate",
    });
  }

  return events;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Defaults matching the request; allow overrides via query params
    const startDate = searchParams.get("startDate") || "2016-09-01";
    const endDate = searchParams.get("endDate") || "2016-09-30";
    const mostAccurateOnly = searchParams.get("mostAccurateOnly") ?? "true";
    const speed = searchParams.get("speed") || "500";
    const halfAngle = searchParams.get("halfAngle") || "30";
    const catalog = searchParams.get("catalog") || "ALL";
    const useFallback = searchParams.get("fallback") === "true";

    // If fallback is explicitly requested, skip the NASA API call
    if (useFallback) {
      const fallbackEvents = generateFallbackCMEData();
      return new Response(
        JSON.stringify({
          params: {
            startDate,
            endDate,
            mostAccurateOnly: String(mostAccurateOnly),
            speed: String(speed),
            halfAngle: String(halfAngle),
            catalog,
          },
          count: fallbackEvents.length,
          events: fallbackEvents,
          isFallback: true,
          source: "FALLBACK_DATA",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Prefer private server env; fallback to public env; finally NASA DEMO_KEY for convenience
    const apiKey =
      process.env.NASA_API_KEY ||
      process.env.NEXT_PUBLIC_NASA_API_KEY ||
      "DEMO_KEY";

    // Check if we've hit the API recently to avoid rate limiting
    const cacheKey = `nasa_api_last_call_${startDate}_${endDate}`;
    const lastCallTime = global[cacheKey] || 0;
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    // If we've called the API in the last 5 seconds, use cached data to avoid rate limiting
    // DEMO_KEY is limited to 30 requests per hour / 50 per day
    if (apiKey === "DEMO_KEY" && timeSinceLastCall < 5000) {
      console.log("Using fallback data to avoid NASA API rate limiting");
      const fallbackEvents = generateFallbackCMEData();
      return new Response(
        JSON.stringify({
          params: {
            startDate,
            endDate,
            mostAccurateOnly: String(mostAccurateOnly),
            speed: String(speed),
            halfAngle: String(halfAngle),
            catalog,
          },
          count: fallbackEvents.length,
          events: fallbackEvents,
          isFallback: true,
          source: "FALLBACK_RATE_LIMIT",
          error: "Rate limiting protection active - try again in a few seconds",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update the last call time
    global[cacheKey] = now;

    // Check if we have a cached response that's still valid
    const responseCacheKey = `nasa_api_response_${startDate}_${endDate}`;
    const cachedResponse = global[responseCacheKey];

    if (cachedResponse && cachedResponse.expiresAt > Date.now()) {
      console.log("Using cached NASA API response");
      return new Response(
        JSON.stringify({
          params: {
            startDate,
            endDate,
            mostAccurateOnly: String(mostAccurateOnly),
            speed: String(speed),
            halfAngle: String(halfAngle),
            catalog,
          },
          count: cachedResponse.data.length,
          events: cachedResponse.data,
          isFallback: false,
          source: "NASA_DONKI_CACHED",
          cachedAt: new Date(cachedResponse.timestamp).toISOString(),
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    const url = new URL("https://api.nasa.gov/DONKI/CMEAnalysis");
    url.searchParams.set("startDate", startDate);
    url.searchParams.set("endDate", endDate);
    url.searchParams.set("mostAccurateOnly", String(mostAccurateOnly));
    url.searchParams.set("speed", String(speed));
    url.searchParams.set("halfAngle", String(halfAngle));
    url.searchParams.set("catalog", catalog);
    url.searchParams.set("api_key", apiKey);

    try {
      console.log(
        "Calling NASA DONKI API with key:",
        apiKey === "DEMO_KEY" ? "DEMO_KEY" : "[CUSTOM KEY]"
      );

      const res = await fetch(url.toString(), {
        next: { revalidate: 0 },
        cache: "no-store",
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      const cleaned = Array.isArray(data)
        ? data.map((item) => ({
            time21_5: item?.time21_5 ?? null,
            latitude: item?.latitude ?? null,
            longitude: item?.longitude ?? null,
            speed: item?.speed ?? null,
            halfAngle: item?.halfAngle ?? null,
            isMostAccurate: item?.isMostAccurate ?? null,
            note: item?.note ?? "",
          }))
        : [];

      // Store successful response in cache for 1 hour
      const responseCacheKey = `nasa_api_response_${startDate}_${endDate}`;
      global[responseCacheKey] = {
        data: cleaned,
        timestamp: Date.now(),
        expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour cache
      };

      return new Response(
        JSON.stringify({
          params: {
            startDate,
            endDate,
            mostAccurateOnly: String(mostAccurateOnly),
            speed: String(speed),
            halfAngle: String(halfAngle),
            catalog,
          },
          count: cleaned.length,
          events: cleaned,
          isFallback: false,
          source: "NASA_DONKI",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        }
      );
    } catch (apiError) {
      console.warn(
        "NASA DONKI API error, using fallback data:",
        apiError.message
      );

      // Use fallback data when the API call fails
      const fallbackEvents = generateFallbackCMEData();
      return new Response(
        JSON.stringify({
          params: {
            startDate,
            endDate,
            mostAccurateOnly: String(mostAccurateOnly),
            speed: String(speed),
            halfAngle: String(halfAngle),
            catalog,
          },
          count: fallbackEvents.length,
          events: fallbackEvents,
          isFallback: true,
          source: "FALLBACK_DATA",
          error: "NASA API unavailable: " + apiError.message,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (err) {
    console.error("CME API error:", err);

    // Even if everything fails, return fallback data
    try {
      const fallbackEvents = generateFallbackCMEData();
      return new Response(
        JSON.stringify({
          count: fallbackEvents.length,
          events: fallbackEvents,
          isFallback: true,
          source: "FALLBACK_EMERGENCY",
          error: "Using emergency fallback data",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (fallbackError) {
      return new Response(
        JSON.stringify({
          error: "Failed to generate CME data",
          details: String(err),
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
}
