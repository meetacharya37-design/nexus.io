"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ScanPhase = "idle" | "initializing" | "scanning" | "analyzing" | "verified" | "complete";

const SCAN_PHASES: { phase: ScanPhase; label: string; duration: number }[] = [
  { phase: "initializing", label: "Initializing biometric scanner...", duration: 1500 },
  { phase: "scanning", label: "Scanning facial geometry...", duration: 3000 },
  { phase: "analyzing", label: "AI verification in progress...", duration: 2000 },
  { phase: "verified", label: "Identity verified", duration: 1500 },
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface FaceScanAuthProps {
  onAuthenticated: () => void;
}

export default function FaceScanAuth({ onAuthenticated }: FaceScanAuthProps) {
  const [phase, setPhase] = useState<ScanPhase>("idle");
  const [progress, setProgress] = useState(0);
  const [dataLines, setDataLines] = useState<string[]>([]);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const scanPoints = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        x: 30 + seededRandom(i * 3 + 1) * 40,
        y: 20 + seededRandom(i * 3 + 2) * 60,
        delay: seededRandom(i * 3 + 3) * 2,
      })),
    [],
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        ix: seededRandom(i * 4 + 10) * 1024,
        iy: seededRandom(i * 4 + 11) * 768,
        ax: seededRandom(i * 4 + 12) * 1024,
        ay: seededRandom(i * 4 + 13) * 768,
        dur: 8 + seededRandom(i * 4 + 14) * 12,
      })),
    [],
  );

  const dataLineIndex = useRef(0);
  const addDataLine = useCallback(() => {
    const lines = [
      "BIOMETRIC_HASH: 0xAF29...E41D",
      "NEURAL_MAP: 2,847 nodes mapped",
      "DEPTH_SCAN: 12.4mm resolution",
      "LIVENESS: confirmed (score: 0.997)",
      "IR_PATTERN: 142 reference points",
      "RETINA_MATCH: 99.8% confidence",
      "ENCRYPTION: AES-256-GCM active",
      "FACE_GEOMETRY: 468 landmarks",
      "ANTI_SPOOF: passed all checks",
      "VAULT_ACCESS: Level 5 clearance",
      "TEMPORAL_SYNC: Δt < 0.3ms",
      "QUANTUM_KEY: entangled pair verified",
    ];
    const idx = dataLineIndex.current % lines.length;
    dataLineIndex.current += 1;
    setDataLines((prev) => {
      const next = [...prev, lines[idx]];
      return next.slice(-6);
    });
  }, []);

  const startScan = useCallback(() => {
    setPhase("initializing");
    setProgress(0);
    setDataLines([]);

    let currentIdx = 0;
    let elapsed = 0;
    const totalDuration = SCAN_PHASES.reduce((s, p) => s + p.duration, 0);

    const dataInterval = setInterval(addDataLine, 400);

    const advance = () => {
      if (currentIdx >= SCAN_PHASES.length) {
        clearInterval(dataInterval);
        if (progressInterval.current) clearInterval(progressInterval.current);
        setPhase("complete");
        setTimeout(onAuthenticated, 800);
        return;
      }
      const { phase: p, duration } = SCAN_PHASES[currentIdx];
      setPhase(p);

      if (progressInterval.current) clearInterval(progressInterval.current);
      progressInterval.current = setInterval(() => {
        elapsed += 50;
        setProgress(Math.min((elapsed / totalDuration) * 100, 100));
      }, 50);

      setTimeout(() => {
        currentIdx++;
        advance();
      }, duration);
    };

    advance();

    return () => {
      clearInterval(dataInterval);
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [addDataLine, onAuthenticated]);

  const isActive = phase !== "idle" && phase !== "complete";
  const isVerified = phase === "verified" || phase === "complete";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05060f]">
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 animate-grid-pulse"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(217,70,239,0.05) 0%, transparent 70%)" }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
            initial={{ x: p.ix, y: p.iy }}
            animate={{ x: p.ax, y: p.ay }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-8 px-4 w-full max-w-lg"
      >
        {/* NEXUS Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-3 mb-2"
        >
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-emerald-400 grid place-items-center font-bold text-black text-lg">
            N
            <span className="absolute inset-0 rounded-2xl bg-cyan-400/30 blur-xl -z-10" />
          </div>
          <span className="font-[var(--font-grotesk)] text-2xl font-bold tracking-tight">
            NEXUS
          </span>
        </motion.div>

        {/* Face scan container */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80">
          {/* Outer rotating ring */}
          <div
            className={`absolute inset-[-16px] rounded-full border border-cyan-400/20 ${isActive ? "animate-rotate-slow" : ""}`}
          >
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div
                key={deg}
                className="absolute w-2 h-2 rounded-full bg-cyan-400/60"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${deg}deg) translateY(-142px) translate(-50%, -50%)`,
                }}
              />
            ))}
          </div>

          {/* Inner rotating ring (reverse) */}
          <div
            className={`absolute inset-[-8px] rounded-full border border-fuchsia-400/15 ${isActive ? "animate-rotate-reverse" : ""}`}
          >
            {[0, 90, 180, 270].map((deg) => (
              <div
                key={deg}
                className="absolute w-1.5 h-1.5 rounded-full bg-fuchsia-400/50"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${deg}deg) translateY(-138px) translate(-50%, -50%)`,
                }}
              />
            ))}
          </div>

          {/* Main scanner circle */}
          <div className="absolute inset-0 rounded-full glass-strong overflow-hidden">
            {/* Simulated camera view */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0d1225] to-[#080c18]">
              {/* Face silhouette overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 200 200"
                  className="w-40 h-40 sm:w-44 sm:h-44"
                  fill="none"
                >
                  <ellipse
                    cx="100"
                    cy="85"
                    rx="45"
                    ry="55"
                    stroke="url(#faceGrad)"
                    strokeWidth="1.5"
                    strokeDasharray={isActive ? "none" : "4 4"}
                    opacity={0.6}
                  />
                  <path
                    d="M40 170 Q40 145 60 135 Q80 128 100 128 Q120 128 140 135 Q160 145 160 170"
                    stroke="url(#faceGrad)"
                    strokeWidth="1.5"
                    strokeDasharray={isActive ? "none" : "4 4"}
                    opacity={0.4}
                  />
                  {isActive && (
                    <>
                      <circle cx="80" cy="78" r="4" stroke="#22d3ee" strokeWidth="1" opacity="0.8">
                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="120" cy="78" r="4" stroke="#22d3ee" strokeWidth="1" opacity="0.8">
                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <line x1="100" y1="85" x2="100" y2="100" stroke="#d946ef" strokeWidth="0.8" opacity="0.4" />
                      <path d="M85 110 Q100 118 115 110" stroke="#d946ef" strokeWidth="0.8" opacity="0.4" />
                    </>
                  )}
                  <defs>
                    <linearGradient id="faceGrad" x1="0" y1="0" x2="200" y2="200">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#d946ef" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Scanning face points */}
              <AnimatePresence>
                {isActive &&
                  scanPoints.map((pt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 0.8, 0.4], scale: [0, 1.2, 1] }}
                      transition={{ delay: pt.delay, duration: 0.6 }}
                      className="absolute w-1 h-1 rounded-full bg-cyan-400"
                      style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                    />
                  ))}
              </AnimatePresence>

              {/* Horizontal scan line */}
              {(phase === "scanning" || phase === "analyzing") && (
                <div className="absolute left-0 right-0 h-[2px] animate-scan-line">
                  <div className="h-full bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
                  <div className="h-8 -mt-4 bg-gradient-to-b from-cyan-400/10 to-transparent" />
                </div>
              )}
            </div>

            {/* Verification checkmark overlay */}
            <AnimatePresence>
              {isVerified && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-[#05060f]/60 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center neon-emerald"
                  >
                    <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Corner brackets */}
          <div className="scan-corner scan-corner-tl absolute top-3 left-3" />
          <div className="scan-corner scan-corner-tr absolute top-3 right-3" />
          <div className="scan-corner scan-corner-bl absolute bottom-3 left-3" />
          <div className="scan-corner scan-corner-br absolute bottom-3 right-3" />

          {/* Pulse rings */}
          {isActive && (
            <>
              <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-pulse-ring" />
              <div
                className="absolute inset-[-4px] rounded-full border border-fuchsia-400/10 animate-pulse-ring"
                style={{ animationDelay: "0.5s" }}
              />
            </>
          )}
        </div>

        {/* Status text */}
        <div className="text-center min-h-[60px] flex flex-col items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`text-sm font-medium tracking-wide ${
                isVerified
                  ? "text-emerald-400"
                  : isActive
                    ? "text-cyan-400"
                    : "text-white/50"
              }`}
            >
              {phase === "idle"
                ? "Position your face within the frame"
                : SCAN_PHASES.find((p) => p.phase === phase)?.label ?? "Completing..."}
            </motion.p>
          </AnimatePresence>

          {/* Progress bar */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              className="w-full max-w-[240px] h-1 rounded-full bg-white/5 overflow-hidden"
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>
          )}
        </div>

        {/* Data stream panel */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full max-w-sm glass rounded-2xl p-4 overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
                  Biometric Data Stream
                </span>
              </div>
              <div className="space-y-1 font-mono text-[11px]">
                {dataLines.map((line, i) => (
                  <motion.div
                    key={`${line}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-cyan-400/70 flex items-center gap-2"
                  >
                    <span className="text-fuchsia-400/50">›</span>
                    {line}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action button */}
        {phase === "idle" && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            onClick={startScan}
            className="group relative px-8 py-3.5 rounded-2xl font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
            <span className="relative z-10 text-black flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Begin Face Scan
            </span>
          </motion.button>
        )}

        {/* Security badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-2 text-[11px] text-white/25 tracking-wide"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          End-to-end encrypted · Hardware-grade security
        </motion.div>
      </motion.div>
    </div>
  );
}
