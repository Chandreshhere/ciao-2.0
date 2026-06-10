import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { chef } from '../data/content'
import './Chef.css'

function Panels() {
  return (
    <>
      <div className="chefx__item chefx__intro">
        <span className="chefx__eyebrow">{chef.eyebrow}</span>
        <h2 className="chefx__name">
          Srishti <em>Ghai</em>
        </h2>
        <span className="chefx__role">{chef.role}</span>
      </div>

      <figure className="chefx__item chefx__portrait">
        <img src={chef.portrait} alt="Chef Srishti Ghai" loading="lazy" decoding="async" />
      </figure>

      <div className="chefx__item chefx__text">
        <p>{chef.bio[0]}</p>
      </div>

      <figure className="chefx__item chefx__photo chefx__photo--tall">
        <img src="/gallery/product-07.png" alt="" loading="lazy" decoding="async" />
      </figure>

      {chef.milestones.slice(0, 2).map((m, i) => (
        <div className="chefx__item chefx__milestone" key={m}>
          <span className="chefx__milestone-num">{String(i + 1).padStart(2, '0')}</span>
          <p>{m}</p>
        </div>
      ))}

      <figure className="chefx__item chefx__photo">
        <img src="/gallery/product-11.png" alt="" loading="lazy" decoding="async" />
      </figure>

      <div className="chefx__item chefx__text">
        <p>{chef.bio[1]}</p>
      </div>

      {chef.milestones.slice(2).map((m, i) => (
        <div className="chefx__item chefx__milestone" key={m}>
          <span className="chefx__milestone-num">{String(i + 3).padStart(2, '0')}</span>
          <p>{m}</p>
        </div>
      ))}

      <figure className="chefx__item chefx__photo chefx__photo--tall">
        <img src="/gallery/product-02.png" alt="" loading="lazy" decoding="async" />
      </figure>

      <blockquote className="chefx__item chefx__quote">
        <p>“{chef.quote}”</p>
        <cite>— Srishti Ghai</cite>
      </blockquote>
    </>
  )
}

export default function Chef() {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [range, setRange] = useState(0)

  useEffect(() => {
    if (reduced) return
    const measure = () => {
      if (trackRef.current) {
        setRange(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
      }
    }
    measure()
    const t = setTimeout(measure, 500)
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', measure)
    }
  }, [reduced])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -range])
  // Blush gradient fades in + drifts left→right; the line draws + glides across.
  const gradX = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const gradOpacity = useTransform(scrollYProgress, [0, 0.45], [0, 1])
  // Line is anchored on the left and draws to the right, running off the screen.
  const waveDraw = useTransform(scrollYProgress, [0, 0.7], [0, 1])

  if (reduced) {
    return (
      <section className="chefx chefx--static" id="chef" aria-label="About the chef">
        <div className="chefx__track chefx__track--static">
          <Panels />
        </div>
      </section>
    )
  }

  return (
    <section
      className="chefx"
      id="chef"
      ref={sectionRef}
      aria-label="About the chef"
      style={{ height: range ? `calc(100vh + ${range}px)` : '100vh' }}
    >
      <div className="chefx__sticky">
        <motion.div
          className="chefx__grad"
          style={{ backgroundPositionX: gradX, opacity: gradOpacity }}
          aria-hidden="true"
        />
        <div className="chefx__wave" aria-hidden="true">
          <svg viewBox="0 0 1600 300" preserveAspectRatio="none">
            <motion.path
              d="M0 170 C 200 60 360 280 560 170 S 920 60 1120 170 S 1480 280 1600 150"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: waveDraw }}
            />
          </svg>
        </div>
        <motion.div className="chefx__track" ref={trackRef} style={{ x }}>
          <Panels />
        </motion.div>
      </div>
    </section>
  )
}
