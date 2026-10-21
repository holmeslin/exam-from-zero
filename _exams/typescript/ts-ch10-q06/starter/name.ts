export function getName(data: unknown): string | undefined {
  if (typeof data === 'object') {
    return (data as { name: string }).name
  }
  return undefined
}
