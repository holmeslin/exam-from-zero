import { expect, test } from 'vitest'
import { resolveFiles } from './layers'

const layer = {
  'nuxt.config.ts': 'layer config',
  'app/components/SiteFooter.vue': 'layer footer',
  'app/composables/useFormatPrice.ts': 'layer price',
}

test('Layer 的檔案會疊進專案', () => {
  const files = resolveFiles({ 'app/app.vue': 'my app' }, layer)
  expect(files['app/app.vue'], '專案自己的檔案要在').toBe('my app')
  expect(files['app/components/SiteFooter.vue'], '專案沒有的檔案要從 Layer 來').toBe('layer footer')
  expect(files['app/composables/useFormatPrice.ts']).toBe('layer price')
})

test('同名檔案以專案自己的為準', () => {
  const files = resolveFiles({ 'app/components/SiteFooter.vue': 'my footer' }, layer)
  expect(files['app/components/SiteFooter.vue'], '專案的 SiteFooter.vue 應該覆蓋 Layer 的').toBe('my footer')
  expect(files['nuxt.config.ts'], '沒被覆蓋的仍然用 Layer 的').toBe('layer config')
})
