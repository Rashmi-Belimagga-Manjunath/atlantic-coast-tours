# Technical Architecture

## Overview

Atlantic Coast Tours is a single-page application built with vanilla HTML/CSS/JS. It integrates three external data sources to provide a real-time, AI-powered customer experience.

## System Diagram

```
                    ┌──────────────────────┐
                    │   User's Browser      │
                    │   (index.html)        │
                    └──────────┬───────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                     │
          ▼                    ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Google Sheets  │  │   Open-Meteo    │  │    OpenAI API   │
│  (Tour Data)    │  │   (Weather)     │  │   (GPT-4o-mini) │
│                 │  │                 │  │                 │
│  CSV Export     │  │  REST API       │  │  Chat Completions│
│  Real-time      │  │  Free, no auth  │  │  System prompt   │
│  30 tours       │  │  Galway coords  │  │  + live data     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

## Data Flow

### Tour Data (Google Sheets)
1. Browser fetches CSV from Google Sheets export URL
2. CSV parsed into JavaScript array
3. Data used for:
   - Tour card rendering on the page
   - System prompt for AI chatbot
4. Auto-refreshes every 2 minutes
5. Also fetches fresh before each chatbot message

### Weather Data (Open-Meteo)
1. Browser fetches from Open-Meteo REST API
2. Response parsed for current conditions + 5-day forecast
3. Data used for:
   - Weather bar display
   - AI chatbot recommendations
4. Auto-refreshes every 10 minutes

### AI Chatbot (OpenAI)
1. User sends message
2. Fresh tour + weather data fetched
3. System prompt built with:
   - All 30 tours (name, price, location, availability, description)
   - Live weather conditions
   - Company information
   - Conversation history
4. GPT-4o-mini called with messages array
5. Response displayed in chat

## Key Components

### Interactive Hero Canvas
- **Particles:** 80 floating particles with mouse attraction
- **Orbs:** 8 gradient light orbs with pulse animation
- **Connections:** Lines between nearby particles
- **Mouse interaction:** Particles attracted to cursor, connection lines drawn

### Tour Catalogue
- **Source:** Google Sheets (CSV export)
- **Categories:** Cliff Walk, Kayak Trip, Food Tour, Outdoor Activity, Cycling, Boat Tour
- **Fields:** tour_id, tour_name, category, location, meeting_point, price_eur, duration_hours, capacity, availability, slots_this_week, special_offer, description
- **Rendering:** Card grid with filtering by category

### Chatbot Brain
- **Model:** GPT-4o-mini
- **System prompt:** Dynamically built with live data
- **Context:** Full conversation history (last 20 messages)
- **Temperature:** 0.7 (balanced creativity/accuracy)
- **Max tokens:** 600 per response

## Performance Considerations

- Single HTML file (no build step)
- Images loaded via Unsplash CDN
- CSS animations use `transform` and `opacity` for GPU acceleration
- Canvas uses `requestAnimationFrame` for smooth 60fps
- Tour data cached in memory, refreshed periodically
- Chat responses streamed via fetch API

## Security Notes

- API keys stored in `config.js` (gitignored)
- Google Sheets CSV export is public (no auth needed)
- Open-Meteo API is free and requires no authentication
- OpenAI API key exposed in browser (acceptable for demo/portfolio)
- For production, use a backend proxy to hide API keys
