import { menu, menuTabs } from '../data/menu'
import Button from './ui/Button'
import './Menu.css'

const SHOTS = ['/gallery/product-02.png']

export default function Menu() {
  return (
    <section className="section menu" id="menu" aria-labelledby="menu-title">
      <div className="shell menu__grid">
        {/* Left — pinned menu panel */}
        <aside className="menu__panel">
          <div className="menu__panel-head">
            <h2 className="menu__panel-title display">
              Signature
              <br />
              Plates
            </h2>
            <span className="menu__panel-mark" aria-hidden="true">
              ✦
            </span>
          </div>
          {menuTabs.map((tab) => (
            <div className="menu__group" key={tab.id}>
              <h3 className="menu__group-title">{tab.label}</h3>
              <ul className="menu__list">
                {menu[tab.id].map((it) => (
                  <li className="menu__item" key={it.name}>
                    <div className="menu__item-row">
                      <span className="menu__name">{it.name}</span>
                      <span className="menu__price">{it.price}</span>
                    </div>
                    <p className="menu__desc">{it.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Right — intro + scrolling images */}
        <div className="menu__body">
          <div className="menu__intro" id="menu-title">
            <h2 className="menu__title display">
              Made fresh. <em>Crafted in Paris.</em>
            </h2>
            <p className="menu__lede">
              Every cake, entremet, and macaron is made to order — French
              technique, Belgian chocolate, and seasonal fruit at the heart of
              each creation. Crafted to honour the craft while welcoming every
              kind of celebration.
            </p>
            <div className="menu__cta">
              <Button href="#order" variant="gold">
                Place an Order
              </Button>
              <Button href="#menu-full" variant="ghost">
                View Full Menu
              </Button>
            </div>
          </div>

          <div className="menu__shots">
            {SHOTS.map((src) => (
              <div className="menu__shot" key={src}>
                <img src={src} alt="" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
