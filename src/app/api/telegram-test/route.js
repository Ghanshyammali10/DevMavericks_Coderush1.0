import { testTelegramConnection, sendDailySummary } from "@/lib/telegram";

export async function GET() {
  try {
    const result = await testTelegramConnection();

    return new Response(
      JSON.stringify({
        success: result.success,
        message: result.success
          ? "Telegram test message sent successfully"
          : "Failed to send Telegram test message",
        details: result,
        timestamp: new Date().toISOString(),
      }),
      {
        status: result.success ? 200 : 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Telegram test API error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        message: "Telegram test failed",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, anomalies = [], events = [] } = body;

    let result;
    if (type === "daily-summary") {
      result = await sendDailySummary(anomalies, events);
    } else {
      result = await testTelegramConnection();
    }

    return new Response(
      JSON.stringify({
        success: result.success,
        message: result.success
          ? `${
              type === "daily-summary" ? "Daily summary" : "Test message"
            } sent successfully`
          : "Failed to send message",
        details: result,
        timestamp: new Date().toISOString(),
      }),
      {
        status: result.success ? 200 : 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Telegram API error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        message: "Telegram operation failed",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
