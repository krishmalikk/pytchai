# Auto-Pitch Generator

An AI-powered platform that transforms startup ideas into professional pitch decks. Simply paste your startup idea, and our AI will generate a compelling pitch and create a beautiful visual deck.

## Features

- AI-powered pitch generation
- Customizable pitch deck templates
- Automatic image generation
- Professional layout and design
- Export to PDF and other formats

## Tech Stack

- Frontend: Next.js, React, Tailwind CSS
- Backend: Python FastAPI
- AI: OpenAI API, DALL-E/Stable Diffusion
- Database: MongoDB

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
/
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── lib/          # Utility functions
│   └── styles/       # Global styles
├── public/           # Static assets
└── package.json      # Project dependencies
``` 