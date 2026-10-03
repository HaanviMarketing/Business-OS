# BusinessOS — Your Business. One Brain.

An intelligent AI-powered Business Operating System connecting customers, sales, money, operations, human resources, and multi-agent autonomous automation.

![BusinessOS](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80)

---

## 🚀 Overview

**BusinessOS** unifies all foundational business operations into a single cohesive cockpit:
- 📊 **Executive Command Center**: Real-time revenue runway, burn rate, cash flow, and health metrics.
- 👥 **Customer & CRM Pipeline**: Leads, deals, contact histories, pipeline stages, and conversion tracking.
- 💰 **Financial Engine**: Invoicing, expense tracking, accounts receivable aging, and automated tax calculations.
- 📦 **Inventory & Suppliers**: Stock levels, SKU reorder triggers, purchase orders, and supplier catalogs.
- 👔 **Human Resources & People Ops**: Employee directory, payroll engine with tax withholdings, leave/PTO tracking, candidate pipeline (ATS), attendance, and performance reviews.
- 🤖 **Autonomous AI Agents**: 8 specialized agents continuously monitoring sales, churn, inventory, finance, compliance, support, operations, and HR.
- ⚡ **AI Brain & Ask AI**: Instant intelligent natural language query answering and one-click contextual action triggers.
- 🛡️ **Role-Based Access Control (RBAC)**: Switch dynamically between Owner, Admin, Manager, Sales, Finance, HR, Operations, and Support roles.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide React icons, Framer Motion
- **Backend / Dev Server**: Node.js, Express, `tsx`
- **AI Engine**: `@google/genai` (Google Gemini SDK)

---

## 🏁 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/business-os.git
cd business-os
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Populate the `.env` values:
```env
GEMINI_API_KEY="your-gemini-api-key-here"
PORT=3000
```
*(Get your free Gemini API key from [Google AI Studio](https://aistudio.google.com/))*

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Step-by-Step Guide: Publish to GitHub & Netlify

### Step 1: Push Code to GitHub

1. **Create a new repository on GitHub:**
   - Go to [github.com/new](https://github.com/new).
   - Enter a repository name (e.g., `business-os`).
   - Choose **Public** or **Private**, and leave "Initialize with README" **unchecked**.
   - Click **Create repository**.

2. **Initialize Git and push from your local terminal:**
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Initial commit: BusinessOS with real-time Firebase sync"
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/business-os.git
   git push -u origin main
   ```

---

### Step 2: Deploy to Netlify

1. **Log into Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com) and log in (e.g. with your GitHub account).

2. **Import your project:**
   - Click **"Add new site"** → **"Import an existing project"**.
   - Select **GitHub** and authorize access to your repository `business-os`.

3. **Verify Build Settings:**
   Netlify automatically detects `netlify.toml` in the repository:
   - **Base directory:** *(leave empty)*
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

4. **(Optional) Configure Environment Variables:**
   - Under **Site configuration** → **Environment variables**, you can optionally add:
     - `GEMINI_API_KEY`: *(Your Google AI Studio Gemini API Key)*
     - Any custom `VITE_FIREBASE_*` keys if you want to override the bundled `firebase-applet-config.json`.

5. **Click "Deploy site":**
   - Netlify will build and deploy your app in ~1 minute.
   - You will get a live URL (e.g. `https://your-site-name.netlify.app`).

---

### Step 3: Authorize Netlify Domain in Firebase

To ensure Firebase Authentication (Google Sign-In & Email login) works seamlessly on your live Netlify domain:
1. Open [Firebase Console](https://console.firebase.google.com/).
2. Select your project (`polished-memory-3smzh`).
3. In the left menu, click **Build** → **Authentication** → **Settings** tab.
4. Under **Authorized domains**, click **Add domain**.
5. Add your Netlify domain (e.g., `your-site-name.netlify.app`).

---

## 📜 Available Scripts

- `npm run dev`: Starts the full-stack server (Express + Vite) on port 3000.
- `npm run build`: Builds the production bundle in `dist/`.
- `npm run start`: Runs the production server with `tsx server.ts`.
- `npm run lint`: Checks TypeScript compilation without emitting files.

---

## 📂 Project Structure

```
├── src/
│   ├── components/
│   │   ├── navigation/        # TopBar, Sidebar, Command deck navigation
│   │   ├── modals/            # Ask AI drawer, Command Palette (Cmd+K), Onboarding
│   │   └── views/             # Core dashboards:
│   │       ├── CommandCenterView.tsx  # Executive metrics & health
│   │       ├── CustomersView.tsx      # CRM & Lead pipeline
│   │       ├── InvoicesView.tsx       # Billing & Accounts Receivable
│   │       ├── HRView.tsx             # People ops, Payroll, PTO, Recruitment
│   │       ├── AIAgentsView.tsx       # 8 Autonomous AI business agents
│   │       ├── InventoryView.tsx      # Stock tracking & automated reordering
│   │       ├── AnalyticsView.tsx      # Revenue trends & cohort analytics
│   │       └── ...
│   ├── context/
│   │   └── BusinessContext.tsx# Single-source-of-truth business state provider
│   ├── data/
│   │   └── initialData.ts     # Realistic business data & workflows
│   ├── services/
│   │   └── aiBrain.ts         # Gemini AI reasoning engine & query classifier
│   └── types/
│       └── index.ts           # Enterprise TypeScript interfaces & schemas
├── server.ts                  # Express backend proxy & Vite middleware
├── vite.config.ts             # Vite configuration
└── package.json
```

---

## 📄 License

MIT License — Feel free to customize and deploy for your business!
