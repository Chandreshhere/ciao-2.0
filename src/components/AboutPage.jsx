import { useRef } from 'react'
import { motion, useScroll } from 'motion/react'
import { chef } from '../data/content'
import TrustBar from './TrustBar'
import './AboutPage.css'

const EASE = [0.22, 1, 0.36, 1]
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: EASE, delay },
})

const MILESTONES = [
  {
    title: 'Le Cordon Bleu, London',
    para: "Classical French pastry training at the world's most storied culinary school.",
    img: '/gallery/product-10.png',
  },
  {
    title: "L'Opéra, New Delhi",
    para: 'Refining technique and precision in a leading professional patisserie kitchen.',
    img: '/gallery/product-11.png',
  },
  {
    title: 'Ciao Patisserie, 2017',
    para: 'The dream realised — a contemporary French patisserie, made entirely to order.',
    img: '/gallery/product-02.png',
  },
  {
    title: 'Sector 58, Gurgaon',
    para: 'Home today — macarons, entremets, and bespoke celebration cakes, crafted fresh.',
    map: true,
  },
]

const MAP_SRC =
  'https://www.google.com/maps?q=Sector%2058%2C%20Gurgaon&output=embed'

export default function AboutPage() {
  const trackRef = useRef(null)
  // Drawn directly from scroll position so the line tracks the user 1:1.
  const { scrollYProgress: pathLength } = useScroll({
    target: trackRef,
    offset: ['start 0.8', 'end 0.6'],
  })

  return (
    <main className="page about">
      <div className="shell page__head">
        <span className="eyebrow eyebrow--center">About</span>
        <h1 className="display h1">
          The Story of <em>Ciao</em>
        </h1>
        <p className="lede">
          Modern French pâtisserie — precision, creativity, and the finest
          ingredients, crafted fresh in Gurgaon.
        </p>
      </div>

      {/* — Portrait + story — */}
      <section className="shell about__feature">
        <motion.figure className="about__portrait" {...rise()}>
          <img src={chef.portrait} alt="Chef Srishti Ghai" loading="lazy" decoding="async" />
          <figcaption className="about__portrait-cap">
            <span className="about__portrait-name">Srishti Ghai</span>
            <span className="about__portrait-role">{chef.role}</span>
          </figcaption>
        </motion.figure>

        <motion.div className="about__story" {...rise(0.1)}>
          <span className="eyebrow">{chef.eyebrow}</span>
          <h2 className="display h2 about__name">
            {chef.name[0]} <em>{chef.name[1]}</em>
          </h2>
          {chef.bio.map((p, i) => (
            <p className="about__bio" key={i}>
              {p}
            </p>
          ))}
        </motion.div>
      </section>

      {/* — Journey: zigzag timeline with a scroll-drawn connector — */}
      <section className="about__journey-band">
        <div className="shell about__journey">
          <motion.h2 className="display h2 about__journey-title" {...rise()}>
            The <em>Journey</em>
          </motion.h2>

          <div className="journey" ref={trackRef}>
          <svg
            className="journey__line"
            viewBox="0 0 80 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* faint full track — threads through the four node points */}
            <path
              className="journey__line-track"
              d="M40 125 C22 230 22 300 40 375 C58 460 58 545 40 625 C22 710 22 800 40 875"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            {/* gold line that draws on scroll, connecting each dot */}
            <motion.path
              className="journey__line-draw"
              d="M40 125 C22 230 22 300 40 375 C58 460 58 545 40 625 C22 710 22 800 40 875"
              fill="none"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength }}
            />
          </svg>

          {MILESTONES.map((m, i) => (
            <div
              className={`journey__row journey__row--${i % 2 === 0 ? 'right' : 'left'}`}
              key={m.title}
            >
              <motion.div
                className="journey__block"
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <div className={`journey__media${m.map ? ' journey__media--map' : ''}`}>
                  {m.map ? (
                    <iframe
                      className="journey__map"
                      title="Ciao Patisserie — Sector 58, Gurgaon"
                      src={MAP_SRC}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <img src={m.img} alt="" loading="lazy" decoding="async" />
                  )}
                </div>
                <div className="journey__content">
                  <h3 className="journey__title">{m.title}</h3>
                  <p className="journey__para">{m.para}</p>
                </div>
              </motion.div>
              <span className="journey__node" aria-hidden="true" />
            </div>
          ))}
          </div>
        </div>
      </section>

      <TrustBar />
    </main>
  )
}
