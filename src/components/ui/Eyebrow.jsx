export default function Eyebrow({ children, center = false, as: Tag = 'span' }) {
  return (
    <Tag className={`eyebrow${center ? ' eyebrow--center' : ''}`}>{children}</Tag>
  )
}
