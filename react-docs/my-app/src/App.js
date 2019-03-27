import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
function FancyBorder(props){
  return (
    <div>
      <div className={'FancyBorder FancyBorder-'+props.color}>
        {props.children}
      </div>
      
    </div>
  )
}
function Dialog(props){
  return (
    <div>
      <FancyBorder color='blue'>
        <h1 className='Dialog-title'>Welcome</h1>
        <p>
          Thank you for visiting our spacecraft!
        </p>
      </FancyBorder>
      { props.bottom }
    </div>
  )
}
function WelcomeDialog(props) {
  return(
    <Dialog bottom={props.welcomeMessage} />
  )
}
const scaleNames = {
  c: 'Celsius',
  f: 'Farenheit'
}
function BoilingVerdict(props){
  if(props.celsius >= 100){
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>
}
function toCelsius(farenheit){
  return (farenheit-32) * 5 / 9;
}
function toFarenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
class Calculator extends Component{
  constructor(props){
    super(props)
    this.state = {temperature:'', scale: 'c'}
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFarenheitChange = this.handleFarenheitChange.bind(this);
  }
  handleCelsiusChange(temperature){
    this.setState({temperature, scale:'c'})
  }
  handleFarenheitChange(temperature) {
    this.setState({ temperature, scale: 'f' })
  }
  render(){
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFarenheit) : temperature;
    return(
      <div>
        <TemperatureInput scale='c' temprature={celsius} onTempratureChange={this.handleCelsiusChange}/>
        <TemperatureInput scale='f' temprature={fahrenheit} onTempratureChange={this.handleFarenheitChange}/>
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    )
  }
}
class TemperatureInput extends Component{
  constructor(props){
    super(props);
    // this.state = {temprature: ''};
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e){
    // this.setState({ temprature:e.target.value})
    this.props.onTempratureChange(e.target.value)
  }
  render(){
    // const temprature = this.state.temprature;
    const temprature = this.props.temprature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temprature in {scaleNames[scale]}: </legend>
        <input value={temprature} onChange={this.handleInputChange} />
        {/* <BoilingVerdict celsius={parseFloat(temprature)} /> */}
      </fieldset>
    )
  }
}
class NameForm extends Component{
  constructor(props){
    super(props);
    this.state = {name:'',essay:'',pick:''}
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    console.log('Form submit with value: '+this.state.name)
  }
  handleInputChange(event){
    this.setState({[event.target.name]: event.target.value.toUpperCase()})
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
        </label>
        <label>
          Essay:
          <textarea name="essay" type="text" value={this.state.essay} onChange={this.handleInputChange} />
        </label>
        <label>
          Pick from one:
          <select name="pick" value={this.state.pick} onChange={this.handleInputChange}>
            <option value="a">a</option>
            <option value="b">b</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
function Posts(props){
  return (
    <div pid={props.id}>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  )
}
function Blog(props){
  const sideBar = (
    <ul>
      {props.posts.map(post => {
        return (
          <li key={post.id}>
            {post.title}
          </li>
        )
      })}
    </ul>
  );
  const content = props.posts.map(post => {
    return (
      <Posts key={post.id} id={post.id} title={post.title} content={post.content} />
    )
  })
  return(
    <div>
      {sideBar}
      <hr />
      {content}
    </div>
  )
}
function ListItem(props){
  //and not here
  return <li>{props.value}</li>
}
function NumberList(props){
  var numbers = props.numbers;
  var listItems = numbers.map((number) => {
    //key should be specified here
    return <ListItem key={number.toString()} value={number}/>
  })
  return (
    <ul>{listItems}</ul>
  )
}
function WarningBanner(props){
  if(!props.warn){
    return null
  }
  return(
    <div>
      Warning!
    </div>
  )
}
class Page extends Component{
  constructor(props){
    super(props)
    this.state = {showWarning: true}
    this.toggleButtonClick = this.toggleButtonClick.bind(this);
  }
  toggleButtonClick(){
    this.setState(state => ({
      showWarning: !state.showWarning
    }))
  }
  render(){
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.toggleButtonClick}>
          {this.state.showWarning ? 'Hide': 'Show'}
        </button>
      </div>
    )
  }
}
class ConditionalLogin extends Component{
  constructor(props){
    super(props);
    this.state = {isLoggedIn: false}
  }
  render(){
    var isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        {
          isLoggedIn ? 
          (
            <div>
              Logged In
            </div>
          ) :
          (
            <div>
              Logged Out
            </div>
          )
        }
      </div>
    )
  }
}
function Mailbox(props){
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && 
        (
          <h2>
            You have {unreadMessages.length} messages.
          </h2>
        )
      }
    </div>
  )
}
class LoginController extends Component{
  constructor(props){
    super(props)
    this.state = {isLoggedIn: false}
    this.LoginClick = this.LoginClick.bind(this);
    this.LogoutClick = this.LogoutClick.bind(this);
  }
  LogoutClick(){
    this.setState({isLoggedIn: false})
  }
  LoginClick() {
    this.setState({ isLoggedIn: true })
  }
  render(){
    let button;
    if(!this.state.isLoggedIn){
      button = <button onClick={this.LoginClick}>Login</button>
    }
    else{
      button = <button onClick={this.LogoutClick}>Logout</button>
    }
    return(
      <div>
        {button}
      </div>
    );
  }
}
function UserGreeting(props){
  return <h1>Welcome back!</h1>
}
function GuestGreeting(props){
  return <h1>Please Signup!</h1>
}
function Greeting(props){
  const isLoggedIn = props.isLoggedIn;
  if(isLoggedIn){
    return <UserGreeting />
  }
  return <GuestGreeting />
}
class Toggle extends Component{
  constructor(props){
    super(props);
    this.state = {buttonState: true};
    this.buttonClick = this.buttonClick.bind(this);
  }
  buttonClick(){
    this.setState(state => ({
      buttonState: !state.buttonState
    }))
  }
  render(){
    return (
      <button onClick={this.buttonClick}>
        {this.state.buttonState ? 'ON' : 'OFF'}
      </button>
    );
  }
}
class Clock extends Component{
  constructor(props){
    super(props);
    this.state = { date: new Date()};
    this.tick = this.tick.bind(this);
  }
  tick(){
    this.setState({date: new Date()})
  }
  componentDidMount(){
    this.timer = setInterval(this.tick, 1000);
  }
  componentDidUnmount(){
    clearInterval(this.timer);
  }
  render(){
    return (
      <div>
        {this.state.date.toLocaleTimeString()}
      </div>
    )
  }
}
function Avatar(props){
  return (
    <div className='avatar'>
      {props.user.name}
    </div>
  )
}
function Comment(props){
  return (
    <div className='comment-wrap'>
      <Avatar user={props.author} />
      <div className = 'comment'>
        {props.text}
      </div>
      <div className ='date'>
        {formatDate(props.date)}
      </div>
    </div>
  )
}
function formatDate(date){
  return new Date(date).toLocaleTimeString();
}
function Welcome(props){
  return <h1>Hello, {props.name}</h1>
}
function Composition(){
  return(
    <React.Fragment>
      <Welcome name='moh' />
      <Welcome name='aku' />
    </React.Fragment>
  )
}
class App extends Component {
  formatName(user) {
    return `${user.firstName} ${user.lastName}`
  }
  getGreeting(user){
    if(user){
      return <h1>Hello, {this.formatName(user)}</h1>
    }
    else{
      return <h1>Hello, Stranger!</h1>
    }
  }
  buttonClicked(event){
    event.preventDefault();
    console.log('the link was clicked!');
  }
  buttonClickedParams(p,e) {
    e.preventDefault();
    console.log('the link was clicked with params: '+p);
  }
  render() {
    const name = 'mohit'
    const user = {
      firstName: 'Moh',
      lastName: 'Vinsmoke'
    }
    const element = <h1>Hello, {name}</h1>
    const element2 = <div tabIndex="0">Attribute using ""</div>
    const element3 = <div first={user.firstName}>Using curly braces</div>
    const element4 = React.createElement(
      'h1',
      {className: 'greeting'},
      'Hello world'
    )
    const element5 = <Welcome name='moh'/>
    const element6 = <Composition />
    const comment = {
      date: new Date(),
      text: 'Howdy moh!!',
      author: {
        name: 'demogorgon'
      }
    }
    const element7 = <Comment date={comment.date} author={comment.author} text={comment.text} />
    const element8 = <Clock  />
    const element9 = <Toggle />
    const element10 = <Greeting isLoggedIn={false} />
    const element11 = <LoginController />
    const messages = ['React', 'Re: React', 'Re:Re: React'];
    const element12 = <Mailbox unreadMessages={messages} />
    const element13 = <ConditionalLogin />
    const element14 = <Page />
    const numbers = [1,2,3,4,5]
    const element15 = <NumberList numbers={numbers} />
    const posts = [
      {id:1, title:'Hello World', content:'Welcome to learning react!'},
      {id:2, title:'Installation', content:'You can install react from npm'}
    ]
    const element16 = <Blog posts={posts} />
    const element17 = <NameForm />
    const element18 = <Calculator />
    const welcomeMessage = <div>Welcome!</div>
    const element19 = <WelcomeDialog welcomeMessage={welcomeMessage}/>
    return (
      <React.Fragment>
        {/* { element }
        { this.formatName(user) }
        { this.getGreeting() }
        { this.getGreeting(user) }
        {element2}
        {element3}
        {element4} }
        {element5}
        {element6}
        {element7}
        {element8*/}
        {/* <button onClick={this.buttonClicked} >Hola!</button> */}
        {/* {element9} */}
        {/* <button onClick={(e) => this.buttonClickedParams("1", e)}>
          Passing params in callback
        </button>
        <button onClick={this.buttonClickedParams.bind(this, "1")}>
          Passing params in callback
        </button> */}
        {/* {element10} */}
        {/* {element11} */}
        {/* {element12} */}
        {/* {element13} */}
        {/* {element14} */}
        {/* {element15} */}
        {/* {element16} */}
        {/* {element17} */}
        {/* {element18} */}
        {element19}
      </React.Fragment>
    );
  }
}

export default App;
