class Input extends React.PureComponent {
  render() {
    const {key, title, ...props} = this.props

    return (
      <div className="form-group">
        <label for={title}>{title}</label>
        <input className="form-control" id={title} {...props} />
      </div>
    )
  }
}

class Root extends React.Component {
  state = {
    inputs: [
      {key: 'email', type: 'email', title: 'email'},
      {key: 'name', type: 'text', title: 'name', maxlength: 5},
      {key: 'age', type: 'number', title: 'age', required: true},
    ],
  }

  componentDidMount() {
    this.internalTimer = setInterval(() => {
      this.setState((prev) => ({
        inputs: prev.inputs.sort(() => 0.5 - Math.random())
      }))
    }, 2000)
  }

  componentWillUnmount() {
    clearInterval(this.internalTimer)
  }

  handleSubmit = event => {
    event.preventDefault()

    const { email, name, age } = event.target.elements

    console.log(email.value)
    console.log(name.value)
    console.log(age.value)
  }

  render() {
    const {inputs} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        {inputs.map(input => (
          <Input {...input} />
        ))}
        <button type="submit">Submit</button>
      </form>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
