import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import TermList from './TermList.vue'

const terms = [
  { id: 1, word: '元件', meaning: '畫面上的一塊' },
  { id: 2, word: 'props', meaning: '父元件傳給子元件的資料' },
]

test('<dt>、<dd> 直接放在 <dl> 底下，不多包一層', () => {
  const w = mount(TermList, { props: { terms } })
  const tags = Array.from(w.find('dl').element.children).map((el) => el.tagName)
  expect(tags, '<dl> 的子元素應該依序是 DT、DD、DT、DD').toEqual(['DT', 'DD', 'DT', 'DD'])
})

test('內容正確', () => {
  const w = mount(TermList, { props: { terms } })
  expect(w.findAll('dt').map((x) => x.text())).toEqual(['元件', 'props'])
  expect(w.findAll('dd').map((x) => x.text())).toEqual(['畫面上的一塊', '父元件傳給子元件的資料'])
})
