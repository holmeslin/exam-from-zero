export type Calculator = (a: number, b: number) => number;

export const add: Calculator = (a, b) => `${a}${b}`;

export const multiply: Calculator = (a, b) => {
  throw new Error("TODO: 回傳 a 乘以 b");
};
