type Props = { messages: string[]; renderedAt: string }

export const getServerSideProps = async () => {
  const messages = ['你好', '哈囉']
  return { props: { messages, renderedAt: new Date().toISOString() } }
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
