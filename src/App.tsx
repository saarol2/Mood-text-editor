import React from 'react'
import Editor from './editor/Editor'

export default function App(){
  return (
    <div className="app">
      <header>
        <h1>Mood Text Editor</h1>
      </header>
      <main>
        <Editor />
      </main>
    </div>
  )
}
