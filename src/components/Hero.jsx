import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { hero } from '../data/content'
import { useIsMobile } from '../lib/useMediaQuery'
import './Hero.css'

const EASE = [0.22, 1, 0.36, 1]
const AUTOPLAY_MS = 5200

function Icon({ name }) {
  const p = {
    prev: 'M15 5l-7 7 7 7',
    next: 'M9 5l7 7-7 7',
  }
  if (name === 'pause') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="8" y="6" width="2.6" height="12" rx="1" fill="currentColor" />
        <rect x="13.4" y="6" width="2.6" height="12" rx="1" fill="currentColor" />
      </svg>
    )
  }
  if (name === 'play') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path d={p[name]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Hero({ ready }) {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  // On mobile the scroll-pin slides the title up behind the fixed nav and crops
  // the image — so render a plain static hero (text + image) there instead.
  const flat = reduced || mobile
  const slides = hero.slides
  const [index, setIndex] = useState(0)
  const [base, setBase] = useState(0) // image settled underneath the wipe
  const [dir, setDir] = useState(1) // +1 → new wipes in from the right
  const [playing, setPlaying] = useState(!reduced)

  // — Scroll-driven pin: top band slides up while the image grows from the
  //   bottom to fill the viewport, then the section unpins into the next one. —
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const bandY = useTransform(scrollYProgress, [0, 0.6], ['0vh', '-65vh'])
  // Phones start with a taller image (and a shorter text band) so the hero
  // fills the screen instead of leaving an empty band under the nav.
  const stageHeight = useTransform(scrollYProgress, [0, 0.8], [mobile ? '60vh' : '46vh', '100vh'])
  // Parallax: the carousel images zoom in and drift up as the hero scrolls.
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0vh', '-7vh'])

  const go = useCallback(
    (d) => {
      setDir(d)
      setIndex((i) => (i + d + slides.length) % slides.length)
    },
    [slides.length],
  )

  const goTo = useCallback(
    (i) => {
      setDir(i > index ? 1 : -1)
      setIndex(i)
    },
    [index],
  )

  useEffect(() => {
    if (!playing || reduced) return
    const id = setInterval(() => {
      setDir(1)
      setIndex((i) => (i + 1) % slides.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [playing, reduced, slides.length])

  // Curtain wipe: the incoming image is revealed in place from one edge
  // (0 → 100%) on top of the settled base image, so the old one never
  // disappears to the brown stage background.
  const slideVariants = {
    enter: (d) => ({ clipPath: d >= 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }),
    center: { clipPath: 'inset(0 0 0 0%)' },
  }

  const lineVariants = {
    hidden: { y: '108%' },
    show: (i) => ({
      y: '0%',
      transition: { duration: 0.7, ease: EASE, delay: 0.05 + i * 0.08 },
    }),
  }

  return (
    <section
      className="hero"
      id="top"
      aria-labelledby="hero-title"
      ref={sectionRef}
      style={flat ? undefined : { height: '200vh' }}
    >
      <div className="hero__sticky">
      {/* — Top band: gradient stays fixed; only the text inside moves up — */}
      <div className="hero__band">
        <div className="glow hero__glow" aria-hidden="true" />
        <motion.div
          className="hero__band-inner shell"
          style={flat ? undefined : { y: bandY }}
        >
          <div className="hero__headline">
            <h1 className="display hero__title" id="hero-title">
              {hero.titleRich.map((line, i) => (
                <span className="hero__line" key={i}>
                  <motion.span
                    className="hero__line-inner"
                    custom={i}
                    initial="hidden"
                    animate={ready ? 'show' : 'hidden'}
                    variants={lineVariants}
                  >
                    {line.map((seg, j) =>
                      seg.gold ? (
                        <em key={j}>{seg.t}</em>
                      ) : (
                        <span key={j}>{seg.t}</span>
                      ),
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          <motion.div
            className="hero__aside"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            <p className="hero__sub">{hero.sub}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* — Lower band: full-bleed carousel that grows to fill the viewport — */}
      <motion.div
        className="hero__stage"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0 }}
        style={flat ? undefined : { height: stageHeight }}
      >
        <motion.div
          className="hero__slides"
          style={flat ? undefined : { scale: imgScale, y: imgY }}
        >
          {/* Base layer: the settled image, always covering the stage. */}
          <div className="hero__slide">
            <img
              src={slides[base].src}
              alt={slides[base].label}
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Top layer: the incoming image wiping in over the base. */}
          {index !== base && (
            <motion.div
              key={index}
              className="hero__slide hero__slide--top"
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              transition={{ duration: 0.9, ease: EASE }}
              onAnimationComplete={() => setBase(index)}
            >
              <img
                src={slides[index].src}
                alt={slides[index].label}
                loading="eager"
                decoding="async"
              />
            </motion.div>
          )}
        </motion.div>

        {/* — Control widget — */}
        <div className="hero__controls" role="group" aria-label="Hero carousel controls">
          <button className="hero__ctrl" onClick={() => go(-1)} aria-label="Previous slide">
            <Icon name="prev" />
          </button>
          <button
            className="hero__ctrl"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
          >
            <Icon name={playing ? 'pause' : 'play'} />
          </button>
          <button className="hero__ctrl" onClick={() => go(1)} aria-label="Next slide">
            <Icon name="next" />
          </button>

          <div className="hero__thumbs">
            {slides.map((s, i) => (
              <button
                key={s.src}
                className={`hero__thumb${i === index ? ' is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to ${s.label}`}
                aria-current={i === index}
              >
                <img src={s.src} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  )
}
