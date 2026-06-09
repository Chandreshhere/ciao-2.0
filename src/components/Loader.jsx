import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import './Loader.css'

const EASE_CURTAIN = [0.77, 0, 0.18, 1]

export default function Loader({ onDone }) {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (reduced) {
      // Skip the long sequence under reduced motion.
      const t = setTimeout(() => finish(), 350)
      return () => clearTimeout(t)
    }
    const tOpen = setTimeout(() => setOpen(true), 1700)
    const tDone = setTimeout(() => finish(), 3500)
    return () => {
      clearTimeout(tOpen)
      clearTimeout(tDone)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  function finish() {
    setGone(true)
    onDone?.()
  }

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="loader"
          aria-hidden="true"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Left & right curtain panels */}
          <motion.div
            className="loader__panel loader__panel--l"
            initial={{ x: 0 }}
            animate={open ? { x: '-101%' } : { x: 0 }}
            transition={{ duration: 1.2, ease: EASE_CURTAIN }}
          />
          <motion.div
            className="loader__panel loader__panel--r"
            initial={{ x: 0 }}
            animate={open ? { x: '101%' } : { x: 0 }}
            transition={{ duration: 1.2, ease: EASE_CURTAIN }}
          />

          {/* Centre lockup */}
          <motion.div
            className="loader__mark"
            initial={reduced ? false : { opacity: 0, scale: 0.92 }}
            animate={
              open
                ? { opacity: 0, scale: 1.04, transition: { duration: 0.5 } }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
