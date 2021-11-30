export default function genAvatar(full_name = '') {
  const letters = Array.from('abcdefghijklmnopqrstuvwxyz')
  // Remove acentos
  const names = full_name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().split(/\s+/)

  // Pega as iniciais de cada nome
  const primary = [names[0], names.slice(-1)].map(String).map(s => !!s ? s[0] : '')
  // Pega a letra do meio de cada nome
  const secondary = [names[0], names.slice(-1)].map(String).map(s => !!s ? s[Math.floor(s.length / 2)] : '')

  // Gera um número de acordo com a letra fornecida (busca o índice dele no array letters)
  const prefixes = [...primary, ...secondary]
    .map(l => String(letters.indexOf(l.toLowerCase())).padStart(2, 'b')).join('')
  const hexColor = `#${full_name?.length ? prefixes : 'adb5bd'}`

  return (
    <div className="rounded-circle custom-avatar" style={{
      backgroundColor: hexColor.substr(0, 7)
    }}>
      <span>{primary}</span>
    </div >
  )
}

