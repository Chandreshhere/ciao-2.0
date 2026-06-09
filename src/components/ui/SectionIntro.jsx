import { motion } from 'motion/react'
import Eyebrow from './Eyebrow'
import Divider from './Divider'
import GoldHeading from './GoldHeading'
import { useReveal } from '../../lib/useReveal'

export default function SectionIntro({ eyebrow, title, gold, sub }) {
  const reveal = useReveal()
  return (
    <motion.div className="intro" {...reveal}>
      <Eyebrow center>{eyebrow}</Eyebrow>
      <GoldHeading parts={title} gold={gold} />
      <Divider />
      {sub && <p className="lede">{sub}</p>}
    </motion.div>
  )
}
