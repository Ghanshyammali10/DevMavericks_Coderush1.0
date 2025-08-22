// Placeholder endpoint for CACTus integration. Replace fetch with real API.
export async function GET() {
  return new Response(
    JSON.stringify({
      ok: true,
      source: "CACTus",
      note: "Placeholder integration",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
