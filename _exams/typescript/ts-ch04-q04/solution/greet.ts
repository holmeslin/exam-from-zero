export function greet(name: string, title?: string) {
  if (title) {
    return `${name}${title}您好`;
  }
  return `${name}您好`;
}
