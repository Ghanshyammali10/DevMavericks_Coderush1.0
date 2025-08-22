export async function GET() {
  return new Response(
    JSON.stringify({
      nasa_api_key: process.env.NASA_API_KEY,
      public_key: process.env.NASA_API_KEY
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}