import { estimateDirection, classifyStrength } from "@/lib/cme/placeholders";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const event = body?.event || {};
  const direction = estimateDirection(event);
  const strength = classifyStrength(event);
  return new Response(JSON.stringify({ direction, strength }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
