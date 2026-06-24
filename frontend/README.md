# 🪳 I-COCKROACH — Hyperlocal Business Execution Platform

> **Codeflow 2k26 - Skycyber Project (Frontend Workspace)**
>
> A revolutionary hyperlocal business execution platform engineered to bridge local micro-businesses (SMEs) directly with a trust-verified digital student workforce. I-COCKROACH is designed to eliminate corporate agency dependency, drastically lower execution costs, and build a trustless proof-of-work pipeline.

---

## 🚀 Key Features

*   **📍 Hyperlocal Geofencing:** Deploy visual marketing, physical auditing, logistics, and localized campaigns targeted precisely to specific areas and zip codes.
*   **⛓️ Trustless Proof-of-Work Ledger:** Visual evidence, geolocated timestamps, and real-time review mechanisms secure every transaction and guarantee high execution accuracy (99.8%).
*   **⚡ Instant Match Engine:** Advanced routing algorithms connect businesses and verified student talent in minutes, allowing on-demand operational triggers.
*   **🤖 Floating AI Match Assistant:** A built-in AI assistant helps freelancers draft high-conversion pitches and helps business owners optimize project scopes.
*   **💼 Services Marketplace:** Post requirements, filter by budget/domain, submit structured pitches, and manage local contracts seamlessly.

---

## 🛠️ Tech Stack & Architecture

The frontend is built using a modern, performant, and visual-first stack:

*   **Core Framework:** [React 19](https://react.dev/) (utilizing modern hooks, fragments, and state management)
*   **Build Tooling & Bundler:** [Vite 8](https://vite.dev/) (ultra-fast Hot Module Replacement)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (modern CSS-in-JS utility-first styling with high visual aesthetics)
*   **Client Routing:** [React Router Dom v7](https://reactrouter.com/) (declarative nested routes)
*   **API Integrations:** Axios/Fetch bindings connecting to the AI-powered Pitch Analyzer backend (`http://localhost:8080`)

---

## 📁 Repository Structure

```
d:\Projects\whole-frontend
├── 📁 src/
│   ├── 📁 Pages/                   # Core application views
│   │   ├── Landing.jsx            # Multi-section scrolling Home Hub
│   │   ├── business.jsx           # Business dashboard, gig management and audits
│   │   ├── common.jsx             # Freelancer Marketplace search & filter directory
│   │   ├── login_page.jsx         # Custom authentication forms & modals
│   │   ├── services.jsx           # Requirements post board & pitch submit pipeline
│   │   └── AiChatPopup.jsx        # Floating AI chat window integration
│   ├── 📁 Profile/
│   │   └── Dashboard.jsx          # Student metrics, contract tracker & ledger
│   ├── 📁 components/             # Reusable global layout elements
│   │   ├── Header.jsx             # Landing Navbar (transparent / sticky)
│   │   ├── Header2.jsx            # Dark Theme App Navbar
│   │   ├── Footer.jsx             # Landing Footer
│   │   ├── Footer2.jsx            # App Footer
│   │   └── Home.jsx               # Hero landing section & statistics
│   ├── 📁 assets/                 # Brand assets and visual mockups
│   ├── index.css                  # Tailwind entry and global layers
│   ├── layout.jsx                 # Routing wrapper with conditional chatbots
│   └── main.jsx                   # React mounting and router context
├── package.json                   # Dependencies and scripts definitions
├── vite.config.js                 # Vite custom React plugins configuration
└── tailwind.config.js             # Tailwind customized configuration
```

---

## 🎯 Domains of Execution

The platform categorizes digital work scopes into 6 structured verticals:
1.  **📱 Social Media:** Grid aesthetics, posting schedules, caption/hashtag copywriting, and DM reply flows.
2.  **🎨 Branding:** Vector logo design, digital catalogues, visiting cards, brochures, flyers, and menu layouts.
3.  **🎬 Video / Editing:** Cinematic reel/short cuts, sound design additions, subtitles sync, and color grading.
4.  **📈 Growth / Outreach:** College activations, micro-sponsor matching, partnership cold emails, and Lead Mining.
5.  **⚙️ Automation / Tech:** Make.com/Zapier bots, Google AppsScript custom macros, Framer/Webflow pages, and SEO.
6.  **📊 Research / Ops:** Competitor pricing audits, bulk Shopify listings curation, survey deployments, and data cleaning.

---

## 💻 Getting Started

### 📋 Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and [npm](https://www.npmjs.com/) installed on your machine.

### 🔧 Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone -b final-frontend https://github.com/arkaprava181204/Codeflow2k26_Skycyber_project.git
   cd Codeflow2k26_Skycyber_project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### 🏃 Running Locally

To start the local development server with hot reload:
   ```bash
   npm run dev
   ```
The application will default to running on `http://localhost:5173`.

### 🏗️ Production Build

To compile and optimize the application assets for production deployment:
   ```bash
   npm run build
   ```
To preview the compiled production build locally:
   ```bash
   npm run preview
   ```

---

## 🔗 Backend Connection & Endpoints

The frontend communicates with a local backend service to analyze pitches and match freelancer profiles:
*   **Pitch Submission:** `POST http://localhost:8080/pitch/create`
    *   Payload: `{ pitchText: String, projectTitle: String }`
    *   Triggered from the write pitch modal on `/services`.

---

## 🔒 License & Contributions

This project is prepared for Codeflow 2026. All rights reserved.
