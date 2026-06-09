import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { vitrine } from '../data/content'
import { useIsMobile } from '../lib/useMediaQuery'
import SectionIntro from './ui/SectionIntro'
import './Vitrine.css'

function Feature({ item }) {
  return (
    <div className="vfeature">
      <div className="vfeature__inner shell">
        <h3 className="vfeature__title">{item.name}</h3>

        <div className="vfeature__media">
          <img
            src={item.img}
            alt={`${item.name} — ${item.cat}`}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="vfeature__aside">
          <span className="vfeature__cat">{item.cat}</span>
          <p className="vfeature__desc">{item.desc}</p>
        </div>
      </div>
    </div>
  )
}

function VitrinePanel({ item, i, count, progress, flat }) {
  // Cascading reveal: panel i holds until the scroll reaches its turn, then
  // rises — and keeps rising at the same rate as the panels after it, so once
  // revealed, the stacked panels move up together. The last panel stays put.
  const isLast = i === count - 1
  const isLead = i === 0
  // Each panel rises only ~60% of a viewport per step (not the full height),
  // so it stops/sticks rather than flying off; later panels keep cascading.
  const RISE = 50
  const y = useTransform(
    progress,
    isLast ? [0, 1] : [i / (count - 1), 1],
    isLast ? ['0%', '0%'] : ['0%', `-${(count - 1 - i) * RISE}%`],
  )

  return (
    <motion.div
      className="vpanel"
      style={flat ? undefined : { y, zIndex: count - i }}
    >
      <div className="vpanel__inner">
        <div
          className={`vitrine__head shell${isLead ? '' : ' is-ghost'}`}
          id={isLead ? 'vitrine-title' : undefined}
          aria-hidden={isLead ? undefined : true}
        >
          <SectionIntro
            eyebrow={vitrine.eyebrow}
            title={vitrine.title}
            sub={vitrine.sub}
          />
        </div>
        <Feature item={item} />
      </div>
    </motion.div>
  )
}

export default function Vitrine() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  // The pinned cascade stacks several panels at once, which on a narrow phone
  // reads as overlapping content — so on mobile render a plain stacked list.
  const flat = reduced || mobile
  const seqRef = useRef(null)
  const { scrollYProgress: progress } = useScroll({
    target: seqRef,
    offset: ['start start', 'end end'],
  })
  const N = vitrine.cases.length

  return (
    <section
      className={`section vitrine${flat ? ' is-static' : ''}`}
      id="vitrine"
      aria-labelledby="vitrine-title"
      ref={seqRef}
      style={flat ? undefined : { height: `${N * 75}vh` }}
    >
      <div className="glow vitrine__glow" aria-hidden="true" />

      <div className="vitrine__pin">
        {vitrine.cases.map((item, i) => (
          <VitrinePanel
            key={item.name}
            item={item}
            i={i}
            count={N}
            progress={progress}
            flat={flat}
          />
        ))}
      </div>
    </section>
  )
}
