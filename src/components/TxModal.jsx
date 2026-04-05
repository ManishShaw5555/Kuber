import { useState } from "react";

import { CAT_LIST } from "../utils/constants";

const EMPTY_FORM = {
  desc: "",
  amount: "",
  type: "expense",
  cat: "Food & Dining",
  date: new Date().toISOString().slice(0, 10),
};

export default function TxModal({ editTx, onClose, onSave, S }) {
  const [form, setForm] = useState(
    editTx
      ? {
          desc: editTx.desc,
          amount: String(editTx.amount),
          type: editTx.type,
          cat: editTx.cat,
          date: editTx.date,
        }
      : EMPTY_FORM,
  );

  const setField = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const handleSave = () => {
    if (!form.desc.trim() || !form.amount || !form.date) return;
    onSave({ ...form, amount: Number(form.amount), id: editTx?.id });
  };

  return (
    <div style={S.overlay} onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div style={S.modal}>
        <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 18 }}>{editTx ? "Edit transaction" : "Add transaction"}</p>

        <div style={S.formGrid}>
          <div style={{ ...S.formField, gridColumn: "1 / -1" }}>
            <label style={S.formLabel}>Description</label>
            <input value={form.desc} onChange={setField("desc")} placeholder="e.g. Netflix subscription" />
          </div>

          <div style={S.formField}>
            <label style={S.formLabel}>Amount (₹)</label>
            <input type="number" value={form.amount} onChange={setField("amount")} placeholder="0" min="0" />
          </div>

          <div style={S.formField}>
            <label style={S.formLabel}>Type</label>
            <select value={form.type} onChange={setField("type")}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>

          <div style={S.formField}>
            <label style={S.formLabel}>Category</label>
            <select value={form.cat} onChange={setField("cat")}>
              {CAT_LIST.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={S.formField}>
            <label style={S.formLabel}>Date</label>
            <input type="date" value={form.date} onChange={setField("date")} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSave}
            style={{
              background: "#ba7517",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "7px 18px",
              fontWeight: 700,
            }}
          >
            {editTx ? "Save changes" : "Add transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}
