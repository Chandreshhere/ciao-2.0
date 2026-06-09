import { motion } from 'motion/react'
import { chef } from '../data/content'
import { unveil } from '../lib/motionPresets'
import { useReveal } from '../lib/useReveal'
import Eyebrow from './ui/Eyebrow'
import GoldHeading from './ui/GoldHeading'

export default function ChefBio() {
  const reveal = useReveal()
  return (
    <motion.div className="order__col chef" id="chef" {...reveal}>
      <Eyebrow>{chef.eyebrow}</Eyebrow>
      <GoldHeading parts={chef.name} as="h2" className="h2" />
      <span className="chef__role">{chef.role}</span>

      <motion.figure
        className="chef__portrait"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={unveil}
      >
        <img src={chef.portrait} alt="Chef Srishti Ghai" loading="lazy" />
      </motion.figure>

      {chef.bio.map((p, i) => (
        <p className="body chef__bio" key={i}>
          {p}
        </p>
      ))}

      <ul className="chef__milestones">
        {chef.milestones.map((m) => (
          <li key={m}>
            <span className="chef__diamond" aria-hidden="true" />
            {m}
          </li>
        ))}
      </ul>

      <blockquote className="chef__quote">
        <p>“{chef.quote}”</p>
        <cite>— Srishti Ghai</cite>
      </blockquote>

      <p className="chef__loc">
        <span aria-hidden="true">📍</span> Sector 58, Gurgaon ·{' '}
        <a
          href="https://instagram.com/ciao_patisserie"
          target="_blank"
          rel="noopener noreferrer"
        >
          @ciao_patisserie
        </a>
      </p>
    </motion.div>
  )
}
