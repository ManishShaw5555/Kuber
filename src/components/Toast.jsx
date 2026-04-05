export default function Toast({ toast, S }) {
  return (
    <div style={S.toast(toast.show)}>
      <span style={{ fontWeight: 700 }}>{toast.type === "success" ? "✓" : "✕"}</span>
      {toast.msg}
    </div>
  );
}
