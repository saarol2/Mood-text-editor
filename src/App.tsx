
import React, { useEffect, useState } from 'react'
import Editor from './editor/Editor'
import HeaderActions from './editor/HeaderActions'
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
  document.body.classList.remove('mood-reflective-bg')
    } else if (mood === 'uncertain') {
        document.body.classList.add('mood-reflective-bg')
      document.body.classList.remove('mood-calm-bg')
      document.body.classList.remove('mood-focused-bg')
      document.body.classList.remove('mood-frustrated-bg')
      document.body.classList.remove('mood-stressed-bg')
    } else if (mood === 'stressed') {
      document.body.classList.add('mood-stressed-bg')
      document.body.classList.remove('mood-calm-bg')
      document.body.classList.remove('mood-focused-bg')
      document.body.classList.remove('mood-frustrated-bg')
  document.body.classList.remove('mood-reflective-bg')
    } else {
      document.body.classList.remove('mood-calm-bg')
      document.body.classList.remove('mood-focused-bg')
      document.body.classList.remove('mood-frustrated-bg')
        document.body.classList.remove('mood-reflective-bg')
      document.body.classList.remove('mood-stressed-bg')
    }
    return () => {
      document.body.classList.remove('mood-calm-bg')
      document.body.classList.remove('mood-focused-bg')
      document.body.classList.remove('mood-frustrated-bg')
        document.body.classList.remove('mood-reflective-bg')
      document.body.classList.remove('mood-stressed-bg')
    }
  }, [mood])

  // Editor value state and handlers
  const [editorValue, setEditorValue] = useState('')

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setEditorValue(ev.target?.result as string || '')
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  // Handle download
  const handleDownload = () => {
    const blob = new Blob([editorValue], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mood-editor.txt'
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 0)
  }

  return (
    <div className="app">
      <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 8, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <h1 style={{ margin: 0, textAlign: 'center' }}>Mood Text Editor</h1>
        </div>
        <HeaderActions
          onUpload={handleFileUpload}
          onDownload={handleDownload}
          manualMood={manualMood}
          setManualMood={m => setManualMood(m as Mood | 'auto')}
        />
      </header>
      <main>
        <Editor mood={mood} value={editorValue} setValue={setEditorValue} />
      </main>
    </div>
  )
}
