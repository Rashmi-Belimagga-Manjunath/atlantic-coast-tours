# Deployment Guide

## Quick Deploy to GitHub Pages

### Prerequisites
- GitHub account
- Git installed
- OpenAI API key

### Steps

1. **Clone the repo**
   ```bash
   git clone https://github.com/Rashmi-Belimagga-Manjunath/atlantic-coast-tours.git
   cd atlantic-coast-tours
   ```

2. **Configure API keys**
   ```bash
   cp config.example.js config.js
   ```
   Edit `config.js` and add your OpenAI API key.

3. **Enable GitHub Pages**
   - Go to repo Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Save

4. **Wait for deployment**
   - GitHub builds the site automatically
   - Usually takes 1-2 minutes
   - Site will be live at: `https://rashmi-belimagga-manjunath.github.io/atlantic-coast-tours/`

### First Visit
- Chatbot will fetch live data on first message
- Weather updates every 10 minutes
- Tour data refreshes every 2 minutes

## Local Development

### Option 1: Python Server
```bash
cd atlantic-coast-tours
python3 -m http.server 8000
# Open http://localhost:8000
```

### Option 2: Node.js
```bash
npx serve .
# Open http://localhost:3000
```

### Option 3: PHP
```bash
php -S localhost:8000
# Open http://localhost:8000
```

### Option 4: VS Code Live Server
- Install "Live Server" extension
- Right-click index.html → Open with Live Server

## Configuration

### config.js
```javascript
var CONFIG = {
  // Your OpenAI API key
  OPENAI_KEY: 'sk-your-key-here',
  
  // Google Sheets CSV export URL
  SHEET_CSV_URL: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0',
  
  // Open-Meteo Weather API (free, no key needed)
  WEATHER_URL: 'https://api.open-meteo.com/v1/forecast?latitude=53.27&longitude=-9.06&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe/Dublin&forecast_days=5'
};
```

### Updating Tour Data
1. Edit the Google Sheet
2. Changes automatically reflect on the website (within 2 minutes)
3. No code changes needed

### Changing Location
1. Get coordinates from Google Maps
2. Update latitude/longitude in WEATHER_URL
3. Update meeting points in Google Sheet

## Troubleshooting

### Chatbot not working
- Check OpenAI API key in config.js
- Check browser console for errors
- Verify API key has credits

### Tours not loading
- Check Google Sheet is public
- Verify CSV export URL is correct
- Check browser console for CORS errors

### Weather not showing
- Check Open-Meteo API is accessible
- Verify coordinates are correct
- Check network connectivity

### GitHub Pages not deploying
- Check repo is public
- Verify Pages is enabled in Settings
- Check Actions tab for build errors

## Security Notes

- `config.js` is gitignored (API keys not in repo)
- For production, use environment variables or a backend
- OpenAI API key is visible in browser (acceptable for demo)
- Google Sheets CSV is public (no sensitive data)

## Performance

- Single HTML file loads fast
- Images from Unsplash CDN
- CSS animations GPU-accelerated
- Canvas runs at 60fps
- Data cached in memory
