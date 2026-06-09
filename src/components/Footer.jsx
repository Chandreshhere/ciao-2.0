import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { brand } from '../data/content'
import ContactForm from './ContactForm'
import './Footer.css'

const waHref = `https://wa.me/${brand.whatsapp}`
const YEAR = 2026

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Menu', href: '#/menu' },
      { label: 'About', href: '#/about' },
      { label: 'The Chef', href: '#/about' },
      { label: 'Order', href: '#order' },
    ],
  },
  {
    title: 'Menu',
    links: [
      { label: 'Cakes', href: '#/menu' },
      { label: 'Patisserie', href: '#/menu' },
      { label: 'Puddings & Shots', href: '#/menu' },
      { label: 'Gifting', href: '#/menu' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookie Settings', href: '#' },
    ],
  },
]

const CREDENTIALS = [
  'Le Cordon Bleu Trained',
  'No Preservatives',
  'Made Fresh to Order',
  'Belgian Chocolate',
  'Sector 58, Gurgaon',
]

function Icon({ name }) {
  if (name === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
      </svg>
    )
  }
  // whatsapp
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm0 1.8a8.2 8.2 0 016.96 12.5l-.2.32.66 2.4-2.46-.64-.3.18A8.2 8.2 0 1112 3.8zm-3.2 3.6c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01z" />
    </svg>
  )
}

export default function Footer() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <footer className="footer" id="contact">
      {/* — Invitation — */}
      <div className="shell footer__hero">
        <h2 className="footer__hero-title">
          Come taste with us,
          <em className="footer__hero-script">at Ciao Patisserie.</em>
        </h2>
      </div>

      {/* — Aligned column row: brand · links · contact — */}
      <div className="shell footer__grid">
        <div className="footer__brand">
          <a className="footer__logo" href="#top" aria-label="Ciao Patisserie">
            <img src="/ciao-logo-trim.png" alt="Ciao Patisserie" className="footer__logo-img" />
          </a>
          <p className="footer__tagline">
            Modern French pâtisserie, made fresh to order.
          </p>
          <div className="footer__social">
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Icon name="instagram" />
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <Icon name="whatsapp" />
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div className="footer__col" key={col.title}>
            <h3 className="footer__col-title">{col.title}</h3>
            {col.links.map((l) => (
              <a className="footer__link" href={l.href} key={l.label}>
                {l.label}
              </a>
            ))}
          </div>
        ))}

        <div className="footer__col">
          <h3 className="footer__col-title">Get in touch</h3>
          <span className="footer__link footer__link--static">{brand.location}</span>
          <a
            className="footer__link"
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{brand.instagram}
          </a>
          <a className="footer__link" href={waHref} target="_blank" rel="noopener noreferrer">
            Order on WhatsApp
          </a>
          <button type="button" className="footer__cta-btn" onClick={() => setOpen(true)}>
            Send an Enquiry
          </button>
        </div>
      </div>

      {/* — Credentials strip — */}
      <div className="shell footer__creds">
        {CREDENTIALS.map((c) => (
          <span className="footer__cred" key={c}>
            {c}
          </span>
        ))}
      </div>

      {/* — Bottom bar — */}
      <div className="shell footer__bottom">
        <p className="footer__copy">© {YEAR} Ciao Patisserie — All Rights Reserved.</p>
        <p className="footer__copy">{brand.notice}</p>
      </div>

      {/* — Enquiry modal — */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="cmodal"
            role="dialog"
            aria-modal="true"
            aria-label="Send an enquiry"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="cmodal__panel"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                className="cmodal__close"
                onClick={() => setOpen(false)}
                aria-label="Close enquiry form"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <ContactForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
