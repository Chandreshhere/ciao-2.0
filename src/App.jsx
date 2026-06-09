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
import Chef from './components/Chef'
import Order from './components/Order'
import Footer from './components/Footer'

const isMenuRoute = () =>
  typeof window !== 'undefined' && window.location.hash === '#menu-full'

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
  const [menuPage, setMenuPage] = useState(isMenuRoute())

  useEffect(() => {
    const onHash = () => setMenuPage(isMenuRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Dedicated full-menu page (#menu-full).
  if (menuPage) return <MenuPage />

  return (
    <>
      {!skipLoader && <Loader onDone={() => setReady(true)} />}
      <Cursor />
      <Progress />
      <Nav ready={ready} />
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
      <Footer />
    </>
  )
}
