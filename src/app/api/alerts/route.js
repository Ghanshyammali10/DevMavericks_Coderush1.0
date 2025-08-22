// Simple in-memory placeholder store; replace with DB + delivery channels
let alerts = [];

export async function GET() {
  return new Response(JSON.stringify({ alerts }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const alert = {
    id: `ALERT-${Date.now()}`,
    severity: body?.severity || "medium",
    title: body?.title || "CME Alert (placeholder)",
    createdAt: new Date().toISOString(),
    payload: body || {},
  };
  alerts.unshift(alert);
  return new Response(JSON.stringify({ ok: true, alert }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
