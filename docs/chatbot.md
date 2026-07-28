# Chatbot Design

## Overview

The Atlantic Coast Tours chatbot is an AI-powered customer support assistant that uses GPT-4o-mini with live tour and weather data to provide real-time, accurate responses.

## How It Works

### 1. Data Pipeline
```
User Message → Fetch Fresh Data → Build System Prompt → Call GPT-4o-mini → Return Response
```

Every time a user sends a message:
1. Fresh tour data fetched from Google Sheets
2. Fresh weather data fetched from Open-Meteo
3. System prompt constructed with all live data
4. GPT-4o-mini called with full context
5. Response displayed to user

### 2. System Prompt Structure

The system prompt contains:
- **Role definition:** Friendly customer support for Atlantic Coast Tours
- **Instructions:** How to respond, formatting rules, booking info
- **Tour catalogue:** All 30 tours with full details
- **Weather data:** Current conditions + 5-day forecast
- **Company info:** Contact details, locations, policies

### 3. Conversation Management

- Full conversation history maintained
- Last 20 messages sent as context
- System prompt refreshed with latest data each turn
- Typing indicator shown during API call

## Capabilities

### Tour Information
- "What tours do you have?" → Lists all 30 tours by category
- "How much is the cliff walk?" → Returns specific price and details
- "Any availability this week?" → Shows slots for all tours
- "What's the best food tour?" → Recommends based on ratings

### Weather Integration
- "What's the weather like?" → Live Galway conditions
- "Is it good for kayaking?" → Weather-based activity recommendation
- "Will it rain tomorrow?" → 5-day forecast

### Smart Recommendations
- "I have €50 budget" → Filters tours by price
- "Something for families" → Suggests high-capacity tours
- "What's on special offer?" → Lists current deals
- "Short activities" → Filters by duration

### Booking Assistance
- "How do I book?" → Directs to email/phone
- "Can I get a group discount?" → Explains offers
- "Where do we meet?" → Provides meeting points

## AI Model Configuration

```javascript
{
  model: 'gpt-4o-mini',      // Fast, cost-effective
  temperature: 0.7,           // Balanced creativity
  max_tokens: 600,            // Concise responses
}
```

## Error Handling

- API failures → Graceful fallback message
- Network issues → User notified to retry
- Invalid responses → Bot apologizes and offers alternatives

## Data Freshness

| Data Type | Source | Refresh Rate |
|-----------|--------|-------------|
| Tours | Google Sheets | Every 2 min + before each chat |
| Weather | Open-Meteo | Every 10 min |
| Conversation | Browser memory | Per session |

## Example Conversations

### User: "What's the weather like in Galway right now?"
**Bot:** ☀️ **Current Weather in Galway:**
- Temperature: **17.8°C**
- Conditions: **Overcast**
- Wind: **22.3 km/h**
- Humidity: **84%**

Lovely weather! ☀️ Great conditions for kayaking or cycling today.

**5-Day Outlook:**
- 2026-07-28: 🌦️ Light drizzle (17-18.6°C)
- 2026-07-29: 🌧️ Moderate rain (14.7-17.9°C)
...

### User: "I want something adventurous under €60"
**Bot:** Great choices under €60! Here are the most adventurous:

- **Sea Cave Kayaking at Kilkee** — €68 (3h) — Explore hidden caves
- **Kinvara Kayak & Castle Tour** — €62 (3h) — Paddle to Dunguaire Castle
- **Wild Atlantic Way Sunset Cycle** — €42 (3h) — Sky Road at golden hour
- **Keem Bay Cliff & Beach Combo** — €46 (4h) — Hike cliffs, relax on sand

Want details on any of these?
