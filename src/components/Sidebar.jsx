function KuberMark() {
  return (
    <svg viewBox="0 0 64 64" width="20" height="20" aria-hidden="true">
      <defs>
        <linearGradient id="kuber-logo-bg" x1="10" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D69339" />
          <stop offset="1" stopColor="#BA7517" />
        </linearGradient>
        <linearGradient id="kuber-logo-accent" x1="18" y1="18" x2="46" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF4D8" />
          <stop offset="1" stopColor="#FFE2A6" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#kuber-logo-bg)" />
      <path
        d="M20 16.5C20 15.6716 20.6716 15 21.5 15H25.5C26.3284 15 27 15.6716 27 16.5V29.3898L38.3367 16.6317C38.6214 16.3113 39.0294 16.1279 39.458 16.1279H44.6707C45.9694 16.1279 46.6538 17.6655 45.7865 18.6322L35.7118 29.8599L46.1125 44.7659C46.8097 45.7651 46.095 47.1377 44.8766 47.1377H39.7775C39.2811 47.1377 38.8164 46.8919 38.5365 46.481L30.4108 34.549L27 38.3007V45.6377C27 46.4661 26.3284 47.1377 25.5 47.1377H21.5C20.6716 47.1377 20 46.4661 20 45.6377V16.5Z"
        fill="url(#kuber-logo-accent)"
      />
      <circle cx="48" cy="18" r="4" fill="#FFF8E8" fillOpacity="0.72" />
    </svg>
  );
}

export default function Sidebar({ page, setPage, role, setRole, S, mobile = false, open = false, onClose }) {
  const navItems = [
    { id: "dashboard", label: "Overview", icon: "⊞" },
    { id: "transactions", label: "Transactions", icon: "≡" },
    { id: "insights", label: "Insights", icon: "↗" },
  ];

  return (
    <aside style={mobile ? S.mobileSidebar(open) : S.sidebar()}>
      <div style={S.logoRow}>
        <div style={S.logoMark}>
          <KuberMark />
        </div>
        <span style={S.logoText}>Kuber</span>
        {mobile && (
          <button onClick={onClose} style={{ marginLeft: "auto", width: 34, height: 34, padding: 0 }}>
            ✕
          </button>
        )}
      </div>

      <div style={S.navSection}>
        <div style={S.navLabel}>Main</div>

        {navItems.map((item) => (
          <div key={item.id} style={S.navItem(page === item.id)} onClick={() => setPage(item.id)}>
            <span style={{ fontSize: 11, width: 18, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: "12px 12px 16px" }}>
        <div
          style={{
            background: "var(--color-background-primary)",
            border: "1px solid var(--color-border-tertiary)",
            borderRadius: 12,
            padding: 12,
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.09em",
              color: "var(--color-text-tertiary)",
              marginBottom: 8,
            }}
          >
            Role
          </div>

          <select value={role} onChange={(event) => setRole(event.target.value)} style={{ width: "100%", marginBottom: 8 }}>
            <option value="admin">Administrator</option>
            <option value="viewer">Viewer</option>
          </select>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "3px 8px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              background: role === "admin" ? "rgba(186,117,23,0.12)" : "rgba(24,95,165,0.12)",
              color: role === "admin" ? "#854f0b" : "#185fa5",
            }}
          >
            {role === "admin" ? "⚡ Admin access" : "👁 View only"}
          </div>
        </div>
      </div>
    </aside>
  );
}
