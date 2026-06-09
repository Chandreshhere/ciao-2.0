import { useState } from 'react'
import { order } from '../data/content'
import Button from './ui/Button'
import './ContactForm.css'

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', required: true, auto: 'name' },
  { name: 'phone', label: 'Phone', type: 'tel', required: true, auto: 'tel' },
]

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Wire to a backend / Formspree here. For now, show the success state.
    setSent(true)
  }

  return (
    <form className="cform" onSubmit={handleSubmit} noValidate>
      <h3 className="cform__title display">
        Send an <em>Enquiry</em>
      </h3>

      <div className="cform__grid">
        {FIELDS.map((f) => (
          <div className="field" key={f.name}>
            <input
              id={`f-${f.name}`}
              name={f.name}
              type={f.type}
              placeholder=" "
              required={f.required}
              autoComplete={f.auto}
            />
            <label htmlFor={`f-${f.name}`}>{f.label}</label>
          </div>
        ))}

        <div className="field field--full">
          <select id="f-item" name="item" required defaultValue="">
            <option value="" disabled hidden></option>
            {order.selectOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <label htmlFor="f-item" className="label--select">
            What would you like?
          </label>
          <span className="field__caret" aria-hidden="true" />
        </div>

        <div className="field field--full">
          <input id="f-flavour" name="flavour" type="text" placeholder=" " />
          <label htmlFor="f-flavour">Flavour / Preference</label>
        </div>

        <div className="field field--full">
          <input id="f-date" name="date" type="date" required />
          <label htmlFor="f-date" className="label--date">
            Required Date
          </label>
        </div>

        <div className="field field--full">
          <textarea id="f-notes" name="notes" rows="3" placeholder=" "></textarea>
          <label htmlFor="f-notes">Notes / Custom Requests</label>
        </div>
      </div>

      <Button variant="gold" type="submit" className="cform__submit">
        Submit Order Request
      </Button>

      <p className="cform__success" role="status" aria-live="polite">
        {sent ? order.success : ''}
      </p>
    </form>
  )
}
