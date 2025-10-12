
import { useEffect, useRef, useState } from 'react'

export type Mood = 'calm' | 'focused' | 'frustrated' | 'uncertain' | 'stressed'

function now() { return performance.now() }

export default function useMoodDetector(): Mood {
  const [mood, setMood] = useState<Mood>('calm')
  const ks = useRef(0)
  const bs = useRef(0)
  const last = useRef(now())
  const iv = useRef<number | null>(null)
  const burstGaps = useRef<number[]>([])
  const lastKey = useRef(now())

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      ks.current++
      if (e.key === 'Backspace') bs.current++
      // Track gaps between bursts of typing
      const t = now()
      burstGaps.current.push(t - lastKey.current)
      if (burstGaps.current.length > 10) burstGaps.current.shift()
      lastKey.current = t
      last.current = t
    }

    window.addEventListener('keydown', onKey)
    iv.current = window.setInterval(() => {
      const t = now()
      const elapsed = 800
      const keystrokes = ks.current
      const backspaces = bs.current
      ks.current = 0
      bs.current = 0

      const wpm = (keystrokes / 5) * (60 / (elapsed / 1000))
      const backRatio = backspaces / Math.max(1, keystrokes)
      const idle = t - last.current
      const avgGap = burstGaps.current.length > 0 ? burstGaps.current.reduce((a, b) => a + b, 0) / burstGaps.current.length : 0

      let next: Mood = 'calm'


      // Uncertain: moderately long pause or very choppy typing rhythm
      if (idle > 3500 || avgGap > 1200) {
        next = 'uncertain'
      }
      // Stressed: very high typing speed, some errors
      else if (wpm > 120 && backRatio > 0.08 && backRatio < 0.25) {
        next = 'stressed'
      }
      // Focused: fast, few errors
      else if (wpm > 60 && backRatio < 0.08) {
        next = 'focused'
      }
      // Frustrated: lots of backspaces, but not after just a couple of mistakes
      else if ((backRatio > 0.28 && keystrokes > 15) || backspaces > 7) {
        next = 'frustrated'
      }
      // Calm: slow pace, few errors
      else if (wpm > 0 && wpm <= 60 && backRatio < 0.12) {
        next = 'calm'
      }

      // If completely idle, always calm
      if (idle > 4000) next = 'calm'

      setMood(next)
    }, 800)

    return () => {
      window.removeEventListener('keydown', onKey)
      if (iv.current) clearInterval(iv.current)
    }
  }, [])

  return mood
}
