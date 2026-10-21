export function addTaxFromInput(input: string): number {
  const price: number = Number(input);
  return price + price * 0.05;
}
