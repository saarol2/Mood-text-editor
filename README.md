# Mood Text Editor

A React-based text editor that detects your typing mood and adapts the visual theme accordingly. The editor analyzes your typing patterns in real-time and changes the background with correct animations and effects to match your current state of mind.

## Features

- **Automatic Mood Detection**: Detects 5 different moods based on typing patterns:
  - **Calm**: Slow, steady typing with few errors
  - **Focused**: Fast typing with high accuracy
  - **Frustrated**: High backspace usage
  - **Stressed**: Very fast typing with moderate errors
  - **Reflective**: Long pauses between typing bursts

- **Dynamic Backgrounds and effects**: Background color changes automatically based on detected mood

- **Manual Mood Override**: Switch between automatic detection and manual mood selection

- **File Operations**: 
  - Download your text as a `.txt` file
  - Upload existing text files to continue editing

## How It Works

The mood detector analyzes several typing metrics:
- **Words Per Minute (WPM)**: Typing speed
- **Backspace Ratio**: Number of corrections relative to keystrokes
- **Idle Time**: Time between typing bursts
- **Average Gap**: Average time between keystrokes

Based on these metrics, the app dynamically classifies your current mood and updates the UI accordingly.

## Tech Stack

- **React 18.2.0**
- **TypeScript 5.5.2**
- **Vite 4.3.9**
- **CSS3**

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Mood-text-editor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## Project Structure

```
Mood-text-editor/
├── src/
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   ├── styles.css             # Global styles and mood themes
│   └── editor/
│       ├── Editor.tsx         # Text editor component
│       ├── HeaderActions.tsx  # Mood selector and file operations
│       ├── DownloadButton.tsx # Download text as file
│       ├── UploadButton.tsx   # Upload text from file
│       └── useMoodDetector.ts # Mood detection logic
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Usage

1. Start typing in the editor
2. Watch as the background color changes based on your typing mood
3. Use the mood selector to manually override the detected mood
4. Download your text using the "Download" button
5. Upload existing text files using the "Upload" button

## Mood Detection Algorithm

The app evaluates your typing every 800ms:

- **Reflective**: Idle > 3.5s or average gap > 1.2s
- **Frustrated**: Backspace ratio > 30% (with significant typing) or > 7 backspaces
- **Stressed**: WPM > 90 with 8-30% error rate, or WPM > 100 with 5%+ errors
- **Focused**: WPM > 60 with < 8% error rate
- **Calm**: WPM 0-60 with < 12% error rate