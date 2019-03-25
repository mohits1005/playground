import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
        {element7*/}
        {element8}
      </React.Fragment>
    );
  }
}

export default App;
