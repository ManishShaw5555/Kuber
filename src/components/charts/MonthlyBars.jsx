import { useState } from "react";

import { calcSummary, fmtFull, isSameMonth, monthLabel, shiftMonth } from "../../utils/helpers";

export default function MonthlyBars({ txs }) {
  const [tip, setTip] = useState(null);
  const now = new Date();

  const months = Array.from({ length: 6 }, (_, index) => {
    const monthDate = shiftMonth(now, -5 + index);
    const monthTxs = txs.filter((tx) => isSameMonth(tx.date, monthDate));
    const summary = calcSummary(monthTxs);

    return {
      label: monthLabel(monthDate),
      income: summary.income,
      expense: summary.expense,
    };
  });

  const maxValue = Math.max(...months.flatMap((month) => [month.income, month.expense]), 1);
  const barHeight = 180;

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 12, minHeight: barHeight + 28 }}>
        {months.map((month) => (
          <div key={month.label} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 6, minHeight: barHeight }}>
              <div
                style={{
                  width: 20,
                  height: Math.max(4, (month.income / maxValue) * barHeight),
                  background: "linear-gradient(180deg, #65a043, #3b6d11)",
                  borderRadius: 8,
                }}
                onMouseEnter={(event) =>
                  setTip({
                    x: event.clientX,
                    y: event.clientY,
                    text: `Income ${month.label}: ${fmtFull(month.income)}`,
                  })
                }
                onMouseLeave={() => setTip(null)}
              />

              <div
                style={{
                  width: 20,
                  height: Math.max(4, (month.expense / maxValue) * barHeight),
                  background: "linear-gradient(180deg, #eb7264, #a32d2d)",
                  borderRadius: 8,
                }}
                onMouseEnter={(event) =>
                  setTip({
                    x: event.clientX,
                    y: event.clientY,
                    text: `Expense ${month.label}: ${fmtFull(month.expense)}`,
                  })
                }
                onMouseLeave={() => setTip(null)}
              />
            </div>

            <div style={{ marginTop: 10, fontSize: 12, color: "var(--color-text-secondary)" }}>{month.label}</div>
          </div>
        ))}
      </div>

      {tip && (
        <div
          style={{
            position: "fixed",
            left: tip.x + 12,
            top: tip.y - 36,
            background: "var(--color-background-secondary)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-border-secondary)",
            borderRadius: 10,
            padding: "6px 10px",
            fontSize: 12,
            boxShadow: "var(--shadow-soft)",
            zIndex: 20,
          }}
        >
          {tip.text}
        </div>
      )}
    </div>
  );
}
