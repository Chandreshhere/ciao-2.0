import { ticker } from '../data/content'
import './Ticker.css'

export default function Ticker() {
  // Two identical groups loop seamlessly; a third copy guards wide screens.
  const group = (key) => (
    <div className="ticker__group" key={key} aria-hidden={key !== 'a'}>
      {ticker.map((item, i) => (
        <span className="ticker__item" key={i}>
          {item}
          <span className="ticker__dot" aria-hidden="true">
            ·
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="ticker" role="marquee" aria-label="Ciao Patisserie offerings">
      <div className="ticker__track">
        {group('a')}
        {group('b')}
        {group('c')}
      </div>
    </div>
  )
}
