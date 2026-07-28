# API Integration Guide

## Overview

Atlantic Coast Tours integrates three external APIs to provide real-time data.

## 1. Google Sheets API (Tour Data)

### Endpoint
```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={GID}
```

### Configuration
```javascript
var SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1balBGf8QhZ5dc-RCCAPt2kcrcf6m_YRh0HL_r8bBtJw/export?format=csv&gid=120683740';
```

### How It Works
1. Google Sheets allows CSV export via URL
2. No authentication required (public sheet)
3. Always returns latest data
4. CSV parsed client-side

### Data Schema
```csv
tour_id,tour_name,category,location,meeting_point,price_eur,duration_hours,capacity,availability,slots_this_week,special_offer,description
ACT001,Cliffs of Moher Guided Cliff Walk,Cliff Walk,"Doolin, Co. Clare",Doolin Pier car park,45,4,16,All week,6,,Walk the dramatic cliff-top trail...
```

### Refresh Strategy
- Initial load on page open
- Auto-refresh every 2 minutes
- Fresh fetch before each chatbot message

## 2. Open-Meteo API (Weather Data)

### Endpoint
```
https://api.open-meteo.com/v1/forecast?latitude=53.27&longitude=-9.06&current=...&daily=...
```

### Configuration
```javascript
var WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=53.27&longitude=-9.06&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe/Dublin&forecast_days=5';
```

### Parameters
| Parameter | Value | Description |
|-----------|-------|-------------|
| latitude | 53.27 | Galway, Ireland |
| longitude | -9.06 | Galway, Ireland |
| current | temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m | Current conditions |
| daily | weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max | 5-day forecast |
| timezone | Europe/Dublin | Irish time |
| forecast_days | 5 | 5-day outlook |

### Response Example
```json
{
  "current": {
    "temperature_2m": 17.8,
    "weather_code": 3,
    "wind_speed_10m": 22.3,
    "relative_humidity_2m": 84
  },
  "daily": {
    "time": ["2026-07-28", "2026-07-29", ...],
    "weather_code": [51, 61, 3, 3, 3],
    "temperature_2m_max": [18.6, 17.9, 18.5, 16.5, 17.8],
    "temperature_2m_min": [17.0, 14.7, 11.9, 8.7, 11.4],
    "precipitation_probability_max": [51, 76, 37, 51, 21]
  }
}
```

### WMO Weather Codes
| Code | Description |
|------|-------------|
| 0 | Clear sky |
| 1 | Mainly clear |
| 2 | Partly cloudy |
| 3 | Overcast |
| 45 | Foggy |
| 51-55 | Drizzle |
| 61-65 | Rain |
| 71-75 | Snow |
| 80-82 | Showers |
| 95 | Thunderstorm |

## 3. OpenAI API (AI Brain)

### Endpoint
```
https://api.openai.com/v1/chat/completions
```

### Configuration
```javascript
var OPENAI_KEY = 'sk-...'; // In config.js (gitignored)
```

### Request
```javascript
{
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: 'You are...' },  // Dynamic system prompt
    { role: 'user', content: 'What tours...' },  // User message
    { role: 'assistant', content: '...' },       // Previous response
    // ... conversation history
  ],
  max_tokens: 600,
  temperature: 0.7
}
```

### System Prompt Components
1. **Role definition** — Who the bot is
2. **Instructions** — How to respond
3. **Tour catalogue** — All 30 tours (dynamic)
4. **Weather data** — Current conditions (dynamic)
5. **Company info** — Contact details

### Rate Limits
- GPT-4o-mini: 500 RPM, 200K TPD
- Free tier: Sufficient for demo usage

## Error Handling

### Network Errors
```javascript
fetch(url).catch(function(err) {
  // Show user-friendly error message
  addBotMessage('Having trouble connecting. Please try again!');
});
```

### API Errors
```javascript
if (!response.ok) {
  throw new Error('API error: ' + response.status);
}
```

### Graceful Degradation
- Weather API fails → Show "Weather unavailable"
- Sheets API fails → Use cached data
- OpenAI API fails → Show "Brain offline, try again"
