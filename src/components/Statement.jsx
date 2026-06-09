import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import { statement } from '../data/content'
import './Statement.css'

const EASE = [0.22, 1, 0.36, 1]

export default function Statement() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  // The revealed image sticks until you leave the section or hover another word.
  // active = { img, side } of the hovered accent.
  const [active, setActive] = useState(null)

  // Cursor position (normalised -0.5..0.5) → small parallax of the photo only.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 90, damping: 20, mass: 0.7 })
  const sy = useSpring(my, { stiffness: 90, damping: 20, mass: 0.7 })
  const imgX = useTransform(sx, [-0.5, 0.5], [44, -44])
  const imgY = useTransform(sy, [-0.5, 0.5], [44, -44])

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section
      className={`statement${active ? ' is-revealing' : ''}`}
      ref={ref}
      onMouseMove={reduced ? undefined : onMove}
      onMouseLeave={() => setActive(null)}
      aria-labelledby="statement-text"
    >
      {/* Anchored reveal off to one side; only the photo inside parallaxes.
          Sits behind the text so the words you hover stay fully visible. */}
      {!reduced && (
        <div className="statement__media" aria-hidden="true">
          <AnimatePresence>
            {active && (
              <motion.div
                key={active.img}
                className="statement__reveal"
                initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <motion.img
                  src={active.img}
                  alt=""
                  style={{ x: imgX, y: imgY, scale: 1.34 }}
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="statement__inner shell">
        <p className="statement__eyebrow">{statement.eyebrow}</p>

        <p className="statement__text" id="statement-text">
          {statement.parts.map((p, i) =>
            p.img ? (
              <em
                key={i}
                className={`statement__accent${active?.i === i ? ' is-active' : ''}`}
                onMouseEnter={() => setActive({ img: p.img, i })}
                onMouseLeave={() => setActive(null)}
              >
                {p.t}
              </em>
            ) : (
              <span key={i}>{p.t}</span>
            ),
          )}
        </p>
      </div>
    </section>
  )
}
