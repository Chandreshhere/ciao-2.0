import { useEffect, useRef, useState } from 'react'
import './Cursor.css'

/** Desktop-only gold dot that grows into a ring over interactive elements. */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)

    let rx = window.innerWidth / 2
    let ry = window.innerHeight / 2
    let dx = rx
    let dy = ry
    let raf
    let revealed = false

    const onMove = (e) => {
      dx = e.clientX
      dy = e.clientY
      if (!revealed) {
        revealed = true
        rx = dx
        ry = dy
        dot.current?.classList.add('is-visible')
        ring.current?.classList.add('is-visible')
      }
      if (dot.current) {
        dot.current.style.transform = `translate(${dx}px, ${dy}px)`
      }
      const t = e.target.closest('a, button, input, select, textarea, [role="tab"]')
      ring.current?.classList.toggle('is-active', !!t)
    }

    const loop = () => {
      rx += (dx - rx) * 0.18
      ry += (dy - ry) * 0.18
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null
  return (
    <>
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  )
}
