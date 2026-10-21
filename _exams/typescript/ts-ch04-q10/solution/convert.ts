export function convert(value: string): number;
export function convert(value: number): string;
export function convert(value: string | number) {
  if (typeof value === "string") {
    return Number(value);
  }
  return String(value);
}
