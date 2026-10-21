import { act, cleanup, render, screen } from '@testing-library/react'
import { Suspense } from 'react'
import { afterEach, expect, test } from 'vitest'
import { loadUser, UserCard } from './UserCard.tsx'

afterEach(cleanup)

test('同樣的 id，loadUser 要回傳同一個 Promise', () => {
  expect(loadUser(2) === loadUser(2), 'loadUser(2) 呼叫兩次應該拿到同一個 Promise，否則 use 會永遠卡在載入中').toBe(true)
})

test('先顯示載入中，資料到了顯示使用者名字', async () => {
  await act(async () => {
    render(
      <Suspense fallback={<p>載入中……</p>}>
        <UserCard id={1} />
      </Suspense>,
    )
  })
  expect(screen.queryByText('載入中……'), '資料還沒到時應該顯示 Suspense 的 fallback').not.toBeNull()
  expect(await screen.findByText('使用者：小明', {}, { timeout: 2000 }), '資料到了應該顯示「使用者：小明」').not.toBeNull()
})
