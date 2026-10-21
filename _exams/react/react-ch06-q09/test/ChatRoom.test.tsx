import { act, cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { ChatRoom } from './ChatRoom.tsx'

let logs: string[] = []

beforeEach(() => {
  vi.useFakeTimers()
  logs = []
  vi.spyOn(console, 'log').mockImplementation((...args: unknown[]) => {
    const msg = args.join(' ')
    if (/^(連線到|離開|🔔 已連上) /.test(msg)) logs.push(msg)
  })
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.useRealTimers()
})

const wait = (ms: number) =>
  act(async () => {
    vi.advanceTimersByTime(ms)
  })

test('連上 0.5 秒後通知；只切換靜音不該重新連線', async () => {
  const { rerender } = render(<ChatRoom roomId="general" muted={false} />)
  await wait(500)
  expect(logs).toEqual(['連線到 general', '🔔 已連上 general'])
  logs = []
  rerender(<ChatRoom roomId="general" muted={true} />)
  rerender(<ChatRoom roomId="general" muted={false} />)
  await wait(500)
  expect(logs, '只切換 muted 時不該出現「離開／連線到」，Effect 不該重新執行').toEqual([])
})

test('連線中途勾選靜音，通知要讀到最新的 muted 而不出現', async () => {
  const { rerender } = render(<ChatRoom roomId="general" muted={false} />)
  await wait(200)
  rerender(<ChatRoom roomId="general" muted={true} />)
  await wait(500)
  expect(logs, '0.5 秒內改成靜音，就不該印出通知').toEqual(['連線到 general'])
})

test('換房間時要先離開舊房間再連新房間', async () => {
  const { rerender } = render(<ChatRoom roomId="general" muted={false} />)
  rerender(<ChatRoom roomId="random" muted={false} />)
  await wait(500)
  expect(logs).toEqual(['連線到 general', '離開 general', '連線到 random', '🔔 已連上 random'])
})
