/* ================================================================
   CONFIG EXAMPLE — Atlantic Coast Tours
   ================================================================
   Copy this file to config.js and add your API keys.
   config.js is gitignored and will NOT be committed.
   ================================================================ */

var CONFIG = {
  OPENAI_KEY: 'sk-your-openai-api-key-here',
  
  // Google Sheets CSV URL (live data)
  SHEET_CSV_URL: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0',
  
  // Open-Meteo Weather API (free, no key needed)
  WEATHER_URL: 'https://api.open-meteo.com/v1/forecast?latitude=53.27&longitude=-9.06&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe/Dublin&forecast_days=5'
};
