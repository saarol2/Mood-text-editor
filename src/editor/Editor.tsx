import React, { useEffect, useRef, useState } from 'react'
import useMoodDetector from './useMoodDetector'

export default function Editor(){
  const ref = useRef<HTMLTextAreaElement | null>(null)
  const [value, setValue] = useState('')
  const mood = useMoodDetector()

  useEffect(()=>{
    const ta = ref.current
    if(!ta) return
    const onInput = (e: Event)=> setValue((e.target as HTMLTextAreaElement).value)
    ta.addEventListener('input', onInput)
    return ()=> ta.removeEventListener('input', onInput)
  }, [])

  return (
    <div className={`editor mood-${mood}`}>
      <div className="controls">Moodi: <strong>{mood}</strong></div>
      <textarea ref={ref} placeholder="Kirjoita..." />
    </div>
  )
}
