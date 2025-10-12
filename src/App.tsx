import React, { useEffect } from 'react'
import Editor from './editor/Editor'
import useMoodDetector from './editor/useMoodDetector'

export default function App() {
  const mood = useMoodDetector()

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
    } else {
      document.body.classList.remove('mood-calm-bg')
      document.body.classList.remove('mood-focused-bg')
      document.body.classList.remove('mood-frustrated-bg')
    }
    return () => {
      document.body.classList.remove('mood-calm-bg')
      document.body.classList.remove('mood-focused-bg')
      document.body.classList.remove('mood-frustrated-bg')
    }
  }, [mood])

  return (
    <div className="app">
      <header>
        <h1>Mood Text Editor</h1>
      </header>
      <main>
        <Editor mood={mood} />
      </main>
    </div>
  )
}
