export function formatId(id: string | number): string {
  if (typeof id === 'string') {
    return id.toUpperCase()
  }
  return id.toFixed(0).padStart(4, '0')
}
