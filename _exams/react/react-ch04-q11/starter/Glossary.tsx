const terms = [
  { id: 1, word: '元件', meaning: '回傳畫面的函式' },
  { id: 2, word: 'props', meaning: '傳給元件的資料' },
]

// 每個名詞要畫成相鄰的 <dt> 和 <dd>，不能多包一層元素，
// 但現在 React 會警告列表項目缺少 key。請修正它。
export function Glossary() {
  return (
    <dl>
      {terms.map((term) => (
        <>
          <dt>{term.word}</dt>
          <dd>{term.meaning}</dd>
        </>
      ))}
    </dl>
  )
}
