
import React, { useEffect, useState } from 'react'
import Editor from './editor/Editor'
import useMoodDetector, { Mood } from './editor/useMoodDetector'


export default function App() {
  const autoMood = useMoodDetector()
  const [manualMood, setManualMood] = useState<Mood | 'auto'>('auto')
  const mood = manualMood === 'auto' ? autoMood : manualMood

  useEffect(() => {
    if (mood === 'calm') {
      document.body.classList.add('mood-calm-bg')
      document.body.classList.remove('mood-focused-bg')
    } else if (mood === 'focused') {
      document.body.classList.add('mood-focused-bg')
      document.body.classList.remove('mood-calm-bg')
      document.body.classList.remove('mood-frustrated-bg')
    } else if (mood === 'frustrated') {
      document.body.classList.add('mood-frustrated-bg')
      document.body.classList.remove('mood-calm-bg')
      document.body.classList.remove('mood-focused-bg')
      document.body.classList.remove('mood-uncertain-bg')
    } else if (mood === 'uncertain') {
      document.body.classList.add('mood-uncertain-bg')
      document.body.classList.remove('mood-calm-bg')
      document.body.classList.remove('mood-focused-bg')
      document.body.classList.remove('mood-frustrated-bg')
      document.body.classList.remove('mood-stressed-bg')
    } else if (mood === 'stressed') {
      document.body.classList.add('mood-stressed-bg')
      document.body.classList.remove('mood-calm-bg')
      document.body.classList.remove('mood-focused-bg')
      document.body.classList.remove('mood-frustrated-bg')
      document.body.classList.remove('mood-uncertain-bg')
    } else {
      document.body.classList.remove('mood-calm-bg')
      document.body.classList.remove('mood-focused-bg')
      document.body.classList.remove('mood-frustrated-bg')
      document.body.classList.remove('mood-uncertain-bg')
      document.body.classList.remove('mood-stressed-bg')
    }
    return () => {
      document.body.classList.remove('mood-calm-bg')
      document.body.classList.remove('mood-focused-bg')
      document.body.classList.remove('mood-frustrated-bg')
      document.body.classList.remove('mood-uncertain-bg')
      document.body.classList.remove('mood-stressed-bg')
    }
  }, [mood])

  return (
    <div className="app">
      <header>
        <h1>Mood Text Editor</h1>
        <div style={{ marginTop: 12 }}>
          <label htmlFor="mood-select" style={{ fontWeight: 500, marginRight: 8 }}>Test mood:</label>
          <select
            id="mood-select"
            value={manualMood}
            onChange={e => setManualMood(e.target.value as Mood | 'auto')}
            style={{ fontSize: '1rem', padding: '2px 8px', borderRadius: 4 }}
          >
            <option value="auto">Auto (typing-based)</option>
            <option value="calm">Calm</option>
            <option value="focused">Focused</option>
            <option value="frustrated">Frustrated</option>
            <option value="uncertain">Uncertain</option>
            <option value="stressed">Stressed</option>
          </select>
          <span style={{ marginLeft: 10, fontSize: '0.95em', color: '#aaa' }}>
            {manualMood === 'auto' ? 'Automatic mood detection' : 'Manual override'}
          </span>
        </div>
      </header>
      <main>
        <Editor mood={mood} />
      </main>
    </div>
  )
}
