class Input extends React.PureComponent {
  render() {
    const {key, title, ...props} = this.props

    return (
      <div className="form-group">
        <label for={title}>{title}</label>
        <input className="form-control" id={title} {...props}/>
      </div>
    )
  }
}

const inputs = [
  {key: 'email', type: 'email', title: 'email'},
  {key: 'name', type: 'text', title: 'name', maxlength: 5 },
  {key: 'age', type: 'number', title: 'age', required: true},
]

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
