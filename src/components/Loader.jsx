import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import './Loader.css'

const EASE_CURTAIN = [0.77, 0, 0.18, 1]
const EASE_OUT = [0.22, 1, 0.36, 1]

export default function Loader({ onDone }) {
  const reduced = useReducedMotion()
  const [lift, setLift] = useState(false) // logo + kicker travel up and fade
  const [open, setOpen] = useState(false) // curtain panels split to the sides
  const [gone, setGone] = useState(false)
  const fired = useRef(false)
  // Phone: curtain opens top/bottom; desktop: left/right. Decided once at
  // mount — the loader only ever plays the intro on first paint.
  const vertical =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 760px)').matches
  const axis = vertical ? 'y' : 'x'

  // Fire onDone exactly once — the moment the curtains begin to part — so the
  // hero is already revealed underneath them (no blank gap between the curtain
  // clearing and the content appearing).
  function reveal() {
    if (fired.current) return
    fired.current = true
    onDone?.()
  }

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => {
        reveal()
        setGone(true)
      }, 280)
      return () => clearTimeout(t)
    }
    // 1) logo lifts up · 2) curtains open + hero reveals · 3) loader unmounts
    const tLift = setTimeout(() => setLift(true), 820)
    const tOpen = setTimeout(() => {
      setOpen(true)
      reveal()
    }, 1420)
    const tGone = setTimeout(() => setGone(true), 2600)
    return () => {
      clearTimeout(tLift)
      clearTimeout(tOpen)
      clearTimeout(tGone)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="loader"
          aria-hidden="true"
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
        >
          {/* Curtain panels — split open from the middle. Desktop: left/right.
              Phones: top/bottom. */}
          <motion.div
            className="loader__panel loader__panel--l"
            initial={{ [axis]: 0 }}
            animate={open ? { [axis]: '-101%' } : { [axis]: 0 }}
            transition={{ duration: 1.1, ease: EASE_CURTAIN }}
          />
          <motion.div
            className="loader__panel loader__panel--r"
            initial={{ [axis]: 0 }}
            animate={open ? { [axis]: '101%' } : { [axis]: 0 }}
            transition={{ duration: 1.1, ease: EASE_CURTAIN }}
          />

          {/* Centre lockup — fades in, then lifts up and out before the curtains part */}
          <motion.div
            className="loader__mark"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={
              lift
                ? { opacity: 0, y: -64, transition: { duration: 0.6, ease: EASE_OUT } }
                : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.75, ease: EASE_OUT }}
          >
            <span className="loader__kicker">Le Cordon Bleu · Gurgaon</span>
            <img src="/ciao-logo-trim.png" alt="Ciao Patisserie" className="loader__logo" />
            <span className="loader__rule" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
