import React, { useEffect, useRef, useState } from 'react'

export default function Editor({ mood }: { mood: string }) {
  const ref = useRef<HTMLTextAreaElement | null>(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    const ta = ref.current
    if (!ta) return
    const onInput = (e: Event) => setValue((e.target as HTMLTextAreaElement).value)
    ta.addEventListener('input', onInput)
    return () => ta.removeEventListener('input', onInput)
  }, [])

  return (
    <div className={`editor mood-${mood}`}>
      <div className="controls">Mood: <strong>{mood}</strong></div>
      <textarea ref={ref} placeholder="Kirjoita..." />
    </div>
  )
}
