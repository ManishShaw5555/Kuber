import { useMemo, useState } from "react";

import LineChart from "./charts/LineChart";
import DonutChart from "./charts/DonutChart";
import { calcSummary, fmt, isSameMonth, shiftMonth } from "../utils/helpers";

export default function Overview({ txs, S }) {
  const [period, setPeriod] = useState(3);

  const { thisMonth, lastMonth, all } = useMemo(() => {
    const now = new Date();
    const thisMonthDate = shiftMonth(now, 0);
    const lastMonthDate = shiftMonth(now, -1);

    return {
      thisMonth: txs.filter((tx) => isSameMonth(tx.date, thisMonthDate)),
      lastMonth: txs.filter((tx) => isSameMonth(tx.date, lastMonthDate)),
      all: txs,
    };
  }, [txs]);

  const sm = calcSummary(thisMonth);
  const lm = calcSummary(lastMonth);
  const totals = calcSummary(all);

  const cards = [
    { label: "Total balance", value: fmt(totals.balance), prev: lm.balance, cur: sm.balance, icon: "◈", accent: "#ba7517" },
    { label: "Total income", value: fmt(totals.income), prev: lm.income, cur: sm.income, icon: "↑", accent: "#3b6d11" },
    { label: "Total expenses", value: fmt(totals.expense), prev: lm.expense, cur: sm.expense, icon: "↓", accent: "#a32d2d", invert: true },
    { label: "Net savings", value: fmt(totals.savings), prev: lm.savings, cur: sm.savings, icon: "◇", accent: "#185fa5" },
  ];

  return (
    <div>
      <div style={S.cardsGrid}>
        {cards.map((card) => {
          const delta = card.prev ? (((card.cur - card.prev) / card.prev) * 100).toFixed(1) : "0.0";
          const up = Number(delta) >= 0;
          const positive = card.invert ? !up : up;

          return (
            <div key={card.label} className="kuber-card" style={S.card}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  display: "grid",
                  placeItems: "center",
                  background: "var(--color-background-secondary)",
                  color: card.accent,
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                {card.icon}
              </div>
              <div style={S.cardLabel}>{card.label}</div>
              <div style={S.cardValue}>{card.value}</div>
              <div style={S.cardChange}>
                <span style={{ color: positive ? "#3b6d11" : "#a32d2d", fontWeight: 700 }}>
                  {up ? "▲" : "▼"} {Math.abs(Number(delta))}%
                </span>
                <span style={{ color: "var(--color-text-tertiary)" }}>vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 340px)", gap: 14 }}>
        <div className="kuber-panel" style={S.panel}>
          <div style={S.panelHeader}>
            <div>
              <div style={S.panelTitle}>Balance trend</div>
              <div style={S.panelSub}>Running monthly balance</div>
            </div>

            <div style={S.tabs}>
              {[3, 6, 12].map((months) => (
                <button key={months} style={S.tab(period === months)} onClick={() => setPeriod(months)}>
                  {months === 12 ? "1Y" : `${months}M`}
                </button>
              ))}
            </div>
          </div>

          <LineChart txs={txs} period={period} />
        </div>

        <div className="kuber-panel" style={S.panel}>
          <div style={S.panelHeader}>
            <div>
              <div style={S.panelTitle}>Spending breakdown</div>
              <div style={S.panelSub}>By category this month</div>
            </div>
          </div>

          <DonutChart txs={txs} />
        </div>
      </div>
    </div>
  );
}
