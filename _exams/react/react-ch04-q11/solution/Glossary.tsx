import { Fragment } from 'react'

const terms = [
  { id: 1, word: '元件', meaning: '回傳畫面的函式' },
  { id: 2, word: 'props', meaning: '傳給元件的資料' },
]

export function Glossary() {
  return (
    <dl>
      {terms.map((term) => (
        <Fragment key={term.id}>
          <dt>{term.word}</dt>
          <dd>{term.meaning}</dd>
        </Fragment>
      ))}
    </dl>
  )
}
