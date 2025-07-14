# JungAI – Dream Analysis with Gemini

## Try It Out

You can either **download and run the application locally** (see instructions below), or **test it live** via the hosted version:

[Live Demo](https://jungian-dream-analyzer-ai-907923477304.us-west1.run.app)

---

## Project Overview

**JungAI** is a specialized AI-powered application designed to provide in-depth dream analysis based on the principles of Carl Gustav Jung’s depth psychology. The app leverages Google’s Gemini via a secure API wrapper, offering users nuanced, multi-layered interpretations of their dreams while enforcing strict safety and content moderation protocols.

This project demonstrates advanced skills in AI integration, prompt engineering, and secure application design, with a particular focus on red teaming and abuse prevention.

---

## Purpose

- **Empower users** to explore the symbolic meaning of their dreams through the lens of Jungian psychology.
- **Showcase best practices** in building secure, production-ready AI applications that responsibly handle user input and sensitive data.
- **Demonstrate expertise** in prompt engineering, LLM safety, and modern frontend development.

---

## Technology Stack

- **Frontend:** React (TypeScript), Vite
- **AI Integration:** Google Gemini API (via custom service wrapper)
- **Styling/UI:** Tailwind CSS
- **Build Tooling:** Vite
- **Type Safety:** TypeScript
- **Environment Management:** Vite’s environment variable system

---

## Key Libraries & Frameworks

- `react` – UI framework for building interactive interfaces
- `vite` – Fast build tool and development server
- `typescript` – Static type checking for robust code
- `tailwindcss` – Utility-first CSS for rapid UI development

---

## Security & Red Teaming Approach

This project is engineered with a strong security mindset, especially regarding LLM prompt injection, content abuse, and API key management:

- **System Prompt Hardening:**  
  The system prompt (see `constants.ts`) is meticulously crafted to:
  - Filter out attempts to elicit harmful, illegal, or manipulative content, even if disguised as dream narratives.
  - Block requests containing hate speech, explicit content, or nonsensical input.
  - Enforce strict refusal behavior for off-topic or abusive queries, using clear trigger phrases and refusal responses.
  - Ensure the AI never generates or speculates about prohibited content, regardless of user prompt structure.

- **API Key Management:**  
  - API keys are loaded via environment variables and are never hardcoded in the repository.
  - The `.env.local` file is used for local development and should never contain secrets in public repositories.
  - The `.gitignore` should be configured to prevent accidental exposure of sensitive files.

- **Frontend/Backend Boundary:**  
  - The application is designed as a frontend wrapper; all sensitive operations (API key usage) are handled securely, and the codebase is structured to minimize risk of key exposure.

---

## How It Works

1. **User submits a dream description** via the web interface.
2. **Input is pre-processed and filtered** according to strict safety rules defined in the system prompt.
3. **Gemini LLM is queried** through a secure API wrapper, passing only sanitized, context-appropriate requests.
4. **AI response is structured** into introduction, symbol analysis, dream dynamics, and actionable insights, following Jungian methodology.
5. **Results are displayed** in a clear, empathetic, and psychologically informed manner.

---

## Running Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set your Gemini API key in `.env.local`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Professional Skills Demonstrated

- **AI Integration & Prompt Engineering:**  
  Advanced system prompt design for robust LLM alignment and safety.
- **Red Teaming Mindset:**  
  Proactive abuse prevention, prompt injection defense, and content moderation.
- **Modern Frontend Architecture:**  
  Clean, modular React codebase with TypeScript for maintainability and scalability.
- **Secure DevOps Practices:**  
  Proper environment variable management and repository hygiene.

---

## Disclaimer

This application is for educational and self-reflection purposes only. It does not provide medical or psychological diagnoses.

---

<p align="center">
  🔗 Built by <strong>Łukasz Pawłowski</strong> · <a href="https://mozgowiec.substack.com">Substack</a> · <a href="https://www.linkedin.com/in/pawlowski-lukasz">LinkedIn</a>
</p>
