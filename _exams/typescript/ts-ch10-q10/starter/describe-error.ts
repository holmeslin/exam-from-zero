export function describeError(error: unknown): string {
  return (error as Error).message
}
