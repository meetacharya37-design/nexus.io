"use client";

import { motion } from "framer-motion";
import PnLChart from "./PnLChart";

const PORTFOLIO_DATA = [
  42000, 43200, 41800, 44500, 46200, 45100, 47800, 49200, 48600, 51200, 53400,
  52100, 55800, 57200, 56400, 59100, 61800, 60200, 63500, 65200, 64100, 67800,
  69200, 71500, 73800, 72100, 75400, 78200, 76800, 79500, 82100, 84600,
];

const PNL_MONTHLY = [
  2400, -1200, 3800, 5200, -800, 4100, 6200, -2100, 7800, 5400, 8200, 9100,
];

const ROI_DATA = [
  100, 102, 104, 103, 107, 111, 109, 114, 118, 116, 121, 125, 123, 128, 132,
  130, 136, 141, 139, 145, 149, 147, 153, 158, 156, 162, 167, 165, 171, 176,
];

const HOLDINGS = [
  { symbol: "NVDA", name: "NVIDIA", allocation: 28, value: "$23,548", change: "+4.21%", up: true },
  { symbol: "AAPL", name: "Apple", allocation: 18, value: "$15,142", change: "-0.92%", up: false },
  { symbol: "TSLA", name: "Tesla", allocation: 15, value: "$12,630", change: "+6.84%", up: true },
  { symbol: "BTC", name: "Bitcoin", allocation: 14, value: "$11,788", change: "+2.41%", up: true },
  { symbol: "MSFT", name: "Microsoft", allocation: 12, value: "$10,104", change: "+1.42%", up: true },
  { symbol: "ETH", name: "Ethereum", allocation: 8, value: "$6,736", change: "+4.92%", up: true },
  { symbol: "SOL", name: "Solana", allocation: 5, value: "$4,210", change: "+7.18%", up: true },
];

const RECENT_TRADES = [
  { action: "BUY", symbol: "NVDA", amount: "$4,200", time: "2m ago", profit: null },
  { action: "SELL", symbol: "TSLA", amount: "$2,800", time: "1h ago", profit: "+$340" },
  { action: "BUY", symbol: "ETH", amount: "$1,500", time: "3h ago", profit: null },
  { action: "SELL", symbol: "AAPL", amount: "$3,100", time: "5h ago", profit: "+$180" },
  { action: "BUY", symbol: "SOL", amount: "$800", time: "8h ago", profit: null },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

interface ProfileProps {
  onBack: () => void;
}

export default function Profile({ onBack }: ProfileProps) {
  const totalValue = 84158;
  const totalPnl = 42158;
  const roiPercent = 76.2;
  const trustScore = 94;
  const winRate = 78.4;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#05060f]"
    >
      {/* Nav */}
      <div className="sticky top-0 z-40 backdrop-blur-2xl bg-[#05060f]/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-2">
            <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-emerald-400 grid place-items-center font-bold text-black">
              N
              <span className="absolute inset-0 rounded-2xl bg-cyan-400/30 blur-xl -z-10" />
            </div>
            <span className="font-[var(--font-grotesk)] text-xl font-bold tracking-tight hidden sm:block">
              NEXUS
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {["Home", "Social", "Dashboard", "Market", "Messages"].map((n) => (
              <button
                key={n}
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition"
              >
                {n}
              </button>
            ))}
            <button className="px-3.5 py-2 rounded-xl text-sm font-medium bg-white/10 text-white transition">
              Profile
            </button>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>

      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 lg:px-6 pt-8 pb-24"
      >
        {/* Profile header */}
        <motion.section variants={item} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-emerald-400 p-[2px]">
              <div className="w-full h-full rounded-2xl bg-[#0a0f1a] flex items-center justify-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                  AX
                </span>
              </div>
            </div>
            {/* AI Verified badge */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center neon-cyan">
              <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold font-[var(--font-grotesk)]">Alex Nexus</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-cyan-400/10 to-emerald-400/10 border border-cyan-400/20 text-[10px] uppercase tracking-[0.15em] text-cyan-400 font-semibold">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
                AI Verified Trader
              </span>
            </div>
            <p className="text-sm text-white/40 mb-3">Quantitative trader · 3 yrs on NEXUS · Top 2% portfolio</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="font-semibold text-white">1,247</span>
                <span className="text-white/40 ml-1">Followers</span>
              </div>
              <div>
                <span className="font-semibold text-white">342</span>
                <span className="text-white/40 ml-1">Following</span>
              </div>
              <div>
                <span className="font-semibold text-emerald-400">284</span>
                <span className="text-white/40 ml-1">Trades</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 self-start">
            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 text-black font-semibold text-sm hover:scale-105 transition-transform">
              Follow
            </button>
            <button className="px-4 py-2.5 rounded-xl glass text-sm font-medium text-white/60 hover:text-white transition">
              Share
            </button>
          </div>
        </motion.section>

        {/* Stats row */}
        <motion.section variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            {
              label: "Portfolio Value",
              value: `$${totalValue.toLocaleString()}`,
              sub: "+$2,847 today",
              subColor: "text-emerald-400",
            },
            {
              label: "Total P&L",
              value: `+$${totalPnl.toLocaleString()}`,
              sub: "All time",
              subColor: "text-emerald-400",
              valueColor: "text-emerald-400",
            },
            {
              label: "ROI",
              value: `+${roiPercent}%`,
              sub: "Since inception",
              subColor: "text-white/30",
              valueColor: "text-emerald-400",
            },
            {
              label: "Win Rate",
              value: `${winRate}%`,
              sub: "284 trades",
              subColor: "text-white/30",
            },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-4">
              <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-2">
                {stat.label}
              </div>
              <div className={`text-xl sm:text-2xl font-bold font-[var(--font-grotesk)] ${stat.valueColor ?? "text-white"}`}>
                {stat.value}
              </div>
              <div className={`text-xs mt-1 ${stat.subColor}`}>{stat.sub}</div>
            </div>
          ))}
        </motion.section>

        {/* Trust Score + AI Badge */}
        <motion.section variants={item} className="grid sm:grid-cols-2 gap-3 mb-8">
          {/* Trust Score */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] uppercase tracking-[0.15em] text-white/30">Trust Score</div>
              <span className="text-xs text-cyan-400 font-medium">Top 2%</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle
                    cx="50" cy="50" r="42"
                    fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6"
                  />
                  <motion.circle
                    cx="50" cy="50" r="42"
                    fill="none"
                    stroke="url(#trustGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 42}
                    initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - trustScore / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="trustGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="50%" stopColor="#d946ef" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-2xl font-bold font-[var(--font-grotesk)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    {trustScore}
                  </motion.span>
                </div>
              </div>
              <div className="space-y-2 flex-1">
                {[
                  { label: "Consistency", value: 96 },
                  { label: "Risk Mgmt", value: 91 },
                  { label: "Transparency", value: 98 },
                  { label: "Track Record", value: 89 },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-[11px] mb-0.5">
                      <span className="text-white/40">{m.label}</span>
                      <span className="text-white/60">{m.value}</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${m.value}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Trader Verification */}
          <div className="glass rounded-2xl p-6 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{ background: "radial-gradient(circle at 80% 20%, rgba(34,211,238,0.1) 0%, transparent 60%)" }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center neon-cyan">
                  <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold">AI Verified Trader</div>
                  <div className="text-[11px] text-white/30">Verified by NEXUS AI · Updated 2h ago</div>
                </div>
              </div>
              <div className="space-y-3 text-xs">
                {[
                  { label: "Identity Verified", icon: "check" },
                  { label: "Biometric Auth Active", icon: "check" },
                  { label: "No Wash Trading Detected", icon: "check" },
                  { label: "Consistent Strategy Pattern", icon: "check" },
                  { label: "Risk Parameters Within Bounds", icon: "check" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-2 text-white/50">
                    <div className="w-4 h-4 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Charts row */}
        <motion.section variants={item} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {/* Portfolio Performance */}
          <div className="glass rounded-2xl p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[10px] uppercase tracking-[0.15em] text-white/30">Portfolio Performance</div>
              <div className="flex gap-1">
                {["1W", "1M", "3M", "1Y", "ALL"].map((t, i) => (
                  <button
                    key={t}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition ${
                      i === 3 ? "bg-white/10 text-white" : "text-white/30 hover:text-white/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold font-[var(--font-grotesk)]">
                ${totalValue.toLocaleString()}
              </span>
              <span className="text-sm text-emerald-400 font-medium">+76.2%</span>
            </div>
            <PnLChart
              data={PORTFOLIO_DATA}
              height={160}
              gradient={{ from: "#22d3ee", to: "#34d399" }}
              label="portfolio"
            />
          </div>

          {/* ROI Tracker */}
          <div className="glass rounded-2xl p-5">
            <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-1">ROI Tracker</div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold font-[var(--font-grotesk)] text-emerald-400">
                +{roiPercent}%
              </span>
              <span className="text-xs text-white/30">vs. S&P +18.4%</span>
            </div>
            <PnLChart
              data={ROI_DATA}
              height={120}
              gradient={{ from: "#34d399", to: "#22d3ee" }}
              label="roi"
            />
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-white/5">
                <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
              </div>
              <span className="text-[10px] text-white/30 font-mono">76.2 / 100</span>
            </div>
          </div>
        </motion.section>

        {/* PnL Monthly Chart */}
        <motion.section variants={item} className="glass rounded-2xl p-5 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-1">Monthly P&L</div>
              <span className="text-lg font-bold font-[var(--font-grotesk)] text-emerald-400">
                +$42,158
              </span>
              <span className="text-xs text-white/30 ml-2">Total realized</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-32">
            {PNL_MONTHLY.map((val, i) => {
              const maxAbs = Math.max(...PNL_MONTHLY.map(Math.abs));
              const pct = Math.abs(val) / maxAbs;
              const isPositive = val >= 0;
              return (
                <motion.div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: i * 0.05 + 0.3, duration: 0.5 }}
                  style={{ transformOrigin: "bottom" }}
                >
                  <div
                    className={`w-full rounded-t-lg ${
                      isPositive
                        ? "bg-gradient-to-t from-emerald-400/40 to-emerald-400/80"
                        : "bg-gradient-to-t from-red-400/40 to-red-400/80"
                    }`}
                    style={{ height: `${pct * 100}%`, minHeight: 4 }}
                  />
                  <span className="text-[9px] text-white/20">{MONTHS[i]}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Holdings + Recent Trades */}
        <motion.section variants={item} className="grid lg:grid-cols-2 gap-3 mb-8">
          {/* Holdings */}
          <div className="glass rounded-2xl p-5">
            <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-4">Holdings</div>
            <div className="space-y-3">
              {HOLDINGS.map((h) => (
                <div key={h.symbol} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white/60">
                    {h.symbol.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{h.symbol}</span>
                      <span className="text-sm font-medium">{h.value}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-white/30">{h.name} · {h.allocation}%</span>
                      <span className={`text-[11px] font-medium ${h.up ? "text-emerald-400" : "text-red-400"}`}>
                        {h.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Trades */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] uppercase tracking-[0.15em] text-white/30">Recent Trades</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-medium">Live</span>
              </div>
            </div>
            <div className="space-y-3">
              {RECENT_TRADES.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                    t.action === "BUY"
                      ? "bg-emerald-400/10 text-emerald-400"
                      : "bg-fuchsia-400/10 text-fuchsia-400"
                  }`}>
                    {t.action}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{t.symbol}</span>
                      <span className="text-sm font-medium">{t.amount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-white/30">{t.time}</span>
                      {t.profit && (
                        <span className="text-[11px] text-emerald-400 font-medium">{t.profit}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Realtime Analytics */}
        <motion.section variants={item} className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <div className="text-[10px] uppercase tracking-[0.15em] text-white/30">Realtime Portfolio Analytics</div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Sharpe Ratio", value: "2.84", trend: "+0.12", good: true },
              { label: "Max Drawdown", value: "-8.2%", trend: "Improving", good: true },
              { label: "Avg Hold Time", value: "4.2 days", trend: "-0.5d", good: true },
              { label: "Beta", value: "1.12", trend: "vs S&P 500", good: false },
              { label: "Sortino Ratio", value: "3.41", trend: "+0.08", good: true },
              { label: "Alpha", value: "+12.4%", trend: "Annualized", good: true },
              { label: "Vol (30d)", value: "18.2%", trend: "-2.1%", good: true },
              { label: "Calmar Ratio", value: "5.62", trend: "+0.34", good: true },
            ].map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="text-[10px] text-white/25 mb-1">{m.label}</span>
                <span className="text-lg font-bold font-[var(--font-grotesk)]">{m.value}</span>
                <span className={`text-[10px] mt-0.5 ${m.good ? "text-emerald-400/60" : "text-white/25"}`}>
                  {m.trend}
                </span>
              </div>
            ))}
          </div>
        </motion.section>
      </motion.main>
    </motion.div>
  );
}
