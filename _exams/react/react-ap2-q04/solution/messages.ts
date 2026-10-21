type Req = { method?: string }
type Res = { status(code: number): Res; json(body: unknown): void }

export default function handler(req: Req, res: Res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: '只支援 GET' })
    return
  }
  res.status(200).json(['你好', '哈囉'])
}
