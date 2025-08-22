// Placeholder endpoint for NOAA SWx. Replace with actual NOAA API calls.
export async function GET() {
  return new Response(
    JSON.stringify({
      ok: true,
      source: "NOAA",
      note: "Placeholder integration",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
