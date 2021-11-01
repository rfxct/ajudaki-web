export const Long = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo', timeStyle: 'short', dateStyle: 'medium'
})

export const isDate = (value) => {
  const result = new Date(value)
  return result instanceof Date && !isNaN(result.valueOf())
}

export const displayDate = (value) => {
  const result = new Date(value)
  return isDate(value) ? Long.format(result) : '---'
}