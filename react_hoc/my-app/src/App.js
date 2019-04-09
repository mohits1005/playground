import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const higherOrderComponent = (WrappedComponent) => {
  class HOC extends Component{
    render(){
      return <WrappedComponent />
    }
  }
  return HOC;
}
class MyComponent extends Component{
  render(){
    return(
      <div>
        Hello world
      </div>
    )
  }
}
const withSecretToLife = (WrappedComponent) => {
  class HOC extends React.Component{
    render(){
      return(
        <WrappedComponent {...this.props} secretToLife={42}/>
      )
    }
  }
  return HOC
}
const DisplayTheSecret = props => (
  <div>
    The secret to life is  {props.secretToLife}
  </div>
)
const withStorage = (WrappedComponent) => {
  class HOC extends Component{
    constructor(props){
      super(props);
      this.state = {'storage':true,key:''};
      this.checkStorage = this.checkStorage.bind(this);
      this.load = this.load.bind(this);
      this.save = this.save.bind(this);
    }
    componentDidMount(){
      this.checkStorage();
    }
    checkStorage(){
      this.setState({'storage':true})
    }
    load(){
      if(this.state.storage){
        return this.state.key
      }
      return ''
    }
    save(key) {
      if (this.state.storage) {
        this.setState({ key })
      }
    }
    render(){
      return (
        <WrappedComponent {...this.props} status={this.state.storage} load={this.load} save={this.save}/>
      )
    }
  }
  return HOC
}
class ButtonComponent extends Component {
  constructor(props){
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }
  handleSave(){
    this.props.save('Hakuna matata')
  }
  handleLoad() {
    var data = this.props.load();
    alert(data);
  }
  render() {
    return (
      <div>
        <button onClick={this.handleSave}>
          Save
        </button>
        <button onClick={this.handleLoad}>
          Load
        </button>
      </div>
    )
  }
}
class RevComponent extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        {this.props.name}
      </div>
    )
  }
}
const reverse = (WrappedComponent) => {
  const HOC = ({children, ...props}) => {
    return (
      <WrappedComponent {...props} >
        {children}
      </WrappedComponent>
    )
  }
  return HOC
}
const TestComponent = ({children, ...props}) => {
    return (
      <div>
        {children} {props.name}
      </div>
    )
}
class TestComponent2 extends Component{
  render(){
    return (
      <div>
        {this.props.children} {this.props.name}
      </div>
    )
  }
}
class App extends Component {
  render() {
    const SimpleHoc = higherOrderComponent(MyComponent);
    const WrappedComponent = withSecretToLife(DisplayTheSecret);
    const WrappedComponent2 = withStorage(ButtonComponent)
    const Reverse = reverse(RevComponent);
    const name = 'moh';
    return (
      <div className="App">
        <SimpleHoc/>
        <WrappedComponent/>
        <WrappedComponent2/>
        <Reverse name={name} >
          Hello
        </Reverse>
        <TestComponent name={name} >
          Hi
        </TestComponent>
        <TestComponent2 name={name} >
          Ola
        </TestComponent2>
      </div>
    );
  }
}

export default App;
