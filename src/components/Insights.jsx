import MonthlyBars from "./charts/MonthlyBars";
import { calcSummary, fmt, fmtFull, isSameMonth, shiftMonth } from "../utils/helpers";

export default function Insights({ txs, S }) {
  const now = new Date();
  const thisMonth = txs.filter((tx) => isSameMonth(tx.date, now));
  const lastMonthDate = shiftMonth(now, -1);
  const lastMonth = txs.filter((tx) => isSameMonth(tx.date, lastMonthDate));

  const sm = calcSummary(thisMonth);
  const lm = calcSummary(lastMonth);

  const byCat = {};
  txs
    .filter((tx) => tx.type === "expense")
    .forEach((tx) => {
      byCat[tx.cat] = (byCat[tx.cat] || 0) + tx.amount;
    });

  const topCat = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0];
  const savingsRate = sm.income > 0 ? ((sm.savings / sm.income) * 100).toFixed(1) : "0.0";
  const avgTx = txs.length ? Math.round(txs.reduce((sum, tx) => sum + tx.amount, 0) / txs.length) : 0;
  const expDelta = lm.expense ? (((sm.expense - lm.expense) / lm.expense) * 100).toFixed(1) : "N/A";

  const cards = [
    {
      icon: "🏆",
      label: "Top spending category",
      value: topCat ? topCat[0] : "-",
      desc: topCat ? `Total: ${fmtFull(topCat[1])}` : "No expense data",
    },
    {
      icon: "📊",
      label: "Savings rate",
      value: `${savingsRate}%`,
      desc: `Saved ${fmt(sm.savings)} of ${fmt(sm.income)} this month`,
    },
    {
      icon: "📉",
      label: "Expense vs last month",
      value: typeof expDelta === "string" ? expDelta : `${expDelta}%`,
      desc: `${fmtFull(Math.abs(sm.expense - lm.expense))} ${sm.expense >= lm.expense ? "more" : "less"} than last month`,
    },
    {
      icon: "💳",
      label: "Avg transaction",
      value: fmt(avgTx),
      desc: `Across ${txs.length} total transactions`,
    },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 12, marginBottom: 20 }}>
        {cards.map((card) => (
          <div key={card.label} className="kuber-card" style={S.card}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                display: "grid",
                placeItems: "center",
                background: "var(--color-background-secondary)",
                color: "#ba7517",
                fontWeight: 700,
                fontSize: 12,
                marginBottom: 10,
              }}
            >
              {card.icon}
            </div>
            <div style={S.cardLabel}>{card.label}</div>
            <div style={{ ...S.cardValue, fontSize: 22 }}>{card.value}</div>
            <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 4, lineHeight: 1.4 }}>{card.desc}</div>
          </div>
        ))}
      </div>

      <div className="kuber-panel" style={S.panel}>
        <div style={S.panelHeader}>
          <div>
            <div style={S.panelTitle}>Monthly comparison</div>
            <div style={S.panelSub}>Income vs expenses over the last 6 months</div>
          </div>

          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            {[
              ["#3b6d11", "Income"],
              ["#a32d2d", "Expenses"],
            ].map(([color, label]) => (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--color-text-secondary)" }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: color, display: "inline-block" }} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <MonthlyBars txs={txs} />
      </div>
    </div>
  );
}
