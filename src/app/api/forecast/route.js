import { forecastImpact } from "@/lib/cme/placeholders";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const event = body?.event || {};
  const forecast = forecastImpact(event);
  return new Response(JSON.stringify({ forecast }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
