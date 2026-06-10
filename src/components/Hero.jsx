import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import './Hero.css'

// Each line is a list of segments; em:true renders in the gold script.
const LINES = [
  [{ t: 'This is not' }],
  [{ t: 'just ' }, { t: 'dessert.', em: true }],
  [{ t: 'This is our' }],
  [{ t: 'philosophy.', em: true }],
  [{ t: 'Made to order.' }],
]

function Line({ segs }) {
  return (
    <span>
      {segs.map((s, j) => (s.em ? <em key={j}>{s.t}</em> : <span key={j}>{s.t}</span>))}
    </span>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Phase 0 — intro labels, visible at rest, fade away as scrolling begins.
  const introOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.1], ['0px', '-26px'])
  // Phase 1 — centre statement rises from behind the cake, unblurring upward.
  const textY = useTransform(scrollYProgress, [0.1, 0.44], ['10vh', '-116vh'])
  // Parallax zoom on both layers.
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.26])
  const fgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.3])
  // Phase 2 — side text fades/slides in as the centre text rises up.
  const lOpacity = useTransform(scrollYProgress, [0.26, 0.4], [0, 1])
  const lX = useTransform(scrollYProgress, [0.26, 0.4], ['-26px', '0px'])
  const rOpacity = useTransform(scrollYProgress, [0.3, 0.44], [0, 1])
  const rX = useTransform(scrollYProgress, [0.3, 0.44], ['26px', '0px'])

  const lineStyle = reduced ? undefined : { x: '-50%', y: textY }

  return (
    <section className="bhero" id="top" ref={ref} aria-label="Ciao Patisserie">
      <div className="bhero__sticky">
        <motion.img
          className="bhero__bg"
          src="/hero/1.png"
          alt=""
          style={reduced ? undefined : { scale: bgScale }}
        />

        {/* Phase 0 — intro labels framing the cake */}
        <motion.div
          className="bhero__intro"
          style={reduced ? undefined : { opacity: introOpacity, y: introY }}
        >
          <div className="bhero__intro-center">
            <span className="bhero__intro-eyebrow">French Pâtisserie · Gurgaon</span>
            <span className="bhero__intro-title">
              Crafted in <em>Paris.</em>
            </span>
          </div>
          <span className="bhero__intro-label bhero__intro--tl">Ciao Patisserie</span>
          <span className="bhero__intro-label bhero__intro--tr">Est. 2017</span>
          <span className="bhero__intro-label bhero__intro--bl">Handcrafted fresh</span>
          <span className="bhero__intro-label bhero__intro--br">Made to order</span>
        </motion.div>

        {/* Phase 1 — centre statement: clean sharp text that reveals from the
            focal line upward as it rises (no blur copy, so no shadow). */}
        <div className="bhero__text" aria-hidden="true">
          <div className="bhero__sharp">
            <motion.div className="bhero__lines bhero__lines--sharp" style={lineStyle}>
              {LINES.map((segs, i) => (
                <Line key={i} segs={segs} />
              ))}
            </motion.div>
          </div>
        </div>

        <motion.img
          className="bhero__fg"
          src="/hero/2.png"
          alt="Ciao Patisserie signature cake"
          style={reduced ? undefined : { scale: fgScale }}
        />

        {/* Phase 2 — side text */}
        <motion.div
          className="bhero__side bhero__side--left"
          style={reduced ? undefined : { opacity: lOpacity, x: lX }}
        >
          <span className="bhero__side-eyebrow">Our Craft</span>
          <p className="bhero__side-text">
            Handcrafted fresh to order — no two ever quite alike.
          </p>
        </motion.div>
        <motion.div
          className="bhero__side bhero__side--right"
          style={reduced ? undefined : { opacity: rOpacity, x: rX }}
        >
          <span className="bhero__side-eyebrow">Our Promise</span>
          <p className="bhero__side-text">
            Le Cordon Bleu trained. Belgian chocolate, always.
          </p>
        </motion.div>

        <h1 className="sr-only">
          Ciao Patisserie — crafted in Paris, this is not just dessert.
        </h1>
        <a className="bhero__scroll" href="#start">
          SCROLL
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M7 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}
