# SolarFlux - Solar Activity Monitor

> A real-time solar activity monitoring application that tracks and visualizes space weather data, including solar flares, coronal mass ejections (CMEs), and other solar phenomena.

## Features

- *Real-time Data* - Get up-to-date solar activity data from NASA and other space weather sources
- *CME Tracking* - Monitor coronal mass ejections and their potential impact on Earth
- *Solar Flare Detection* - Track solar flares and their classifications
- *Anomaly Detection* - Advanced algorithms to detect unusual solar activity
- *Telegram Integration* - Receive instant alerts about significant solar events
- *Interactive Visualizations* - Beautiful, interactive charts and graphs of solar data
- *Responsive Design* - Works on desktop and mobile devices

## Technologies Used

- *Next.js* - React framework for building the web application
- *NASA APIs* - For real-time solar and space weather data
- *Telegram Bot API* - For instant notifications
- *Chart.js* - For data visualization
- *Tailwind CSS* - For modern, responsive styling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your API keys:
   ```
   NASA_API_KEY=your_nasa_api_key
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   TELEGRAM_CHAT_ID=your_telegram_chat_id
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                  # Next.js app directory
├── components/           # Reusable UI components
├── lib/                  # Utility functions and API clients
│   ├── nasa/            # NASA API integration
│   ├── telegram/         # Telegram bot integration
│   └── utils/            # Helper functions
└── styles/              # Global styles
```

## API Integration

### NASA API
This application uses NASA's Space Weather Database Of Notifications, Knowledge, Information (DONKI) API to fetch solar event data.

### Telegram Bot
Set up a Telegram bot to receive real-time alerts:
1. Create a bot using [@BotFather](https://t.me/botfather)
2. Get your chat ID by sending a message to your bot and visiting:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
3. Add the bot token and chat ID to your `.env.local` file

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
