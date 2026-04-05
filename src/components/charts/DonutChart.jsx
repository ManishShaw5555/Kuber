import { useMemo, useState } from "react";

import { fmt, isSameMonth } from "../../utils/helpers";
import { CAT_META } from "../../utils/constants";

export default function DonutChart({ txs }) {
  const [tip, setTip] = useState(null);

  const byCat = useMemo(() => {
    const now = new Date();
    const totals = {};

    txs
      .filter((tx) => tx.type === "expense" && isSameMonth(tx.date, now))
      .forEach((tx) => {
        totals[tx.cat] = (totals[tx.cat] || 0) + tx.amount;
      });

    return Object.entries(totals).sort((a, b) => b[1] - a[1]);
  }, [txs]);

  const total = byCat.reduce((sum, [, value]) => sum + value, 0) || 1;
  const outerRadius = 68;
  const innerRadius = 46;
  const centerX = 90;
  const centerY = 90;

  if (!byCat.length) {
    return <div style={{ color: "var(--color-text-tertiary)", textAlign: "center", padding: "36px 0" }}>No expenses this month</div>;
  }

  const slices = byCat.reduce(
    (acc, [cat, value]) => {
      const pct = value / total;
      const sweep = pct * 2 * Math.PI;
      const start = acc.angle;
      const end = start + sweep;

      const x1 = centerX + outerRadius * Math.cos(start);
      const y1 = centerY + outerRadius * Math.sin(start);
      const x2 = centerX + outerRadius * Math.cos(end);
      const y2 = centerY + outerRadius * Math.sin(end);
      const xi1 = centerX + innerRadius * Math.cos(end);
      const yi1 = centerY + innerRadius * Math.sin(end);
      const xi2 = centerX + innerRadius * Math.cos(start);
      const yi2 = centerY + innerRadius * Math.sin(start);
      const largeArc = sweep > Math.PI ? 1 : 0;

      acc.items.push({
        cat,
        value,
        pct,
        path: `M${x1},${y1}
      A${outerRadius},${outerRadius} 0 ${largeArc},1 ${x2},${y2}
      L${xi1},${yi1}
      A${innerRadius},${innerRadius} 0 ${largeArc},0 ${xi2},${yi2}
      Z`,
        color: (CAT_META[cat] || CAT_META.Other).color,
      });
      acc.angle = end;
      return acc;
    },
    { angle: -Math.PI / 2, items: [] },
  ).items;

  return (
    <div style={{ textAlign: "center" }}>
      <svg viewBox="0 0 180 180" width="180" style={{ maxWidth: "100%" }}>
        {slices.map((slice) => (
          <path
            key={slice.cat}
            d={slice.path}
            fill={slice.color}
            onMouseEnter={() => setTip(slice)}
            onMouseLeave={() => setTip(null)}
          />
        ))}

        <text x={centerX} y={centerY - 8} textAnchor="middle" fontSize="11" fill="var(--color-text-tertiary)">
          {tip ? tip.cat : "Total"}
        </text>
        <text x={centerX} y={centerY + 12} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--color-text-primary)">
          {fmt(tip ? tip.value : total)}
        </text>
      </svg>

      <div style={{ display: "grid", gap: 8, marginTop: 16 }}>
        {slices.map((slice) => (
          <div key={slice.cat} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, fontSize: 12 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--color-text-secondary)" }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: slice.color, display: "inline-block" }} />
              {slice.cat}
            </span>
            <span style={{ fontWeight: 700 }}>{Math.round(slice.pct * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
