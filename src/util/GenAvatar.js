export default function genAvatar(full_name = '') {
    const letters = Array.from('abcdefghijklmnopqrstuvwxyz')
    const names = full_name.split(/\s+/)

    const primary = [names[0], names.slice(-1)].map(String).map(s => !!s ? s[0] : '')
    const secondary = [names[0], names.slice(-1)].map(String).map(s => !!s ? s[Math.floor(s.length / 2)] : '')
    const tertiary = [names[0], names.slice(-1)].map(String).map(s => !!s ? s.slice(-1) : '')

    const prefixes = [...primary, ...secondary, ...tertiary].map(l => String(letters.indexOf(l.toLowerCase())).padStart(2, 'b')).join('')
    const hexColor = `#${full_name?.length ? prefixes : 'adb5bd'}`

    return (
        <div className="rounded-circle custom-avatar" style={{
            backgroundColor: hexColor.substr(0, 7)
        }}>
            <span>{primary}</span>
        </div >
    )
}

