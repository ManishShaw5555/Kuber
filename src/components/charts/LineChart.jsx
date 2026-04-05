import { useMemo, useState } from "react";

import { calcSummary, fmt, isSameMonth, monthLabel, shiftMonth } from "../../utils/helpers";

export default function LineChart({ txs, period }) {
  const [tip, setTip] = useState(null);

  const points = useMemo(
    () => {
      const now = new Date();

      return Array.from({ length: period }, (_, index) => {
        const monthDate = shiftMonth(now, -(period - 1 - index));
        const monthTxs = txs.filter((tx) => isSameMonth(tx.date, monthDate));
        const summary = calcSummary(monthTxs);

        return {
          label: monthLabel(monthDate),
          balance: summary.balance,
          income: summary.income,
          expense: summary.expense,
        };
      });
    },
    [period, txs],
  );

  const width = 560;
  const height = 160;
  const pad = { top: 16, right: 16, bottom: 32, left: 52 };
  const values = points.map((point) => point.balance);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const xStep = (width - pad.left - pad.right) / Math.max(points.length - 1, 1);
  const toX = (index) => pad.left + index * xStep;
  const toY = (value) => pad.top + (height - pad.top - pad.bottom) * (1 - (value - min) / range);
  const pointArray = points.map((point, index) => ({ x: toX(index), y: toY(point.balance), data: point }));
  const pathD = pointArray.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");
  const areaD = `${pathD} L${pointArray.at(-1)?.x ?? 0},${height - pad.bottom} L${pointArray[0]?.x ?? 0},${height - pad.bottom} Z`;
  const yTicks = [min, min + range / 2, max];

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", display: "block" }}>
        <defs>
          <linearGradient id="balance-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ba7517" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ba7517" stopOpacity="0" />
          </linearGradient>
        </defs>

        {yTicks.map((value) => (
          <g key={value}>
            <line
              x1={pad.left}
              y1={toY(value)}
              x2={width - pad.right}
              y2={toY(value)}
              stroke="var(--color-border-tertiary)"
              strokeDasharray="4 3"
            />
            <text
              x={pad.left - 6}
              y={toY(value)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={9}
              fill="var(--color-text-tertiary)"
            >
              {fmt(Math.round(value))}
            </text>
          </g>
        ))}

        {pointArray.map((point) => (
          <text key={point.data.label} x={point.x} y={height - pad.bottom + 14} textAnchor="middle" fontSize={10} fill="var(--color-text-tertiary)">
            {point.data.label}
          </text>
        ))}

        <path d={areaD} fill="url(#balance-fill)" />
        <path d={pathD} fill="none" stroke="#ba7517" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {pointArray.map((point) => (
          <circle
            key={point.data.label}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="#fff"
            stroke="#ba7517"
            strokeWidth="3"
            onMouseEnter={() => setTip(point)}
            onMouseLeave={() => setTip(null)}
          />
        ))}
      </svg>

      {tip && (
        <div
          style={{
            position: "absolute",
            left: `min(${tip.x}px, calc(100% - 120px))`,
            top: Math.max(tip.y - 48, 8),
            transform: "translateX(-50%)",
            background: "var(--color-background-secondary)",
            border: "1px solid var(--color-border-secondary)",
            borderRadius: 10,
            padding: "8px 10px",
            fontSize: 12,
            boxShadow: "var(--shadow-soft)",
            minWidth: 110,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 2 }}>{tip.data.label}</div>
          <div style={{ color: "var(--color-text-secondary)" }}>Balance: {fmt(tip.data.balance)}</div>
        </div>
      )}
    </div>
  );
}
