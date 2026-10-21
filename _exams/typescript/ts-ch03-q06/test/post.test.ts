import { expect, test } from 'vitest'
import { createPost, touch } from './post'

test('createPost 要有 Post 的所有屬性', () => {
  expect(createPost(1, '第一篇文章', '2026-10-01')).toEqual({
    id: 1,
    title: '第一篇文章',
    createdAt: '2026-10-01',
    updatedAt: '2026-10-01',
  })
})

test('touch 只更新 updatedAt', () => {
  const post = { id: 2, title: '第二篇', createdAt: '2026-10-01', updatedAt: '2026-10-01' }
  expect(touch(post, '2026-10-05')).toEqual({
    id: 2,
    title: '第二篇',
    createdAt: '2026-10-01',
    updatedAt: '2026-10-05',
  })
  expect(post.updatedAt, 'touch 不可以改到原本的 post').toBe('2026-10-01')
})
