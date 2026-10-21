const messages: { name: string; text: string }[] = []

export async function GET() {
  return Response.json(messages)
}

export async function POST(request: Request) {
  // TODO：解析 JSON、驗證 name 與 text，失敗時回傳 400
  const body = await request.json()
  messages.push({ name: body.name, text: body.text })
  return Response.json({ ok: true })
}
