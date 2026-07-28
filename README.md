# Atlantic Coast Tours

**Luxury tours and experiences along Ireland's Wild Atlantic Way.**

![Hero](docs/hero-preview.png)

## 🌊 Live Site

**[rashmi-belimagga-manjunath.github.io/atlantic-coast-tours](https://rashmi-belimagga-manjunath.github.io/atlantic-coast-tours/)**

## ✨ Features

- **Interactive Hero** — Particle effects, parallax scrolling, mouse-reactive canvas
- **AI Chatbot** — GPT-4o-mini powered, with live tour data and weather
- **Live Weather** — Real-time Open-Meteo API for Galway & west coast
- **30 Curated Tours** — Synced live from Google Sheets
- **Auto-Refresh** — Tour data refreshes every 2 minutes, weather every 10 minutes
- **Tour Categories** — Cliff Walks, Kayaking, Food Tours, Cycling, Boat Tours, Outdoor
- **Smart Recommendations** — Chatbot suggests tours based on weather, budget, and interests

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│              Atlantic Coast Tours            │
├─────────────┬───────────────┬───────────────┤
│   Website   │   AI Brain    │  Live Data    │
│  (HTML/CSS) │  (GPT-4o-mini)│  (APIs)       │
├─────────────┼───────────────┼───────────────┤
│  Interactive│  System prompt│  Google Sheets│
│  Hero       │  with live    │  (30 tours)   │
│  Canvas     │  tour +       │  Open-Meteo   │
│  Particles  │  weather data │  Weather API  │
└─────────────┴───────────────┴───────────────┘
```

## 🤖 How the Chatbot Works

1. **User asks a question** → e.g., "What kayak tours are available?"
2. **Fresh data fetched** → Google Sheets CSV + Open-Meteo weather API
3. **System prompt built** → Includes all 30 tours + live weather
4. **GPT-4o-mini called** → With full context of tours, weather, conversation
5. **Response returned** → With real prices, availability, and recommendations

The chatbot always has the latest data because we fetch fresh from Google Sheets before every AI call.

## 📊 Data Sources

| Source | Type | Refresh Rate |
|--------|------|-------------|
| Google Sheets | Tours catalogue (prices, slots, descriptions) | Every 2 minutes + before each chat |
| Open-Meteo API | Live weather (temp, wind, rain, forecast) | Every 10 minutes |
| OpenAI API | GPT-4o-mini for natural language responses | On each user message |

## 🚀 Setup

### Quick Start
1. Clone the repo
2. Copy `config.example.js` to `config.js`
3. Add your OpenAI API key to `config.js`
4. Open `index.html` in a browser

### Configuration
Edit `config.js`:
```javascript
var CONFIG = {
  OPENAI_KEY: 'sk-your-key-here',
  SHEET_CSV_URL: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0',
  WEATHER_URL: 'https://api.open-meteo.com/v1/forecast?...'
};
```

### GitHub Pages Deployment
1. Push to GitHub
2. Enable Pages in Settings → Pages → Source: Main branch
3. Site will be live at `https://username.github.io/repo-name/`

## 🗂️ Project Structure

```
atlantic-coast-tours/
├── index.html          # Main website (single file)
├── config.js           # API keys (gitignored)
├── config.example.js   # Config template
├── .gitignore          # Ignores config.js
├── README.md           # This file
└── docs/
    ├── architecture.md # Technical architecture
    ├── chatbot.md      # Chatbot design docs
    ├── apis.md         # API integration guide
    └── deployment.md   # Deployment guide
```

## 🎨 Design

- **Color Palette:** Deep navy (#0a1628) + Gold (#c9a84c) + Cream (#f5f0e8)
- **Typography:** Playfair Display (headings) + Inter (body)
- **Style:** Luxury travel aesthetic, dark theme, gold accents
- **Interactions:** Particle canvas, parallax, smooth scroll, hover effects

## 📝 License

Private project for Atlantic Coast Tours.
