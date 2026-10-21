type Req = { method?: string }
type Res = { status(code: number): Res; json(body: unknown): void }

export default function handler(req: Req, res: Res) {
  // TODO: 不是 GET 就回 405 與 { error: '只支援 GET' }；GET 回 200 與留言陣列
  res.status(200).json([])
}
