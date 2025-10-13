
import React, { useEffect, useRef, useState } from 'react'
// ...existing code...

interface EditorProps {
  mood: string
  value: string
  setValue: (v: string) => void
}

export default function Editor({ mood, value, setValue }: EditorProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null)

  // Keep textarea in sync with value
  useEffect(() => {
    if (ref.current && ref.current.value !== value) {
      ref.current.value = value
    }
  }, [value])

  return (
    <div className={`editor mood-${mood}`}>
      <textarea
        ref={ref}
        placeholder="Kirjoita..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}
