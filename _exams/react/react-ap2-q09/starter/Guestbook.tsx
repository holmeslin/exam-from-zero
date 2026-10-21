type Message = { name: string; text: string }
type Props = {
  loaderData: { messages: Message[] }
  actionData?: { error: string | null }
}

// 實際專案這裡用 react-router 的 <Form method="post">；題目沒有路由器環境，所以用一般的 <form>
export default function Guestbook({ loaderData, actionData }: Props) {
  return (
    <main>
      <h1>留言板</h1>
      <form method="post">
        <input name="name" placeholder="你的名字" />
        <textarea name="text" placeholder="想說的話" />
        {/* TODO: 有錯誤時用 role="alert" 顯示 */}
        <button type="submit">送出</button>
      </form>
      <ul>{/* TODO: 列出 loaderData.messages */}</ul>
    </main>
  )
}
