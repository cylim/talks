class Input extends React.PureComponent {
  render() {
    const {type, key, title} = this.props

    return (
      <div className="form-group">
        <label for={key}>{title}</label>
        <input type={type} className="form-control" id={key} />
      </div>
    )
  }
}

// map, key

class Root extends React.PureComponent {
  render() {
    return (
      <form>
        <Input key="email" type="email" title="Please enter your email:" />
        <Input key="name" type="text" title="Please enter your name:" />
        <Input key="age" type="numeric" title="Please enter your age:" />
      </form>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
