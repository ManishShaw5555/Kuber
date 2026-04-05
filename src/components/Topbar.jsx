export default function Topbar({ page, setTheme, theme, exportCSV, S, onOpenNav }) {
  const pageTitles = {
    dashboard: "Overview",
    transactions: "Transactions",
    insights: "Insights",
  };

  return (
    <header style={S.topbar}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {onOpenNav && (
          <button onClick={onOpenNav} style={S.mobileMenuBtn}>
            ☰
          </button>
        )}
        <span style={{ fontSize: 16, fontWeight: 700 }}>{pageTitles[page]}</span>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
        <span
          style={{
            fontSize: 12,
            color: "var(--color-text-tertiary)",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            padding: "4px 10px",
            background: "var(--color-background-primary)",
            borderRadius: 20,
            border: "1px solid var(--color-border-tertiary)",
          }}
        >
          {new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>

        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <button
          onClick={exportCSV}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "rgba(186,117,23,0.1)",
            border: "1px solid rgba(186,117,23,0.2)",
            borderRadius: 8,
            padding: "6px 12px",
            color: "#854f0b",
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          ↓ Export CSV
        </button>
      </div>
    </header>
  );
}
