export async function GET() {
  return new Response(
    JSON.stringify({
      nasa_api_key: process.env.NASA_API_KEY || 'Not found',
      public_key: process.env.NEXT_PUBLIC_NASA_API_KEY || 'Not found'
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}