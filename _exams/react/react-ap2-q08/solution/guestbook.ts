export const messages: { name: string; text: string }[] = []

export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const name = String(formData.get('name') ?? '').trim()
  const text = String(formData.get('text') ?? '').trim()
  if (name === '' || text === '') {
    return { error: '請輸入名字與留言' }
  }
  messages.push({ name, text })
  return { error: null }
}
