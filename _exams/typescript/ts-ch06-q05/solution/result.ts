export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export function parseAge(text: string): Result<number> {
  const age = Number(text);
  if (Number.isNaN(age)) {
    return { ok: false, error: `「${text}」不是數字` };
  }
  if (age < 0) {
    return { ok: false, error: '年齡不能是負數' };
  }
  return { ok: true, value: age };
}
