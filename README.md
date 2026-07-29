# 🌌 HikariCV (InterviewAI) — AI-Driven Career Tech Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-3_Flash-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

> **Elevate your career with AI-driven precision.** HikariCV is a next-generation, full-stack career platform that analyzes job requirements and user profiles using advanced LLMs to generate personalized preparation roadmaps, tailor ATS-optimized resumes, and compile PDF applications on-the-fly.

---

## 🎨 Visual Showcase & User Journey

Here is the interface and flow of HikariCV, designed with a premium, minimalist light-themed visual design:

### 🏠 Landing Page
A modern UI featuring glassmorphism, responsive bento grids, and smooth animations highlighting our AI capability.
![Landing Page Screenshot](Frontend/public/Readme/home.png)


### 📊 Interview Prep & Strategy Dashboard
Users specify a target job description and upload a resume (PDF) or type a self-description to generate a customized strategy.
![Dashboard Screenshot](Frontend/public/Readme/dashboard.png)

---

## 🚀 Key Features

### 🔍 1. Personal Interview Planner & Analyzer
*   **Job Description Matching:** Compares user resume context against target job descriptions.
*   **AI Match Score:** Gives a real-time matching indicator (0-100%) highlighting candidate readiness.
*   **Skill Gaps Analysis:** Pinpoints critical competencies missing from the candidate's profile, categorized by severity (High/Medium/Low).

### 🤖 2. Custom Mock Interview Simulation
*   **Structured Technical & Behavioral Questions:** Generates interview questions tailored to the position and your resume.
*   **Interviewer Intention Insights:** Demystifies *why* a specific question is asked, giving candidates a strategic advantage.
*   **Model Answers:** Provides comprehensive model answers and recommended structures (like the STAR method).

### 📅 3. Multi-Day Preparation Roadmaps
*   **Structured Timelines:** Generates day-by-day tasks based on the candidate's preparation time window.
*   **Guided Action Items:** Contains study tasks, practice prompts, and focus areas to bridge skill gaps.

### 📄 4. ATS-Optimized Resume Tailoring & PDF Export
*   **Contextual Refinement:** Instructs Gemini to rewrite the candidate's resume, aligning accomplishments with the target job keywords.
*   **Server-Side Compilation:** Leverages a headless browser (**Puppeteer**) to generate an elegant A4 PDF layout based on tailored HTML resume styles.

---

## 🛠️ Advanced Tech Stack & Architecture

This repository showcases a professional, decoupled Client-Server architecture utilizing modern web standards.

### Frontend (Client)
*   **React 19 (Vite):** Utilizes React 19's fast runtime and HMR capabilities.
*   **Router v7:** Employs nested layouts, protected route guards, and clean path routing.
*   **SASS (SCSS):** Structured style modules separating components, layout rules, and variables.
*   **Framer Motion:** High-performance, micro-interactive transitions for key UI sections.
*   **SEO Optimization:** Fully optimized pages using `react-helmet-async` for JSON-LD schemas, meta tagging, and dynamic titles.

### Backend (Server)
*   **Node.js & Express:** Modern RESTful API utilizing MVC structure.
*   **Mongoose (MongoDB):** Dynamic document schemas for user profiles, blacklist tokens, and multi-layered interview reports.
*   **Google Gemini SDK (`@google/genai`):** Integrates structured schemas with Zod to enforce reliable JSON outputs from the LLM.
*   **Puppeteer:** Headless browser PDF engine running on the backend to render tailored A4 print outputs.
*   **Robust Security:**
    *   **JWT Auth in Secure HTTP-Only Cookies:** Keeps tokens shielded from XSS.
    *   **Token Blacklisting:** Handles secure user logouts.
    *   **Bcrypt.js Hashing:** Secure credential storage.
    *   **Express Rate Limiter:** Protects API endpoints from abuse.
    *   **Email Verification & Recovery:** Fully automated mail service templates.



## 💡 Developer Value
*   **Clean Code & Architecture:** Decoupled frontend features allow easy scaling. The backend follows classic MVC separation, ensuring clean controllers, middlewares, and services.
*   **Production-Ready AI Integrations:** Employs structural Gemini schemas, avoiding prompt injection issues and output variability by utilizing hard-typed JSON responses.
*   **Performance & Security Mindset:** Integrates HTTP-only cookie JWT controls, CORS verification, rate-limiting, secure file parsing buffers, and lightweight frontend assets.

---
*Created with 💙 by a developer passionate about building high-quality, modern web applications.*
