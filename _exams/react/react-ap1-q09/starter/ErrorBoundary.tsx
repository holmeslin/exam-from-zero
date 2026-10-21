import { Component, type ReactNode } from 'react'

type Props = { fallback: ReactNode; children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  // TODO：子元件丟出錯誤時，把 hasError 設成 true

  render() {
    // TODO：出錯時顯示 fallback
    return this.props.children
  }
}
