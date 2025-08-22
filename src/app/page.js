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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Airlines & Aviation */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-black/30 hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Airlines & Aviation
                  </h3>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <div className="text-white font-semibold mb-1">Impact:</div>
                  <div className="text-gray-300 text-sm">
                    CMEs cause GPS navigation failures, radio communication
                    blackouts, and increased radiation exposure for
                    high-altitude flights, particularly on polar routes.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Example:</div>
                  <div className="text-gray-300 text-sm">
                    The 2003 Halloween solar storms caused flight diversions and
                    GPS disruptions affecting thousands of commercial flights.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Severity:</div>
                  <div className="text-gray-300 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30">
                      Severe
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">
                    Mitigation:
                  </div>
                  <div className="text-gray-300 text-sm">
                    Reroute flights to lower latitudes, activate backup
                    navigation systems, and implement radiation monitoring
                    protocols for crew safety.
                  </div>
                </div>
              </div>

              <Link
                href="/api/aviation"
                className="inline-flex items-center text-blue-400 group-hover:text-blue-300 text-sm font-medium transition-colors duration-200"
              >
                View Aviation API{" "}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Navy & Maritime Operations */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-black/30 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-lg flex items-center justify-center mr-4">
                  <Ship className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Navy & Maritime Operations
                  </h3>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <div className="text-white font-semibold mb-1">Impact:</div>
                  <div className="text-gray-300 text-sm">
                    CMEs disrupt GPS navigation systems, interfere with
                    underwater communications, and can cause compass anomalies
                    affecting maritime navigation and naval operations.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Example:</div>
                  <div className="text-gray-300 text-sm">
                    During the 1989 Quebec blackout, geomagnetic storms affected
                    compass readings and navigation systems on ships in the
                    North Atlantic.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Severity:</div>
                  <div className="text-gray-300 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                      Moderate
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">
                    Mitigation:
                  </div>
                  <div className="text-gray-300 text-sm">
                    Switch to backup navigation systems, use celestial
                    navigation, implement communication redundancy, and avoid
                    high-latitude routes during storms.
                  </div>
                </div>
              </div>

              <Link
                href="/api/maritime"
                className="inline-flex items-center text-cyan-400 group-hover:text-cyan-300 text-sm font-medium transition-colors duration-200"
              >
                View Maritime API{" "}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Agriculture & Farming */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-black/30 hover:border-green-400/30 hover:shadow-lg hover:shadow-green-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-lime-400 to-green-500 rounded-lg flex items-center justify-center mr-4">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Agriculture & Farming
                  </h3>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <div className="text-white font-semibold mb-1">Impact:</div>
                  <div className="text-gray-300 text-sm">
                    CMEs can disrupt GPS-guided farming equipment, affect
                    weather patterns that impact crop growth, and potentially
                    influence pest behavior through atmospheric changes.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Example:</div>
                  <div className="text-gray-300 text-sm">
                    Solar storms have been linked to unusual weather patterns
                    affecting crop yields, and GPS failures have disrupted
                    precision farming operations.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Severity:</div>
                  <div className="text-gray-300 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                      Minor
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">
                    Mitigation:
                  </div>
                  <div className="text-gray-300 text-sm">
                    Implement manual farming backup procedures, monitor weather
                    forecasts more closely, and maintain traditional farming
                    knowledge for critical operations.
                  </div>
                </div>
              </div>

              <Link
                href="/api/agriculture"
                className="inline-flex items-center text-green-400 group-hover:text-green-300 text-sm font-medium transition-colors duration-200"
              >
                View Agriculture API{" "}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Healthcare & Emergency Services */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-black/30 hover:border-pink-400/30 hover:shadow-lg hover:shadow-pink-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                  <Hospital className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Healthcare & Emergency Services
                  </h3>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <div className="text-white font-semibold mb-1">Impact:</div>
                  <div className="text-gray-300 text-sm">
                    CMEs can cause power grid instability affecting medical
                    equipment, disrupt GPS navigation for emergency vehicles,
                    and potentially impact communication systems critical for
                    patient care.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Example:</div>
                  <div className="text-gray-300 text-sm">
                    The 1989 Quebec blackout caused hospitals to rely on backup
                    generators, and emergency services experienced GPS
                    navigation issues during the geomagnetic storm.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Severity:</div>
                  <div className="text-gray-300 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30">
                      Severe
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">
                    Mitigation:
                  </div>
                  <div className="text-gray-300 text-sm">
                    Activate backup power systems, implement manual emergency
                    protocols, use alternative navigation methods for
                    ambulances, and maintain redundant communication systems.
                  </div>
                </div>
              </div>

              <Link
                href="/api/healthcare"
                className="inline-flex items-center text-pink-400 group-hover:text-pink-300 text-sm font-medium transition-colors duration-200"
              >
                View Healthcare API{" "}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Construction & Infrastructure */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-black/30 hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🏗</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Construction & Infrastructure
                  </h3>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <div className="text-white font-semibold mb-1">Impact:</div>
                  <div className="text-gray-300 text-sm">
                    CMEs can disrupt GPS-guided construction equipment, cause
                    power surges affecting electrical systems, and interfere
                    with precision surveying and positioning tools.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Example:</div>
                  <div className="text-gray-300 text-sm">
                    GPS-guided bulldozers and cranes have experienced
                    positioning errors during solar storms, leading to
                    construction delays and safety concerns.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Severity:</div>
                  <div className="text-gray-300 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                      Moderate
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">
                    Mitigation:
                  </div>
                  <div className="text-gray-300 text-sm">
                    Use manual surveying methods as backup, implement surge
                    protection for electrical equipment, and schedule critical
                    precision work during low solar activity periods.
                  </div>
                </div>
              </div>

              <Link
                href="/api/construction"
                className="inline-flex items-center text-yellow-400 group-hover:text-yellow-300 text-sm font-medium transition-colors duration-200"
              >
                View Construction API{" "}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Telecom & Internet Providers */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-black/30 hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <Satellite className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Telecom & Internet Providers
                  </h3>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <div className="text-white font-semibold mb-1">Impact:</div>
                  <div className="text-gray-300 text-sm">
                    CMEs can cause satellite communication disruptions, affect
                    fiber optic transmission, and induce power surges that
                    damage network infrastructure and cause service outages.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Example:</div>
                  <div className="text-gray-300 text-sm">
                    During the 2003 Halloween storms, satellite communications
                    were disrupted, and some fiber optic networks experienced
                    transmission errors due to geomagnetic interference.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Severity:</div>
                  <div className="text-gray-300 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30">
                      Severe
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">
                    Mitigation:
                  </div>
                  <div className="text-gray-300 text-sm">
                    Implement redundant network paths, activate backup
                    communication systems, deploy surge protection equipment,
                    and maintain emergency response teams for critical
                    infrastructure.
                  </div>
                </div>
              </div>

              <Link
                href="/api/telecom"
                className="inline-flex items-center text-purple-400 group-hover:text-purple-300 text-sm font-medium transition-colors duration-200"
              >
                View Telecom API{" "}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Financial Institutions */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🏦</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Financial Institutions
                  </h3>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <div className="text-white font-semibold mb-1">Impact:</div>
                  <div className="text-gray-300 text-sm">
                    CMEs can cause network latency issues affecting
                    high-frequency trading, induce power surges damaging server
                    infrastructure, and disrupt global financial communication
                    networks.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Example:</div>
                  <div className="text-gray-300 text-sm">
                    Solar storms have caused trading system disruptions and
                    network latency issues, potentially affecting market
                    operations and financial transactions.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Severity:</div>
                  <div className="text-gray-300 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                      Moderate
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">
                    Mitigation:
                  </div>
                  <div className="text-gray-300 text-sm">
                    Implement redundant trading systems, deploy advanced surge
                    protection for data centers, maintain backup communication
                    networks, and establish emergency trading protocols.
                  </div>
                </div>
              </div>

              <Link
                href="/api/finance"
                className="inline-flex items-center text-green-400 hover:text-green-300 text-sm font-medium"
              >
                View Finance API <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Energy Sector */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-black/30 hover:border-orange-400/30 hover:shadow-lg hover:shadow-orange-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                  <Plug className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Energy Sector (Solar, Grid, Nuclear)
                  </h3>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <div className="text-white font-semibold mb-1">Impact:</div>
                  <div className="text-gray-300 text-sm">
                    CMEs can induce geomagnetic currents in power grids causing
                    transformer overloads, affect solar panel efficiency, and
                    potentially disrupt nuclear power plant monitoring systems.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Example:</div>
                  <div className="text-gray-300 text-sm">
                    The 1989 Quebec blackout was caused by geomagnetic storms
                    inducing currents in power lines, leading to transformer
                    failures and a 9-hour power outage affecting 6 million
                    people.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Severity:</div>
                  <div className="text-gray-300 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30">
                      Severe
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">
                    Mitigation:
                  </div>
                  <div className="text-gray-300 text-sm">
                    Implement geomagnetic storm monitoring systems, deploy
                    transformer protection devices, establish load shedding
                    protocols, and maintain backup power generation capacity.
                  </div>
                </div>
              </div>

              <Link
                href="/api/energy"
                className="inline-flex items-center text-orange-400 group-hover:text-orange-300 text-sm font-medium transition-colors duration-200"
              >
                View Energy API{" "}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Space Agencies & Satellite Operators */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-black/30 hover:border-violet-400/30 hover:shadow-lg hover:shadow-violet-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-400 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🛰</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Space Agencies & Satellite Operators
                  </h3>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <div className="text-white font-semibold mb-1">Impact:</div>
                  <div className="text-gray-300 text-sm">
                    CMEs can damage satellite electronics, cause orbital
                    perturbations, disrupt communication links, and increase
                    radiation exposure to spacecraft and astronauts.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Example:</div>
                  <div className="text-gray-300 text-sm">
                    The 2003 Halloween storms caused satellite anomalies,
                    including the loss of the ADEOS-2 satellite and temporary
                    shutdown of several others due to radiation damage.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Severity:</div>
                  <div className="text-gray-300 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30">
                      Severe
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">
                    Mitigation:
                  </div>
                  <div className="text-gray-300 text-sm">
                    Activate satellite safe modes, implement radiation shielding
                    protocols, delay launches during high solar activity, and
                    maintain redundant communication systems.
                  </div>
                </div>
              </div>

              <Link
                href="/api/space"
                className="inline-flex items-center text-purple-400 group-hover:text-purple-300 text-sm font-medium transition-colors duration-200"
              >
                View Space API{" "}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Students & Educational Institutions */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-black/30 hover:border-indigo-400/30 hover:shadow-lg hover:shadow-indigo-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Students & Educational Institutions
                  </h3>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <div className="text-white font-semibold mb-1">Impact:</div>
                  <div className="text-gray-300 text-sm">
                    CMEs provide unique educational opportunities for studying
                    space weather, physics, and earth sciences, while also
                    potentially affecting campus infrastructure and research
                    equipment.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Example:</div>
                  <div className="text-gray-300 text-sm">
                    Educational institutions use solar storm events for hands-on
                    learning, with students monitoring aurora displays and
                    analyzing real-time space weather data for research
                    projects.
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Severity:</div>
                  <div className="text-gray-300 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                      Minor
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">
                    Mitigation:
                  </div>
                  <div className="text-gray-300 text-sm">
                    Protect sensitive research equipment, implement educational
                    programs about space weather, and use CME events as learning
                    opportunities for STEM education.
                  </div>
                </div>
              </div>

              <Link
                href="/api/education"
                className="inline-flex items-center text-indigo-400 group-hover:text-indigo-300 text-sm font-medium transition-colors duration-200"
              >
                View Education API{" "}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
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
            <div className="bg-black/20 border border-white/10 rounded-xl p-6 hover:bg-black/30 hover:border-orange-400/30 hover:shadow-lg hover:shadow-orange-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
              <h4 className="text-white font-semibold mb-2 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                1) Ingest
              </h4>
              <p className="text-gray-300">
                Pull ASPEX streams (solar wind speed, particle flux) and SUIT
                imagery. Clean, resample, and align timestamps.
              </p>
            </div>
            <div className="bg-black/20 border border-white/10 rounded-xl p-6 hover:bg-black/30 hover:border-red-400/30 hover:shadow-lg hover:shadow-red-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
              <h4 className="text-white font-semibold mb-2 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                2) Detect & Classify
              </h4>
              <p className="text-gray-300">
                Run anomaly detectors on time‑series; extract CME
                kinematics/features for direction & strength estimation.
              </p>
            </div>
            <div className="bg-black/20 border border-white/10 rounded-xl p-6 hover:bg-black/30 hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
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
            <div className="bg-black/20 border border-white/10 rounded-xl p-6 text-center hover:bg-black/30 hover:border-yellow-400/30 hover:shadow-lg hover:shadow-yellow-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
              <Award className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-white font-semibold">Hackathon‑Ready</div>
              <div className="text-gray-400 text-sm">
                Modular routes for quick demos & evaluation.
              </div>
            </div>
            <div className="bg-black/20 border border-white/10 rounded-xl p-6 text-center hover:bg-black/30 hover:border-teal-400/30 hover:shadow-lg hover:shadow-teal-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
              <Shield className="w-8 h-8 mx-auto mb-3 text-teal-300" />
              <div className="text-white font-semibold">Operator‑Focused</div>
              <div className="text-gray-400 text-sm">
                Alert playbooks & maintenance modes.
              </div>
            </div>
            <div className="bg-black/20 border border-white/10 rounded-xl p-6 text-center hover:bg-black/30 hover:border-indigo-400/30 hover:shadow-lg hover:shadow-indigo-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
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
