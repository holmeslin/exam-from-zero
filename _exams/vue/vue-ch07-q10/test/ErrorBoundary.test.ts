import { mount } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'
import { expect, test, vi } from 'vitest'
import ErrorBoundary from './ErrorBoundary.vue'

// 按下按鈕就讓資料壞掉的子元件
const UserCard = defineComponent({
  setup() {
    const user = ref<{ name: string } | null>({ name: '小明' })
    return () =>
      h('div', [
        h('p', { class: 'user' }, `使用者：${user.value!.name}`),
        h('button', { class: 'break', onClick: () => (user.value = null) }, '模擬資料壞掉'),
      ])
  },
})

test('子元件出錯時顯示備用畫面，錯誤不再往上傳，按再試一次可以恢復', async () => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  const appHandler = vi.fn()
  const w = mount(ErrorBoundary, {
    slots: { default: () => h(UserCard) },
    global: { config: { errorHandler: appHandler } },
  })
  expect(w.find('.user').text()).toBe('使用者：小明')

  await w.find('button.break').trigger('click')
  expect(w.find('.fallback').exists(), '子元件出錯後應該顯示 .fallback').toBe(true)
  expect(w.find('.fallback p').text()).toMatch(/^這一塊出錯了：.*name/)
  expect(appHandler, '錯誤應該在 ErrorBoundary 被攔下（return false），不該傳到 app.config.errorHandler').not.toHaveBeenCalled()

  await w.find('button.retry').trigger('click')
  expect(w.find('.user').text(), '按「再試一次」後 UserCard 要重新出現').toBe('使用者：小明')
})
