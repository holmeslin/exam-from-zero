export const messages = [
  { name: '小明', text: '你好' },
  { name: '小華', text: '哈囉' },
  { name: '小明', text: '今天天氣很好' },
]

export async function loader({ request }: { request: Request }) {
  // TODO: 讀網址的 ?name=，有值時只回傳那個人的留言
  return { messages }
}
