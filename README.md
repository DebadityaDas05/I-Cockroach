# 🪳 I-COCKROACH — Hyperlocal Business Execution Platform

> **Codeflow 2k26 — Skycyber Project**
>
> A revolutionary hyperlocal business execution platform engineered to bridge local micro-businesses (SMEs) directly with a trust-verified digital student workforce. I-COCKROACH is designed to eliminate corporate agency dependency, drastically lower execution costs, and build a trustless proof-of-work pipeline.

---

## 📂 Project Repository Structure

This repository is structured as a **monorepo** containing both the backend service and the frontend client:

```
I-COCKROACH/
├── 📁 backend/                # Spring Boot REST API
│   ├── 📁 src/main/java/     # Spring Boot source code (Auth, OCR, Pitch Service)
│   ├── 📁 src/main/resources/# Application configuration & static assets
│   ├── 📄 pom.xml             # Maven dependencies
│   └── 📄 mvnw/mvnw.cmd       # Maven wrapper scripts
├── 📁 frontend/               # React / Vite Client App
│   ├── 📁 src/                # React pages, components, & styles
│   ├── 📄 package.json        # Node dependencies & npm scripts
│   ├── 📄 tailwind.config.js  # Styling configuration
│   └── 📄 vite.config.js      # Bundler configuration
├── 📄 .gitignore              # Monorepo-level git ignore rules
├── 📄 .env                    # Shared local environment variables (ignored by Git)
└── 📄 README.md               # Root documentation (this file)
```

---

## 🚀 Key Features

*   **📍 Hyperlocal Geofencing:** Deploy visual marketing, physical auditing, logistics, and localized campaigns targeted precisely to specific areas and zip codes.
*   **⛓️ Trustless Proof-of-Work Ledger:** Visual evidence, geolocated timestamps, and real-time review mechanisms secure every transaction and guarantee high execution accuracy.
*   **⚡ Instant Match Engine:** Advanced routing algorithms connect businesses and verified student talent in minutes, allowing on-demand operational triggers.
*   **🤖 Floating AI Match Assistant:** A built-in AI assistant helps freelancers draft high-conversion pitches and helps business owners optimize project scopes.
*   **💼 Services Marketplace:** Post requirements, filter by budget/domain, submit structured pitches, and manage local contracts seamlessly.
*   **📧 Email OTP Authentication:** A secure OTP-based login/verification workflow to authenticate users using their email address.
*   **🔍 Document OCR & AI Verification:** Extracts text from uploaded documents (e.g. student IDs, certificates) to verify the authenticity of educational institutions using AI.
*   **📝 Project Pitch Submission:** Allows creators to submit structured project pitches that are persisted to Neon PostgreSQL and processed.

---

## 🛠️ Technology Stack

### Backend Service (Spring Boot)
- **Framework:** Spring Boot (Java 17+)
- **Build Tool:** Maven
- **Database:** PostgreSQL (Hosted on Neon DB)
- **ORM / Persistence:** Spring Data JPA / Hibernate
- **Optical Character Recognition:** Tess4J (Tesseract OCR wrapper)
- **AI Integration:** OkHttp3 client calling Groq Cloud API (`llama-3.1-8b-instant` model)
- **Email Delivery:** Spring Boot Starter Mail (Gmail SMTP configuration)

### Frontend Client (React)
- **Core Framework:** [React 19](https://react.dev/)
- **Build Tooling & Bundler:** [Vite 8](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Client Routing:** [React Router Dom v7](https://reactrouter.com/)
- **API Integrations:** Axios/Fetch bindings connecting to the Spring Boot REST API (`http://localhost:8080`)

---

## ⚙️ Configuration & Setup

### 1. Environment Variables Configuration
To keep the application secure, secrets are managed through a root-level `.env` file (which is excluded from Git tracking).

Create a file named `.env` in the root of the project (`I-Cockroach/.env`) and populate it with your credentials:
```env
# Mail Configuration
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-gmail-app-password

# Database Configuration
DB_USERNAME=neondb_owner
DB_PASSWORD=your-neon-db-password
DB_URL=jdbc:postgresql://your-neon-database-url/neondb?sslmode=require

# AI Service (Groq API Key)
GROQ_API_KEY=gsk_your_groq_api_key_here
```

---

## 🏃 Local Development Setup & Execution

### Running the Backend Service
1. Make sure you have **JDK 17 or higher** installed.
2. Tesseract language data (`eng.traineddata`) must reside inside [tessdata](file:///d:/Projects/I-Cockroach/backend/src/main/resources/tessdata) directory.
3. Open a terminal in the `backend/` folder and run:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend server will spin up on `http://localhost:8080`.

### Running the Frontend Client
1. Ensure you have **Node.js** (v18 or higher) and **npm** installed.
2. Open a terminal in the `frontend/` folder and run:
   ```bash
   npm install
   npm run dev
   ```
   The frontend application will start on `http://localhost:5173`.

---

## 📡 API Endpoints Reference

### 🔐 Authentication (`/auth`)
*   `GET /auth/send-otp?email=user@example.com` - Generates and sends a 6-digit OTP code.
*   `GET /auth/verify-otp?email=user@example.com&otp=123456` - Verifies if the OTP is correct.

### 📷 OCR Verification (`/api/ocr`)
*   `POST /api/ocr` - Uploads a document (student ID/certificate) for text extraction and educational institute validation. Expects a `file` multipart request and returns a boolean (`true`/`false`).

### 💡 Pitch Management (`/pitch`)
*   `POST /pitch/create` - Submits a new project pitch to be stored in the database. Expects JSON body:
    ```json
    {
      "projectTitle": "My Awesome Project",
      "pitchText": "A detailed description of the project pitch..."
    }
    ```

---

## 🔒 License
This project was prepared for Codeflow 2026. All rights reserved.
