// SWPC Solar Wind Data Parser
// Parses real-time solar wind data from SWPC text files

export function parseSWPCData(rawText) {
  const lines = rawText.trim().split("\n");
  const data = [];

  // Find the data section by looking for lines with numbers
  let dataStartIndex = 0;
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    const line = lines[i].trim();
    if (line && /^\d{4}-\d{2}-\d{2}/.test(line)) {
      dataStartIndex = i;
      break;
    }
  }

  // Process data lines
  for (let i = dataStartIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(/\s+/);
    if (parts.length < 6) continue; // Need at least date, time, and some data

    try {
      // Handle different date formats
      let timestamp;
      if (parts[0].includes("-")) {
        // Format: YYYY-MM-DD HH:MM:SS
        timestamp = new Date(parts[0] + " " + parts[1]);
      } else if (parts[0].includes("/")) {
        // Format: MM/DD/YYYY HH:MM:SS
        const dateParts = parts[0].split("/");
        const timeParts = parts[1].split(":");
        timestamp = new Date(
          parseInt(dateParts[2]), // year
          parseInt(dateParts[0]) - 1, // month (0-indexed)
          parseInt(dateParts[1]), // day
          parseInt(timeParts[0]), // hour
          parseInt(timeParts[1]), // minute
          parseInt(timeParts[2] || 0) // second
        );
      } else {
        // Skip if we can't parse the date
        continue;
      }

      // Validate timestamp
      if (isNaN(timestamp.getTime())) {
        continue;
      }

      const entry = {
        timestamp,
        density: parseFloat(parts[2]) || null, // protons/cm³
        speed: parseFloat(parts[3]) || null, // km/s
        temperature: parseFloat(parts[4]) || null, // K
        bx: parseFloat(parts[5]) || null, // nT
        by: parseFloat(parts[6]) || null, // nT
        bz: parseFloat(parts[7]) || null, // nT
        bt: parseFloat(parts[8]) || null, // nT (total B field)
        source: "SWPC",
      };

      // Calculate total magnetic field if not provided
      if (
        !entry.bt &&
        entry.bx !== null &&
        entry.by !== null &&
        entry.bz !== null
      ) {
        entry.bt = Math.sqrt(entry.bx ** 2 + entry.by ** 2 + entry.bz ** 2);
      }

      // Only add entries with valid data
      if (entry.speed !== null || entry.density !== null || entry.bt !== null) {
        data.push(entry);
      }
    } catch (error) {
      console.warn(`Failed to parse line ${i + 1}:`, line, error.message);
    }
  }

  // Sort by timestamp to ensure chronological order
  data.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  return data;
}

export function getLatestReadings(data) {
  if (!data || data.length === 0) return null;

  const latest = data[data.length - 1];
  return {
    timestamp: latest.timestamp,
    density: latest.density,
    speed: latest.speed,
    temperature: latest.temperature,
    magneticField: {
      bx: latest.bx,
      by: latest.by,
      bz: latest.bz,
      bt: latest.bt,
    },
  };
}

export function calculateAverages(data, hours = 24) {
  if (!data || data.length === 0) return null;

  const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
  const recentData = data.filter((entry) => entry.timestamp > cutoffTime);

  if (recentData.length === 0) return null;

  const sums = recentData.reduce(
    (acc, entry) => ({
      density: acc.density + (entry.density || 0),
      speed: acc.speed + (entry.speed || 0),
      temperature: acc.temperature + (entry.temperature || 0),
      bt: acc.bt + (entry.bt || 0),
    }),
    { density: 0, speed: 0, temperature: 0, bt: 0 }
  );

  return {
    density: sums.density / recentData.length,
    speed: sums.speed / recentData.length,
    temperature: sums.temperature / recentData.length,
    bt: sums.bt / recentData.length,
    count: recentData.length,
  };
}
