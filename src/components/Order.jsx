import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { brand, order } from '../data/content'
import GoldHeading from './ui/GoldHeading'
import './Order.css'

// Each image: its scattered (non-corner) resting spot and its own size.
const IMAGES = [
  { src: '/gallery/product-02.png', w: 'clamp(154px, 17.5vw, 268px)', x: '-33vw', y: '-21vh' },
  { src: '/gallery/product-11.png', w: 'clamp(116px, 12.5vw, 196px)', x: '31vw', y: '-27vh' },
  { src: '/gallery/product-07.png', w: 'clamp(134px, 15vw, 228px)', x: '-37vw', y: '20vh' },
  { src: '/gallery/product-10.png', w: 'clamp(146px, 16.5vw, 250px)', x: '35vw', y: '15vh' },
]

const FACTS = [
  { dt: 'Lead time', dd: '24–48 hours' },
  { dt: 'Custom cakes', dd: '48–72 hours notice' },
  { dt: 'Every order', dd: 'Made fresh, to order' },
  { dt: 'Pickup', dd: 'Sector 58, Gurgaon' },
]

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.25.69-1.45 1.32-1.99 1.36-.53.05-1.02.24-3.44-.72-2.9-1.14-4.74-4.13-4.88-4.32-.14-.19-1.17-1.56-1.17-2.97s.74-2.11 1-2.4c.26-.29.57-.36.76-.36l.55.01c.18.01.41-.07.64.49.25.6.84 2.06.91 2.21.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.64-.14.26.09 1.66.78 1.94.93.29.14.48.21.55.33.07.12.07.67-.18 1.36Z" />
    </svg>
  )
}

export default function Order() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start center'],
  })

  const waHref = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    order.whatsappText,
  )}`

  // 0 = images stacked on top of each other at the centre · 1 = scattered.
  const x1 = useTransform(scrollYProgress, [0, 1], ['0vw', IMAGES[0].x])
  const y1 = useTransform(scrollYProgress, [0, 1], ['0vh', IMAGES[0].y])
  const x2 = useTransform(scrollYProgress, [0, 1], ['0vw', IMAGES[1].x])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0vh', IMAGES[1].y])
  const x3 = useTransform(scrollYProgress, [0, 1], ['0vw', IMAGES[2].x])
  const y3 = useTransform(scrollYProgress, [0, 1], ['0vh', IMAGES[2].y])
  const x4 = useTransform(scrollYProgress, [0, 1], ['0vw', IMAGES[3].x])
  const y4 = useTransform(scrollYProgress, [0, 1], ['0vh', IMAGES[3].y])
  const spread = [
    { x: x1, y: y1 },
    { x: x2, y: y2 },
    { x: x3, y: y3 },
    { x: x4, y: y4 },
  ]

  return (
    <section
      className="section order"
      id="order"
      aria-label="Ready to order"
      ref={ref}
    >
      {/* Images stacked at the centre, scattering out as the section scrolls in */}
      <div className="order__images" aria-hidden="true">
        {IMAGES.map((img, i) => (
          <div className="order__img-cell" key={img.src}>
            <motion.div
              className="order__img"
              style={
                reduced
                  ? { x: img.x, y: img.y, width: img.w }
                  : { ...spread[i], width: img.w }
              }
            >
              <img src={img.src} alt="" loading="lazy" decoding="async" />
            </motion.div>
          </div>
        ))}
      </div>

      {/* Centre CTA */}
      <div className="shell order__center">
        <GoldHeading parts={order.title} as="h2" className="h1 order__cta-title" />
        <p className="order__cta-sub">{order.sub}</p>

        <a
          className="order__wa"
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          <span>Order on WhatsApp</span>
        </a>

        <dl className="order__facts">
          {FACTS.map((f) => (
            <div className="order__fact" key={f.dt}>
              <dt>{f.dt}</dt>
              <dd>{f.dd}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
