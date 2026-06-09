import { useEffect } from 'react'
import Lenis from 'lenis'

const mql = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches
const prefersReduced = () => mql('(prefers-reduced-motion: reduce)')
// Touch devices (phones/tablets): native scrolling is smoother and avoids the
// layout jitter Lenis can introduce while dragging.
const isTouch = () => mql('(pointer: coarse)')

/**
 * Mounts Lenis inertial smooth-scroll on pointer devices and routes in-page
 * anchor clicks through it. On touch devices (and reduced motion) Lenis is
 * skipped in favour of native scrolling, with a lightweight native smooth
 * anchor handler.
 */
export function useLenis() {
  useEffect(() => {
    // Native anchor smooth-scroll, used when Lenis is off.
    const nativeAnchor = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      const y = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top: y, behavior: prefersReduced() ? 'auto' : 'smooth' })
    }

    if (prefersReduced() || isTouch()) {
      document.addEventListener('click', nativeAnchor)
      return () => document.removeEventListener('click', nativeAnchor)
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // Smooth anchor navigation
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -72, duration: 1.3 })
    }
    document.addEventListener('click', onClick)

    window.__lenis = lenis

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', onClick)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
}
