const messages: { name: string; text: string }[] = []

export async function GET() {
  return Response.json(messages)
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const text = typeof body?.text === 'string' ? body.text.trim() : ''
  if (!name) return Response.json({ error: '請輸入名字' }, { status: 400 })
  if (!text) return Response.json({ error: '請輸入留言' }, { status: 400 })
  messages.push({ name, text })
  return Response.json({ ok: true }, { status: 201 })
}
