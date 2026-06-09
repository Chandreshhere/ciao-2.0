import { useEffect } from 'react'
import { menu, menuTabs, menuNote } from '../data/menu'
import './MenuPage.css'

export default function MenuPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="menupage">
      <header className="menupage__top">
        <div className="shell menupage__top-inner">
          <button
            type="button"
            className="menupage__back"
            onClick={() => {
              window.location.hash = ''
            }}
          >
            ← Back
          </button>
          <a className="menupage__brand" href="#" onClick={() => (window.location.hash = '')}>
            <span className="menupage__brand-ciao">CIAO</span>
            <span className="menupage__brand-pat">patisserie</span>
          </a>
        </div>
      </header>

      <div className="shell menupage__head">
        <p className="menupage__kicker">Le Menu</p>
        <h1 className="menupage__title display">
          The Full <em>Menu</em>
        </h1>
        <p className="menupage__note">{menuNote}</p>
      </div>

      <div className="shell menupage__list">
        {menuTabs.map((tab) => (
          <section className="menupage__cat" key={tab.id}>
            <h2 className="menupage__cat-title display">{tab.label}</h2>
            <ul>
              {menu[tab.id].map((it) => (
                <li className="menupage__item" key={it.name}>
                  <div className="menupage__item-row">
                    <span className="menupage__item-name">{it.name}</span>
                    <span className="menupage__dots" aria-hidden="true" />
                    <span className="menupage__item-price">{it.price}</span>
                  </div>
                  {it.desc && <p className="menupage__item-desc">{it.desc}</p>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}
