"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface PnLChartProps {
  data: number[];
  height?: number;
  gradient?: { from: string; to: string };
  showLabels?: boolean;
  label?: string;
}

export default function PnLChart({
  data,
  height = 120,
  gradient = { from: "#22d3ee", to: "#d946ef" },
  showLabels = false,
  label,
}: PnLChartProps) {
  const { path, areaPath, min, max, points } = useMemo(() => {
    const mn = Math.min(...data);
    const mx = Math.max(...data);
    const range = mx - mn || 1;
    const w = 100;
    const h = height;
    const stepX = w / (data.length - 1);

    const pts = data.map((v, i) => ({
      x: i * stepX,
      y: h - ((v - mn) / range) * (h * 0.8) - h * 0.1,
    }));

    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const cpx1 = pts[i - 1].x + stepX * 0.4;
      const cpy1 = pts[i - 1].y;
      const cpx2 = pts[i].x - stepX * 0.4;
      const cpy2 = pts[i].y;
      d += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${pts[i].x} ${pts[i].y}`;
    }

    const area = `${d} L ${pts[pts.length - 1].x} ${h} L ${pts[0].x} ${h} Z`;

    return { path: d, areaPath: area, min: mn, max: mx, points: pts };
  }, [data, height]);

  const gradientId = useMemo(() => `pnl-grad-${label ?? "default"}`, [label]);
  const areaGradientId = useMemo(() => `pnl-area-${label ?? "default"}`, [label]);

  return (
    <div className="relative w-full">
      {label && (
        <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-2">{label}</div>
      )}
      <svg
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={gradient.from} />
            <stop offset="100%" stopColor={gradient.to} />
          </linearGradient>
          <linearGradient id={areaGradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradient.from} stopOpacity="0.15" />
            <stop offset="100%" stopColor={gradient.from} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={areaPath}
          fill={`url(#${areaGradientId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Latest point glow */}
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="2"
          fill={gradient.to}
        >
          <animate attributeName="r" values="1.5;3;1.5" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
      {showLabels && (
        <div className="flex justify-between mt-1 text-[10px] text-white/20 font-mono">
          <span>${min.toLocaleString()}</span>
          <span>${max.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}
