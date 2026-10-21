type Props = { builtAt: string }

export const getStaticProps = async () => {
  // TODO: 回傳 builtAt，並讓頁面最多 10 秒更新一次
  return { props: { builtAt: '' } }
}

export default function AboutPage({ builtAt }: Props) {
  return (
    <main>
      <h1>關於</h1>
      <p>產生時間：{builtAt}</p>
    </main>
  )
}
