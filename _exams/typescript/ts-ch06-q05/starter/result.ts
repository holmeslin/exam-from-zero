export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export function parseAge(text: string): Result<number> {
  // TODO：依照題目回傳成功或失敗的結果
  return { ok: true, value: Number(text) };
}
