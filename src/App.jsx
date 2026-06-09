import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { useLenis } from './lib/useLenis'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Statement from './components/Statement'
import Ticker from './components/Ticker'
import TrustBar from './components/TrustBar'
import Vitrine from './components/Vitrine'
import Menu from './components/Menu'
import MenuPage from './components/MenuPage'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'
import Chef from './components/Chef'
import Order from './components/Order'
import Footer from './components/Footer'

// Tiny hash router: #/menu · #/about · #/contact · else home.
const getRoute = () => {
  if (typeof window === 'undefined') return 'home'
  const h = window.location.hash
  if (h === '#/menu' || h === '#menu-full') return 'menu'
  if (h === '#/about') return 'about'
  if (h === '#/contact') return 'contact'
  return 'home'
}

function Progress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
}

// QA / share escape hatch: ?noloader skips the intro sequence.
const skipLoader =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).has('noloader')

export default function App() {
  useLenis()
  const [ready, setReady] = useState(skipLoader)
  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Jump to the top whenever the route (page) changes — but not on in-page
  // anchor clicks, which keep the same route.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

  const isHome = route === 'home'

  return (
    <>
      {!skipLoader && isHome && <Loader onDone={() => setReady(true)} />}
      <Cursor />
      <Progress />
      <Nav ready={isHome ? ready : true} />

      {isHome && (
        <main>
          <Hero ready={ready} />
          <Statement />
          <Ticker />
          <TrustBar />
          <Vitrine />
          <Menu />
          <Chef />
          <Order />
        </main>
      )}
      {route === 'menu' && <MenuPage />}
      {route === 'about' && <AboutPage />}
      {route === 'contact' && <ContactPage />}

      <Footer />
    </>
  )
}
