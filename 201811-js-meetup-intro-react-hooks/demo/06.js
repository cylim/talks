class Input extends React.PureComponent {
  render() {
    const {type, key, title, ...props} = this.props

    return (
      <div className="form-group">
        <label for={title}>{title}</label>
        <input type={type} className="form-control" id={title} {...props}/>
      </div>
    )
  }
}

const inputs = [
  {key: 'email', type: 'email', title: 'email'},
  {key: 'name', type: 'text', title: 'name'},
  {key: 'age', type: 'number', title: 'age', required: true},
]

// Min Max, OnChange
// Randomize

class Root extends React.PureComponent {
  handleSubmit = event => {
    event.preventDefault()

    const [email, name, age] = event.target
    console.log(email.value)
    console.log(name.value)
    console.log(age.value)
  }

  render() {
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
