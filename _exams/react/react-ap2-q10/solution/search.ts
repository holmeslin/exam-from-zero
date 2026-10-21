export const messages = [
  { name: '小明', text: '你好' },
  { name: '小華', text: '哈囉' },
  { name: '小明', text: '今天天氣很好' },
]

export async function loader({ request }: { request: Request }) {
  const name = new URL(request.url).searchParams.get('name')
  if (!name) {
    return { messages }
  }
  return { messages: messages.filter((message) => message.name === name) }
}
