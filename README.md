# Lumina Build - Cinematic Website Builder

Lumina Build is a venture-funded unicorn-tier SaaS product designed to let you build cinematic, highly responsive websites at the speed of thought. 

![Lumina Editor Preview](https://i.imgur.com/example-preview.png)

## Architecture
- **Frontend**: React, Vite, TypeScript, TailwindCSS, Zustand, Framer Motion
- **Backend**: Java 21, Spring Boot 3.2, MongoDB
- **UI Language**: Inter font, Dark Glassmorphism, 8px spacing, vivid gradients.

## Running Locally

Requires **Docker** and **Docker Compose**.

1. Navigate to the project root:
   ```bash
   cd website-builder
   ```
2. Build and start the infrastructure:
   ```bash
   docker-compose up --build
   ```
3. Access the platforms:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8080/api`

## Core Features
- **Cinematic Editor**: Docked dark sidebars with a massive contrasting canvas, animated drag states, and a floating toolbar.
- **Premium Design System**: Glassmorphic elements, rich hover states, and buttery smooth framer-motion transitions.
- **Split-Screen Auth**: A breathtaking login experience with animated blur gradients.
- **Low Compute Engine**: Pages are persisted as structured JSON in MongoDB and only rendered to HTML upon publishing, minimizing server costs.

---
*Developed with heart on the `antigravity/enhancement` branch.*
