# I-Cockroach Backend Service

This repository houses the Spring Boot backend service for the **Skycyber project**. The backend provides robust features for email OTP authentication, automated OCR document scanning with AI-based institutional verification, and project pitch management.

---

## 🛠️ Technology Stack

- **Framework:** Spring Boot (Java 17+)
- **Build Tool:** Maven
- **Database:** PostgreSQL (Hosted on Neon DB)
- **ORM / Persistence:** Spring Data JPA / Hibernate
- **Optical Character Recognition:** Tess4J (Tesseract OCR wrapper)
- **AI Integration:** OkHttp3 client calling Groq Cloud API (`llama-3.1-8b-instant` model)
- **Email Delivery:** Spring Boot Starter Mail (Gmail SMTP configuration)

---

## 🚀 Key Features & Architectural Flow

### 1. 📧 Email OTP Authentication
A secure OTP-based login/verification workflow.
* **Flow:**
  1. The user requests an OTP by providing their email.
  2. The service generates a secure, random 6-digit OTP code using [OtpUtil](file:///d:/Projects/I-Cockroach/backend/src/main/java/com/arkaprava/backend/util/OtpUtil.java).
  3. The OTP code is saved in-memory and emailed to the user using Spring's `JavaMailSender` ([EmailService](file:///d:/Projects/I-Cockroach/backend/src/main/java/com/arkaprava/backend/service/EmailService.java)).
  4. The user submits the received OTP code, which is verified against the saved email and OTP.

### 2. 🔍 Document OCR & AI Verification
Extracts text from uploaded documents (e.g., student IDs, certificates) to verify the authenticity of their educational institution.
* **Flow:**
  1. User uploads a document image (PNG/JPEG) through `/api/ocr`.
  2. The service saves the upload as a temporary image file.
  3. [OcrService](file:///d:/Projects/I-Cockroach/backend/src/main/java/com/arkaprava/backend/service/OcrService.java) executes OCR using `Tess4J` (configured for English OCR engine mode) to extract text.
  4. The service parses the first line of the extracted text as the **Institute Name**.
  5. The institute name is sent to [AIverificationService](file:///d:/Projects/I-Cockroach/backend/src/main/java/com/arkaprava/backend/service/AIverificationService.java).
  6. The service invokes the **Groq API** (running the `llama-3.1-8b-instant` LLM model) with a prompt instructing it to verify whether the input represents a real educational institute.
  7. The LLM returns `true` or `false` indicating verification success.
  8. The temporary file is cleaned up, and the boolean result is returned to the client.

### 3. 📝 Project Pitch Submission
Allows creators to save their project pitches.
* **Flow:**
  1. Client sends a JSON payload representing a [Pitch](file:///d:/Projects/I-Cockroach/backend/src/main/java/com/arkaprava/backend/entity/Pitch.java) (Project Title & Pitch Description).
  2. The [PitchController](file:///d:/Projects/I-Cockroach/backend/src/main/java/com/arkaprava/backend/controller/PitchController.java) uses [PitchRepository](file:///d:/Projects/I-Cockroach/backend/src/main/java/com/arkaprava/backend/repository/PitchRepository.java) to persist the record to PostgreSQL.

---

## 📡 API Endpoints Reference

### 🔐 Authentication Controller (`/auth`)

#### `GET /auth/send-otp`
Generates and sends a 6-digit OTP code to the requested email address.
* **Query Parameters:**
  * `email` (String, required)
* **Response:**
  * `200 OK` with string message: `"OTP Sent Successfully"` (or error message)

#### `GET /auth/verify-otp`
Verifies whether the provided OTP code matches the saved record.
* **Query Parameters:**
  * `email` (String, required)
  * `otp` (String, required)
* **Response:**
  * `200 OK` with string message: `"OTP VERIFIED"` or `"INVALID OTP"`

---

### 📷 OCR Verification Controller (`/api/ocr`)

#### `POST /api/ocr`
Uploads a document for text extraction and educational institute validation.
* **Request Body:**
  * `file` (Multipart file, required)
* **Response:**
  * `200 OK` with boolean value (`true` or `false`) representing verification status.
  * `400 Bad Request` containing error details if OCR fails.

---

### 💡 Pitch Controller (`/pitch`)

#### `POST /pitch/create`
Submits a new project pitch to be stored in the database.
* **Request Body:** `application/json`
  ```json
  {
    "projectTitle": "My Awesome Project",
    "pitchText": "A detailed description of the project pitch..."
  }
  ```
* **Response:**
  * `200 OK` containing the created `Pitch` object including its database-generated `id`.

---

## ⚙️ Configuration Setup

Make sure your [application.properties](file:///d:/Projects/I-Cockroach/backend/src/main/resources/application.properties) is populated with your specific credentials:

```properties
# App Configuration
spring.application.name=backend

# Mail Setup (Gmail SMTP)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# Database Setup (Neon PostgreSQL)
spring.datasource.url=jdbc:postgresql://your-neon-database-url/neondb?sslmode=require
spring.datasource.username=your-db-username
spring.datasource.password=your-db-password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# AI Service (Groq API Key)
groq.api.key=gsk_your_groq_api_key_here
```

---

## ⚙️ Local Development Setup & Execution

### Prerequisites
1. **Java Development Kit (JDK 17 or higher)** installed.
2. **Maven** installed (or use the included wrapper script `./mvnw`).
3. Tesseract language data (`eng.traineddata`) must reside inside [tessdata](file:///d:/Projects/I-Cockroach/backend/src/main/resources/tessdata) directory.

### Running the Application
From the `backend/` directory root, run:

```bash
./mvnw spring-boot:run
```
The server will start up and run by default on port `8080`.