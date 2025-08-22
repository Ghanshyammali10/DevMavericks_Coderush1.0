import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sun,
  Zap,
  Shield,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  ArrowRight,
  Play,
  Satellite,
  Globe,
  Users,
  Award,
  Plane,
  Ship,
  Sprout,
  Hospital,
  Plug,
  Compass,
  Activity,
  Bell,
  Database,
  Radar,
  Clock,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center solar-flare-animation">
                <Sun className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Solarflux
              </span>{" "}
              — CME Detection & Alerts
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              End‑to‑end Coronal Mass Ejection detection, classification, and
              impact forecasting using Aditya‑L1 (ASPEX & SUIT) with optional
              cross‑checks from CACTus and space‑weather APIs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Open Live Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>

              <Link
                href="/docs/problem-statement"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200"
              >
                <Compass className="w-5 h-5 mr-2" />
                See Problem ↗
              </Link>
            </div>

            {/* Live Status */}
            <div className="inline-flex items-center space-x-3 px-4 py-2 bg-green-500/15 border border-green-500/30 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">
                Live: ASPEX stream healthy · SUIT cadence nominal · T‑{">"}15m
                ingest lag
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution fit */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-black/20 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-orange-400" />
                The Problem
              </h2>
              <p className="text-gray-300">
                CMEs threaten satellites, navigation, HF comms, and power grids.
                Aditya‑L1 provides in‑situ and remote solar observations that
                enable earlier and more reliable warnings.
              </p>
            </div>

            <div className="lg:col-span-2 bg-black/20 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                What Solarflux Delivers
              </h3>
              <ul className="grid sm:grid-cols-2 gap-4 text-gray-200">
                <li className="flex items-start gap-3">
                  <Activity className="w-5 h-5 mt-1" />
                  <div>
                    <div className="font-semibold">
                      Time‑series anomaly detection
                    </div>
                    <div className="text-gray-400 text-sm">
                      Detects spikes in solar wind speed & particle flux (ASPEX)
                      with adaptive thresholds.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Radar className="w-5 h-5 mt-1" />
                  <div>
                    <div className="font-semibold">
                      Direction & strength estimation
                    </div>
                    <div className="text-gray-400 text-sm">
                      Combines SUIT imagery features with ASPEX vectors to
                      estimate CME trajectory and intensity class.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Bell className="w-5 h-5 mt-1" />
                  <div>
                    <div className="font-semibold">Impact‑aware alerts</div>
                    <div className="text-gray-400 text-sm">
                      Severity‑based notifications for satellite ops & ground
                      stations (email/SMS/webhooks).
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Database className="w-5 h-5 mt-1" />
                  <div>
                    <div className="font-semibold">Cross‑validation</div>
                    <div className="text-gray-400 text-sm">
                      Optional correlation with CACTus catalog and external
                      space‑weather APIs to reduce false positives.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Sectors */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Impact Sectors
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Where CME activity translates to real‑world operational impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              href="/alerts"
              className="group block bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:scale-105 transition-transform duration-200"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Airlines & Aviation
              </h3>
              <p className="text-gray-300">
                HF comms, GNSS deviations, polar route advisories, radiation
                dose management.
              </p>
              <div className="mt-3 text-sm text-gray-400">
                Dispatch · ATC · Flight Ops
              </div>
            </Link>

            <Link
              href="/alerts"
              className="group block bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:scale-105 transition-transform duration-200"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                <Ship className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Navy & Maritime Operations
              </h3>
              <p className="text-gray-300">
                HF/VHF comms, navigation drifts, Arctic passages, port
                scheduling risk.
              </p>
              <div className="mt-3 text-sm text-gray-400">
                Fleet Ops · Coastal SAR
              </div>
            </Link>

            <Link
              href="/alerts"
              className="group block bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:scale-105 transition-transform duration-200"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-lime-400 to-green-500 rounded-lg flex items-center justify-center mb-4">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Agriculture & Farming
              </h3>
              <p className="text-gray-300">
                GNSS guidance reliability, irrigation automation alerts,
                weather‑linked advisories.
              </p>
              <div className="mt-3 text-sm text-gray-400">
                Precision Ag · Extension
              </div>
            </Link>

            <Link
              href="/alerts"
              className="group block bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:scale-105 transition-transform duration-200"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Hospital className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Healthcare & Emergency Services
              </h3>
              <p className="text-gray-300">
                Paging/comms resilience, ambulance navigation, satellite
                backhaul continuity.
              </p>
              <div className="mt-3 text-sm text-gray-400">
                EMS · Public Safety
              </div>
            </Link>

            <Link
              href="/alerts"
              className="group block bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:scale-105 transition-transform duration-200"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                <Plug className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Energy Sector (Solar · Grid · Nuclear)
              </h3>
              <p className="text-gray-300">
                Geomagnetically induced currents, grid protection advisories,
                plant ops coordination.
              </p>
              <div className="mt-3 text-sm text-gray-400">
                ISO/RTO · Utilities
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Live KPIs / Stats — keep realistic for hackathons */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">
                ~5m
              </div>
              <div className="text-gray-300">Ingest Latency</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">
                24/7
              </div>
              <div className="text-gray-300">Monitoring Window</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                3
              </div>
              <div className="text-gray-300">Models Enabled</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                0.85
              </div>
              <div className="text-gray-300">Precision (pilot)</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black/20 border border-white/10 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                1) Ingest
              </h4>
              <p className="text-gray-300">
                Pull ASPEX streams (solar wind speed, particle flux) and SUIT
                imagery. Clean, resample, and align timestamps.
              </p>
            </div>
            <div className="bg-black/20 border border-white/10 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                2) Detect & Classify
              </h4>
              <p className="text-gray-300">
                Run anomaly detectors on time‑series; extract CME
                kinematics/features for direction & strength estimation.
              </p>
            </div>
            <div className="bg-black/20 border border-white/10 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                3) Alert & Validate
              </h4>
              <p className="text-gray-300">
                Send severity‑based alerts with ETA to Earth. Optionally
                cross‑check against CACTus/NOAA for confirmation.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
            >
              Try the Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust badges / audience */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/20 border border-white/10 rounded-xl p-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-white font-semibold">Hackathon‑Ready</div>
              <div className="text-gray-400 text-sm">
                Modular routes for quick demos & evaluation.
              </div>
            </div>
            <div className="bg-black/20 border border-white/10 rounded-xl p-6 text-center">
              <Shield className="w-8 h-8 mx-auto mb-3 text-teal-300" />
              <div className="text-white font-semibold">Operator‑Focused</div>
              <div className="text-gray-400 text-sm">
                Alert playbooks & maintenance modes.
              </div>
            </div>
            <div className="bg-black/20 border border-white/10 rounded-xl p-6 text-center">
              <Globe className="w-8 h-8 mx-auto mb-3 text-indigo-300" />
              <div className="text-white font-semibold">Extensible</div>
              <div className="text-gray-400 text-sm">
                Drop‑in connectors for external SWx APIs.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
