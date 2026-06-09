import { motion } from 'motion/react'
import { chef } from '../data/content'
import './Chef.css'

const EASE = [0.22, 1, 0.36, 1]
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.85, ease: EASE, delay },
})

export default function Chef() {
  return (
    <section className="section chs" id="chef" aria-labelledby="chs-title">
      <div className="glow chs__glow" aria-hidden="true" />
      <div className="shell chs__grid">
        <motion.figure className="chs__portrait" {...rise()}>
          <img
            src={chef.portrait}
            alt="Chef Srishti Ghai"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="chs__badge">
            <span className="chs__badge-name">Chef Srishti Ghai</span>
            <span className="chs__badge-role">{chef.role}</span>
          </figcaption>
        </motion.figure>

        <div className="chs__body">
          <motion.p className="chs__eyebrow" {...rise()}>
            {chef.eyebrow}
          </motion.p>
          <motion.h2 className="chs__name display" id="chs-title" {...rise(0.05)}>
            {chef.name[0]} <em>{chef.name[1]}</em>
          </motion.h2>
          <motion.p className="chs__role" {...rise(0.1)}>
            {chef.role}
          </motion.p>

          {chef.bio.map((p, i) => (
            <motion.p className="chs__bio" key={i} {...rise(0.12 + i * 0.05)}>
              {p}
            </motion.p>
          ))}

          <motion.ul className="chs__milestones" {...rise(0.2)}>
            {chef.milestones.map((m) => (
              <li key={m}>
                <span className="chs__diamond" aria-hidden="true" />
                {m}
              </li>
            ))}
          </motion.ul>

          <motion.blockquote className="chs__quote" {...rise(0.25)}>
            <p>“{chef.quote}”</p>
            <cite>— Srishti Ghai</cite>
          </motion.blockquote>

          <motion.p className="chs__loc" {...rise(0.3)}>
            <span aria-hidden="true">📍</span> Sector 58, Gurgaon ·{' '}
            <a
              href="https://instagram.com/ciao_patisserie"
              target="_blank"
              rel="noopener noreferrer"
            >
              @ciao_patisserie
            </a>
          </motion.p>
        </div>
      </div>
    </section>
  )
}
