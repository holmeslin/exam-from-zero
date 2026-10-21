import { Component } from 'react'

type Props = { label: string }
type State = { count: number }

export class Counter extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { count: 0 }
    // TODO：handleClick 傳給 onClick 之後，this 會丟失
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.props.label}：{this.state.count}
      </button>
    )
  }
}
