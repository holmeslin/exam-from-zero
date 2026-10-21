import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Greet } from './Greet.tsx'

test('greets by name', () => {
  render(<Greet name="ada" />)
  expect(screen.getByText('hello, ada')).toBeTruthy()
})
