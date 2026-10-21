import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import NoticeBox from './NoticeBox.vue'

test('放進來的內容出現在框裡', () => {
  const w = mount(NoticeBox, {
    props: { title: '活動' },
    slots: { default: '<strong>滿千免運！</strong>' },
  })
  expect(w.find('.notice-box strong').exists(), '標籤中間放的 <strong> 應該出現在 .notice-box 裡').toBe(true)
  expect(w.text(), '有放內容時不該再顯示預設內容').not.toContain('目前沒有公告。')
  expect(w.find('h3').text()).toBe('活動')
})

test('沒放東西時顯示預設內容', () => {
  const w = mount(NoticeBox, { props: { title: '公告' } })
  expect(w.find('.notice-box').text(), '沒放內容時應該顯示「目前沒有公告。」').toContain('目前沒有公告。')
})
