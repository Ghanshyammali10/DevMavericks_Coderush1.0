// CACTus integration with NASA API
import { fetchCmeData } from '@/lib/nasa/api';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate') || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const endDate = searchParams.get('endDate') || new Date().toISOString().split('T')[0];
    
    // Attempt to fetch real data from NASA API
    try {
      const cmeData = await fetchCmeData({ startDate, endDate });
      
      return new Response(
        JSON.stringify({
          ok: true,
          source: "NASA DONKI API",
          data: cmeData
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (apiError) {
      console.error('NASA API error:', apiError);
      
      // Fallback to placeholder data if API call fails
      return new Response(
        JSON.stringify({
          ok: true,
          source: "CACTus (Fallback)",
          note: "Using fallback data. NASA API error: " + apiError.message,
          fallback: true,
          data: [
            {
              activityID: "PLACEHOLDER-CME-001",
              catalog: "PLACEHOLDER",
              startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              sourceLocation: "N12E25",
              coordinates: { latitude: 12, longitude: 25 },
              speed: 1200,
              halfAngle: 45,
              earthImpact: true,
              classification: "EARTH-DIRECTED_CME",
              activeRegionNum: 13245,
              note: "This is placeholder data when NASA API is unavailable"
            },
            {
              activityID: "PLACEHOLDER-CME-002",
              catalog: "PLACEHOLDER",
              startTime: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
              sourceLocation: "S08W30",
              coordinates: { latitude: -8, longitude: -30 },
              speed: 800,
              halfAngle: 30,
              earthImpact: false,
              classification: "SIDEWAYS_CME",
              activeRegionNum: 13246,
              note: "This is placeholder data when NASA API is unavailable"
            },
            {
              activityID: "PLACEHOLDER-CME-003",
              catalog: "PLACEHOLDER",
              startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              sourceLocation: "N20E40",
              coordinates: { latitude: 20, longitude: 40 },
              speed: 1500,
              halfAngle: 60,
              earthImpact: true,
              classification: "EARTH-DIRECTED_EXTREME_CME",
              activeRegionNum: 13247,
              note: "This is placeholder data when NASA API is unavailable"
            }
          ]
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: error.message
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
