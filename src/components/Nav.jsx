import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { nav } from '../data/content'
import './Nav.css'

const RIGHT_LINKS = [{ label: 'Contact', href: '#contact' }]

export default function Nav({ ready }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 80)
      // Hide the header as soon as the user starts scrolling down (first thing);
      // only show it again once they're back at the very top.
      if (y > 8 && y > last) setHidden(true)
      else if (y <= 8) setHidden(false)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <motion.header
      className={`nav${scrolled ? ' nav--scrolled' : ''}`}
      initial={{ y: -90, opacity: 0 }}
      animate={ready ? { y: hidden ? '-130%' : 0, opacity: hidden ? 0 : 1 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="nav__scallop" aria-hidden="true" />
      <div className="nav__inner shell">
        {/* Left — primary navigation */}
        <nav className="nav__group nav__group--left" aria-label="Primary">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Centre — logo */}
        <a className="nav__logo" href="#top" aria-label="Ciao Patisserie — home">
          <img src="/ciao-logo-trim.png" alt="Ciao Patisserie" className="nav__logo-img" />
        </a>

        {/* Right — secondary link + CTA */}
        <div className="nav__group nav__group--right">
          {RIGHT_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
          <a href={nav.cta.href} className="nav__cta">
            {nav.cta.label}
          </a>
        </div>

        <button
          className={`nav__burger${open ? ' is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.nav
              className="nav__overlay-links"
              aria-label="Mobile"
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
              }}
            >
              {[...nav.links, ...RIGHT_LINKS, nav.cta].map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  variants={{
                    hidden: { opacity: 0, y: 22 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
