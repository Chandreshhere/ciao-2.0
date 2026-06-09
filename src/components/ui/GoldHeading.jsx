/**
 * Renders a heading where one or more words are italicised in gold — the
 * site's signature device. `parts` is an array of strings; `gold` is the
 * index (or array of indices) to emphasise. Defaults to the last word.
 * `block` puts each part on its own line (used for the line-broken hero H1).
 */
export default function GoldHeading({
  parts,
  gold,
  as: Tag = 'h2',
  className = 'h2',
  block = false,
}) {
  const goldSet = new Set(
    gold === undefined
      ? [parts.length - 1]
      : Array.isArray(gold)
        ? gold
        : [gold],
  )

  return (
    <Tag className={`display ${className}`}>
      {parts.map((word, i) => {
        const isGold = goldSet.has(i)
        return (
          <span key={i}>
            {isGold ? <em>{word}</em> : word}
            {block ? <br /> : i < parts.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </Tag>
  )
}
