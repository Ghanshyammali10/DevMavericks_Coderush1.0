/**
 * Real anomaly detection implementation for solar data
 */

/**
 * Detects anomalies in a series of numerical values
 * @param {number[]} series - Array of numerical values to analyze
 * @returns {Object} Analysis results including average, threshold, and anomalies
 */
function detectAnomalies(series) {
  // Handle empty or invalid input
  if (!Array.isArray(series) || series.length === 0) {
    return {
      average: 0,
      threshold: 0,
      anomalies: [],
    };
  }

  // Calculate the average of the series
  const average = series.reduce((sum, value) => sum + value, 0) / series.length;
  
  // Set threshold to 1.5 times the average
  const threshold = average * 1.5;
  
  // Identify anomalies (values above the threshold)
  const anomalies = series
    .map((value, index) => ({ index, value }))
    .filter(item => item.value > threshold)
    .map(item => ({
      index: item.index,
      value: item.value,
      type: 'threshold_exceeded'
    }));

  return {
    average,
    threshold,
    anomalies
  };
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const series = Array.isArray(body?.series) ? body.series : [];
    
    // Apply anomaly detection to the provided series
    const result = detectAnomalies(series);
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
