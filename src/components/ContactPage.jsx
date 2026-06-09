import { motion } from 'motion/react'
import { brand } from '../data/content'
import ContactForm from './ContactForm'
import './ContactPage.css'

const EASE = [0.22, 1, 0.36, 1]
const waHref = `https://wa.me/${brand.whatsapp}`
const MAP_SRC =
  'https://www.google.com/maps?q=Sector%2058%2C%20Gurgaon&output=embed'

const DETAILS = [
  { label: 'Visit', value: brand.location },
  { label: 'WhatsApp', value: 'Place an order', href: waHref, external: true },
  { label: 'Instagram', value: `@${brand.instagram}`, href: brand.instagramUrl, external: true },
  { label: 'Lead time', value: '24–48 hrs · custom cakes 48–72' },
]

export default function ContactPage() {
  return (
    <main className="page contact">
      <div className="shell page__head">
        <span className="eyebrow eyebrow--center">Contact</span>
        <h1 className="display h1">
          Get in <em>Touch</em>
        </h1>
        <p className="lede">
          Everything is made fresh to order — tell us about your celebration and
          we&apos;ll craft it for you.
        </p>
      </div>

      <div className="shell contact__grid">
        <motion.div
          className="contact__info"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <ul className="contact__list">
            {DETAILS.map((d) => (
              <li className="contact__item" key={d.label}>
                <span className="contact__label">{d.label}</span>
                {d.href ? (
                  <a
                    className="contact__value contact__value--link"
                    href={d.href}
                    target={d.external ? '_blank' : undefined}
                    rel={d.external ? 'noopener noreferrer' : undefined}
                  >
                    {d.value}
                  </a>
                ) : (
                  <span className="contact__value">{d.value}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="contact__map">
            <iframe
              title="Ciao Patisserie — Sector 58, Gurgaon"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        <motion.div
          className="contact__form"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </main>
  )
}
