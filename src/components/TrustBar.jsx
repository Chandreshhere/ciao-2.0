import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { stats } from '../data/content'
import './TrustBar.css'

const EASE = [0.22, 1, 0.36, 1]

/** Parses a stat string into a countable number + prefix/suffix, or null. */
function parseStat(str) {
  const m = str.match(/^(\d+)(.*)$/)
  if (!m) return null
  return { target: parseInt(m[1], 10), suffix: m[2] }
}

function StatNumber({ value, active }) {
  const reduced = useReducedMotion()
  const parsed = parseStat(value)
  const [display, setDisplay] = useState(
    parsed && !reduced ? `0${parsed.suffix}` : value,
  )

  useEffect(() => {
    if (!parsed || reduced || !active) {
      setDisplay(value)
      return
    }
    const duration = 1300
    let raf
    let start
    const step = (t) => {
      if (start === undefined) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const n = Math.round(parsed.target * eased)
      setDisplay(`${n}${parsed.suffix}`)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, value, reduced]) // eslint-disable-line react-hooks/exhaustive-deps

  return <span className="trust__num">{display}</span>
}

export default function TrustBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section className="trust" aria-label="By the numbers" ref={ref}>
      <div className="shell trust__row">
        {stats.map((s, i) => (
          <motion.div
            className="trust__cell"
            key={s.label}
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.09 }}
          >
            <StatNumber value={s.num} active={inView} />
            <span className="trust__label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
