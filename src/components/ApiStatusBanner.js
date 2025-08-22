import { AlertTriangle, Info } from "lucide-react";

export default function ApiStatusBanner({ message, type = "warning" }) {
  if (!message) return null;

  const isWarning = type === "warning";
  const isInfo = type === "info";

  return (
    <div
      className={`mb-6 p-4 ${
        isWarning
          ? "bg-yellow-500/20 border-yellow-500/30"
          : isInfo
          ? "bg-blue-500/20 border-blue-500/30"
          : "bg-red-500/20 border-red-500/30"
      } border rounded-lg`}
    >
      <div className="flex items-center gap-3">
        {isWarning ? (
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
        ) : isInfo ? (
          <Info className="w-5 h-5 text-blue-400" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-red-400" />
        )}
        <div>
          <p
            className={`${
              isWarning
                ? "text-yellow-400"
                : isInfo
                ? "text-blue-400"
                : "text-red-400"
            } font-medium`}
          >
            {isWarning
              ? "Using Fallback Data"
              : isInfo
              ? "Information"
              : "API Error"}
          </p>
          <p
            className={`${
              isWarning
                ? "text-yellow-300"
                : isInfo
                ? "text-blue-300"
                : "text-red-300"
            } text-sm`}
          >
            {message}
          </p>
          {isWarning && (
            <p className="text-gray-300 text-xs mt-1">
              NASA's DEMO_KEY has rate limits (30 requests/hour). For higher
              limits, get a free API key at{" "}
              <a
                href="https://api.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                api.nasa.gov
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
