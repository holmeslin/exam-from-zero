type Props = { builtAt: string }

export const getStaticProps = async () => {
  return { props: { builtAt: new Date().toISOString() }, revalidate: 10 }
}

export default function AboutPage({ builtAt }: Props) {
  return (
    <main>
      <h1>關於</h1>
      <p>產生時間：{builtAt}</p>
    </main>
  )
}
