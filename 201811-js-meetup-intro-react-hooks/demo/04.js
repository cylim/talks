
class Message extends React.PureComponent {
  render (){
    const {message} = this.props

    return (
      <div>{message ? message : 'No Message'}</div>
    )
  }
}

const element = (
  <div className='container'>
    <Message message='Hello World' />
    <Message />
  </div>
)

ReactDOM.render(element, document.getElementById('root'))