export function getName(data: unknown): string | undefined {
  if (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    typeof data.name === 'string'
  ) {
    return data.name
  }
  return undefined
}
