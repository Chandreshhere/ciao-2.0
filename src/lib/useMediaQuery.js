import { useEffect, useState } from 'react'

/**
 * Reactive matchMedia hook. Returns true when the query currently matches.
 * Used to drop the scroll-pinned / scroll-driven hero & gallery treatments on
 * phones (where the long pins read as empty space and crop images on scroll)
 * in favour of a plain stacked layout — desktop is unaffected.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Phones / small tablets — matches the 860px breakpoint used across the CSS. */
export function useIsMobile() {
  return useMediaQuery('(max-width: 860px)')
}
