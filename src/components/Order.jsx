import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { brand, order } from '../data/content'
import GoldHeading from './ui/GoldHeading'
import './Order.css'

const IMAGES = [
  { src: '/gallery/product-02.png', cls: 'order__img--tl' },
  { src: '/gallery/product-11.png', cls: 'order__img--tr' },
  { src: '/gallery/product-07.png', cls: 'order__img--bl' },
  { src: '/gallery/product-10.png', cls: 'order__img--br' },
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
    offset: ['start end', 'center center'],
  })

  const waHref = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    order.whatsappText,
  )}`

  // 0 = images stacked over the centre · 1 = settled into the corners.
  const tlX = useTransform(scrollYProgress, [0, 1], ['44vw', '0vw'])
  const tlY = useTransform(scrollYProgress, [0, 1], ['34vh', '0vh'])
  const trX = useTransform(scrollYProgress, [0, 1], ['-44vw', '0vw'])
  const trY = useTransform(scrollYProgress, [0, 1], ['34vh', '0vh'])
  const blX = useTransform(scrollYProgress, [0, 1], ['44vw', '0vw'])
  const blY = useTransform(scrollYProgress, [0, 1], ['-34vh', '0vh'])
  const brX = useTransform(scrollYProgress, [0, 1], ['-44vw', '0vw'])
  const brY = useTransform(scrollYProgress, [0, 1], ['-34vh', '0vh'])
  const spread = [
    { x: tlX, y: tlY },
    { x: trX, y: trY },
    { x: blX, y: blY },
    { x: brX, y: brY },
  ]

  return (
    <section
      className="section order"
      id="order"
      aria-label="Ready to order"
      ref={ref}
    >
      {/* Corner images that spread from the centre as the section scrolls in */}
      <div className="order__images" aria-hidden="true">
        {IMAGES.map((img, i) => (
          <motion.div
            key={img.src}
            className={`order__img ${img.cls}`}
            style={reduced ? undefined : spread[i]}
          >
            <img src={img.src} alt="" loading="lazy" decoding="async" />
          </motion.div>
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
