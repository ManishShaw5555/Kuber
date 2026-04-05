💰 Kuber(LIVE AT : https://manishshaw5555.github.io/Kuber/)

Kuber is a lightweight personal finance dashboard built with React and Vite. It provides a clean, single-page experience for tracking transactions, analyzing monthly performance, and exploring spending patterns — all without requiring a backend.

🚀 Features
📊 Overview dashboard with balance, income, expense, and savings cards
📄 Transactions table with search, filtering, sorting, and pagination
📈 Insights page with category summaries and monthly comparisons
➕ Add, ✏️ edit, and 🗑️ delete transactions
📤 CSV export for transaction data
🌗 Light/Dark theme toggle
👤 Admin & Viewer role-based UI behavior
🌱 Seeded demo data (including current month transactions)
✨ Subtle UI animations for better UX

🛠️ Tech Stack
React 19
Vite 8
Recharts
Plain CSS + Inline Styles
Browser localStorage (for persistence)

📦 Setup & Installation
Prerequisites
Node.js (v18+ recommended)
npm
Install dependencies
npm install
Start development server
npm run dev

App will be available at:

http://localhost:5173
Build for production
npm run build
Preview production build
npm run preview
Run linting
npm run lint
⚙️ How It Works

Kuber is a frontend-only application:

On first load, transactions are initialized from:

src/utils/constants.js

After that, all data is stored in:

localStorage → kuber_txs

This ensures:

No backend required
Data persists across refreshes
🧩 Project Structure
src/
│
├── App.jsx                  # Main app shell
├── components/
│   ├── Overview.jsx         # Dashboard summary
│   ├── Transactions.jsx     # Transaction management
│   ├── Insights.jsx         # Analytics & charts
│   └── TxModal.jsx          # Add/Edit modal
│
├── utils/
│   ├── constants.js         # Seed data & categories
│   └── helpers.js           # Utility functions
│
└── index.css               # Global styles
🧠 Architecture Approach
Keep state centralized in the app shell
Use localStorage instead of backend
Build small, focused components
Use reusable helper utilities
Keep UI simple and clean with minimal animations
📊 Data Model

Each transaction follows this structure:

{
  id: 26,
  desc: "Monthly Salary",
  amount: 85000,
  type: "income",
  cat: "Salary",
  date: "2026-04-02"
}
Supported Types
income
expense
transfer
🧪 Development Notes
🔄 Reset data: clear kuber_txs from localStorage
🔐 Role selector controls permissions (Admin vs Viewer)
🎨 Styling uses inline styles + index.css
🔮 Future Improvements
🌐 Backend integration (database + API)
🔑 Authentication system
✅ Better validation & error handling
📥 CSV import support
🔁 Recurring transactions
🎯 Budgeting & financial goals
🧪 Automated testing
📄 License
