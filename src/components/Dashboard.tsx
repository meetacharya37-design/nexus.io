"use client";

import { motion } from "framer-motion";

const STOCKS = [
  { symbol: "NVDA", price: "$1,284.32", change: "+4.21%", up: true },
  { symbol: "AAPL", price: "$218.74", change: "-0.92%", up: false },
  { symbol: "TSLA", price: "$342.18", change: "+6.84%", up: true },
  { symbol: "MSFT", price: "$442.91", change: "+1.42%", up: true },
  { symbol: "META", price: "$612.55", change: "+2.18%", up: true },
  { symbol: "AMZN", price: "$198.42", change: "-1.28%", up: false },
];

const NAV_ITEMS = [
  { label: "Home", active: true },
  { label: "Social", active: false },
  { label: "Dashboard", active: false },
  { label: "Market", active: false },
  { label: "Messages", active: false },
  { label: "Profile", active: false },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface DashboardProps {
  onNavigate?: (view: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#05060f]"
    >
      {/* Nav */}
      <div className="sticky top-0 z-40 backdrop-blur-2xl bg-[#05060f]/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-emerald-400 grid place-items-center font-bold text-black">
              N
              <span className="absolute inset-0 rounded-2xl bg-cyan-400/30 blur-xl -z-10" />
            </div>
            <span className="font-[var(--font-grotesk)] text-xl font-bold tracking-tight hidden sm:block">
              NEXUS
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {NAV_ITEMS.map((n) => (
              <button
                key={n.label}
                onClick={() => n.label === "Profile" && onNavigate?.("profile")}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition ${
                  n.active ? "bg-white/10 text-white" : "text-white/55 hover:text-white hover:bg-white/5"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => onNavigate?.("profile")}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 grid place-items-center text-xs font-bold text-black hover:scale-110 transition-transform"
            >
              U
            </button>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 lg:px-6 pt-12 pb-24"
      >
        {/* Welcome banner */}
        <motion.section variants={item} className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-cyan-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Biometric authentication verified
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-grotesk)] leading-tight mb-4">
            The{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 bg-clip-text text-transparent">
              social finance
            </span>
            <br />
            super app of{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              tomorrow.
            </span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mb-8">
            NEXUS combines an AI portfolio assistant, real-time markets, social investing and biometric banking into a single immersive experience.
          </p>
          <div className="flex gap-3">
            <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 text-black font-semibold text-sm hover:scale-105 transition-transform">
              Launch NEXUS →
            </button>
            <button className="px-6 py-3 rounded-2xl glass text-sm font-medium text-white/70 hover:text-white transition">
              See live demo
            </button>
          </div>
        </motion.section>

        {/* Stock ticker */}
        <motion.div
          variants={item}
          className="flex gap-4 overflow-x-auto pb-4 mb-12 scrollbar-hide"
        >
          {STOCKS.map((s) => (
            <div
              key={s.symbol}
              className="flex-shrink-0 glass rounded-2xl p-4 min-w-[160px] hover:border-cyan-400/20 transition-colors"
            >
              <div className="text-sm font-bold mb-1">{s.symbol}</div>
              <div className="text-lg font-semibold">{s.price}</div>
              <div className={`text-xs font-medium ${s.up ? "text-emerald-400" : "text-red-400"}`}>
                {s.change}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Feature cards */}
        <motion.section variants={item}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-fuchsia-400 mb-4">
              Platform capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-grotesk)]">
              A complete{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                financial OS
              </span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "AI Finance Assistant", desc: "Holographic co-pilot that analyzes your portfolio in real time." },
              { title: "Realtime Analytics", desc: "Microsecond-grade market intelligence with predictive AI overlays." },
              { title: "Social Investing", desc: "Follow top traders, mirror trades, and join private alpha rooms." },
              { title: "Portfolio Tracking", desc: "Unified view across stocks, crypto, banks and DeFi protocols." },
              { title: "Biometric Security", desc: "Face + retina scan login. Hardware-grade vault for every position." },
              { title: "Stock Prediction AI", desc: "Trained on 40 years of market data with sentiment overlays." },
            ].map((f) => (
              <div
                key={f.title}
                className="glass rounded-2xl p-6 hover:border-cyan-400/20 transition-all group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-cyan-400 transition-colors">{f.title}</h3>
                <p className="text-sm text-white/40">{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </motion.main>
    </motion.div>
  );
}
