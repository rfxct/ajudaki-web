export default function genAvatar(full_name = '') {
  let hash = 0;
  for (let i = 0; i < full_name.length; i++) {
    hash = full_name.charCodeAt(i) + ((hash << 3) - hash)
  }

  const color = Math.abs(hash).toString(16).substring(0, 6)
  const backgroundColor = `#${'000000'.substring(0, 6 - color.length) + color}`

  const prefixes = full_name.trim().split(/\s+/)
    .filter((_, i, a) => i === 0 || i === a.length - 1)
    .map(s => s[0]?.toUpperCase() || '')
    .join('')

  return (
    <div className="rounded-circle custom-avatar" style={{
      backgroundColor
    }}>
      <span>{prefixes}</span>
    </div >
  )
}
