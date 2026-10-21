import { beforeEach, expect, test } from 'vitest'
import { sign } from './actions.ts'
import { getMessages, resetMessages } from './store.ts'

function form(name: string, text: string) {
  const fd = new FormData()
  fd.append('name', name)
  fd.append('text', text)
  return fd
}

beforeEach(() => resetMessages())

test('名字空白時回傳錯誤，並保留使用者填的內容', async () => {
  const state = await sign({}, form('   ', '你好'))
  expect(state, '名字只有空白時要回傳 { error: "請輸入名字", name: "", text: "你好" }').toEqual({
    error: '請輸入名字',
    name: '',
    text: '你好',
  })
  expect(getMessages(), '有錯誤時不應該存檔').toEqual([])
})

test('留言空白時回傳錯誤，名字要一起送回去', async () => {
  const state = await sign({}, form(' 小明 ', ''))
  expect(state, '留言是空的時要回傳 { error: "請輸入留言內容", name: "小明", text: "" }').toEqual({
    error: '請輸入留言內容',
    name: '小明',
    text: '',
  })
  expect(getMessages(), '有錯誤時不應該存檔').toEqual([])
})

test('兩個欄位都有填時，存下去掉空白的內容並回傳 {}', async () => {
  const state = await sign({}, form(' 小明 ', ' 好書！ '))
  expect(state, '成功時要回傳空物件 {}').toEqual({})
  expect(getMessages(), '要存下 trim 過的名字與留言').toEqual([{ name: '小明', text: '好書！' }])
})
