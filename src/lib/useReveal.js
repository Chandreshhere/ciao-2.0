import { useReducedMotion } from 'motion/react'
import { fadeUp, stagger, inView } from './motionPresets'

/**
 * Returns props to spread onto a motion element for the shared scroll-reveal.
 * Honours prefers-reduced-motion by collapsing to an instant show.
 */
export function useReveal({ delay = 0, stagger: useStagger = false } = {}) {
  const reduced = useReducedMotion()

  if (reduced) {
    return {
      initial: false,
      animate: 'show',
      variants: useStagger ? stagger(0, 0) : fadeUp,
    }
  }

  return {
    initial: 'hidden',
    whileInView: 'show',
    viewport: inView,
    variants: useStagger ? stagger(delay) : fadeUp,
    ...(delay && !useStagger ? { transition: { delay } } : {}),
  }
}
