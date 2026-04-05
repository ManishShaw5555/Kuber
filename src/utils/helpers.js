export const fmt = (n) => {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
};

export const fmtFull = (n) => `₹${Math.abs(n).toLocaleString("en-IN")}`;

export const calcSummary = (txs) => {
  let income = 0;
  let expense = 0;

  txs.forEach((tx) => {
    if (tx.type === "income") income += tx.amount;
    else if (tx.type === "expense") expense += tx.amount;
  });

  return {
    income,
    expense,
    balance: income - expense,
    savings: Math.max(0, income - expense),
  };
};

export const monthLabel = (date) => date.toLocaleDateString("en", { month: "short" });

export const isSameMonth = (inputDate, targetDate) => {
  const date = new Date(inputDate);
  return (
    date.getMonth() === targetDate.getMonth() &&
    date.getFullYear() === targetDate.getFullYear()
  );
};

export const shiftMonth = (date, diff) => new Date(date.getFullYear(), date.getMonth() + diff, 1);
