# Stock Stream Visualizer

A real-time stock market data visualization dashboard built with **React**, **TypeScript**, and **WebSockets**.

The project includes a lightweight Node.js WebSocket server that continuously generates mock stock market messages and a React frontend that parses the incoming stream and visualizes the data using interactive charts.

## Features

- Real-time data streaming through WebSocket
- Mock stock market data generation
- Visualization of multiple stock symbols
- Stock symbol selector
- Closing price line chart
- Price change percentage chart
- Trading volume bar chart
- Base volume percentage chart
- Live WebSocket connection status indicator
- Light and dark themes
- Persistent theme preference using `localStorage`
- Persian interface and number formatting
- Responsive dashboard layout
- Automatic limitation of chart history to the latest 30 data points
- Toast notifications when the WebSocket connection is lost

## Architecture

The project consists of two separate applications:

```text
stock-stream-visualizer/
├── backend/
└── frontend/
```

### Backend

The backend is a simple Node.js WebSocket server.

It generates simulated Iranian stock market data and broadcasts a new message to connected clients every 10 seconds.

The server runs on:

```text
ws://localhost:8080
```

### Frontend

The frontend connects to the WebSocket server, parses the incoming stock messages, stores recent data for each symbol, and renders the resulting time series using Recharts.

## Technologies

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- i18next
- react-i18next
- React Toastify

### Backend

- Node.js
- WebSocket (`ws`)

## Visualized Metrics

For each available stock symbol, the dashboard displays:

- **Closing Price**
- **Price Change Percentage**
- **Trading Volume**
- **Base Volume Percentage**

The frontend keeps the latest **30 data points** for each symbol.

## Project Structure

```text
stock-stream-visualizer/
│
├── backend/
│   ├── src/
│   │   ├── constants/
│   │   │   └── constants.js
│   │   ├── utils/
│   │   │   └── dataGenerator.js
│   │   └── index.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── charts/
    │   │   ├── ChartCard.tsx
    │   │   ├── ChartGrid.tsx
    │   │   ├── SymbolSelector.tsx
    │   │   └── ThemeToggle.tsx
    │   ├── hooks/
    │   │   └── useWebSocket.ts
    │   ├── utils/
    │   │   └── parseMessage.ts
    │   ├── App.tsx
    │   ├── constants.ts
    │   ├── fa.json
    │   ├── i18n.ts
    │   └── types.ts
    ├── package.json
    └── vite.config.js
```

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd stock-stream-visualizer
```

## Running the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the WebSocket server:

```bash
npm start
```

The server will start at:

```text
ws://localhost:8080
```

The server sends an initial message immediately after a client connects and then sends updated mock data every **10 seconds**.

## Running the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL displayed by Vite in your browser.

> The WebSocket backend should be running on port `8080` before starting the frontend.

## WebSocket Data Flow

The backend generates text-based stock market messages containing data such as:

- Stock symbol
- Closing price
- Last price
- Price change percentage
- Trading volume
- Base volume percentage

The frontend receives these messages through WebSocket and processes them using:

```text
frontend/src/utils/parseMessage.ts
```

Parsed data is then grouped by symbol and stored as a short history for real-time chart rendering.

## Available Stock Symbols

The mock backend currently generates data for several Iranian stock symbols.

Some symbols can also be marked as closed by the mock data generator and are ignored by the frontend parser.

## Theme Support

The dashboard provides both light and dark themes.

The selected theme is stored in:

```text
localStorage
```

so the user's preference can be preserved in the browser.

## Localization

The interface currently uses Persian localization through `i18next`.

Translation strings are stored in:

```text
frontend/src/fa.json
```

Chart labels and WebSocket error messages are displayed in Persian.

## Build

To create a production build of the frontend:

```bash
cd frontend
npm run build
```

The generated production files will be placed in the Vite `dist` directory.
