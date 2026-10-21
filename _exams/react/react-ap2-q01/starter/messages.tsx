type Props = { messages: string[]; renderedAt: string }

export const getServerSideProps = async () => {
  // TODO: 回傳 { props: { messages, renderedAt } }
  throw new Error('TODO: 還沒實作 getServerSideProps')
}

export default function MessagesPage({ messages, renderedAt }: Props) {
  return (
    <main>
      <h1>留言</h1>
      <p>產生時間：{renderedAt}</p>
      <ul>
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </main>
  )
}
