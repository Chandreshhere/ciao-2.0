// Shared motion variants — one elegant expo-out vocabulary reused everywhere.

const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
}

// Container that staggers its children.
export const stagger = (delay = 0, step = 0.08) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: step, delayChildren: delay },
  },
})

// Image "unveil" — gentle fade + scale settle. (Opacity/scale interpolate
// reliably across browsers; a clip-path inset keyframe gets normalised to a
// different arg-count and can stick at the hidden state, so we avoid it.)
export const unveil = {
  hidden: { opacity: 0, scale: 1.06 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.05, ease: EASE },
  },
}

// Default viewport config for whileInView triggers.
export const inView = { once: true, amount: 0.18 }
