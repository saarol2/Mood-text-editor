import { useEffect, useRef, useState } from 'react'

export type Mood = 'calm' | 'focused' | 'frustrated' | 'playful'

function now(){return performance.now()}

export default function useMoodDetector(): Mood{
  const [mood, setMood] = useState<Mood>('calm')
  const ks = useRef(0)
  const bs = useRef(0)
  const last = useRef(now())
  const iv = useRef<number | null>(null)

  useEffect(()=>{
    function onKey(e: KeyboardEvent){
      ks.current++
      if(e.key === 'Backspace') bs.current++
      last.current = now()
    }

    window.addEventListener('keydown', onKey)
    iv.current = window.setInterval(()=>{
      const t = now()
      const elapsed = 800
      const keystrokes = ks.current
      const backspaces = bs.current
      ks.current = 0
      bs.current = 0

      const wpm = (keystrokes / 5) * (60 / (elapsed/1000))
      const backRatio = backspaces / Math.max(1, keystrokes)
      const idle = t - last.current

      let next: Mood = 'calm'
      if(idle > 4000) next = 'calm'
      else if(wpm > 80 && backRatio < 0.05) next = 'focused'
      else if(backRatio > 0.25 || (wpm < 10 && keystrokes>0)) next = 'frustrated'
      else if(wpm > 30 && backRatio > 0.15) next = 'playful'

      setMood(next)
    }, 800)

    return ()=>{
      window.removeEventListener('keydown', onKey)
      if(iv.current) clearInterval(iv.current)
    }
  }, [])

  return mood
}
