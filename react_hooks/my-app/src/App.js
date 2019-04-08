import React, { useState, useContext, useEffect, Component } from 'react';
import logo from './logo.svg';
import './App.css';
const ThemeContext = React.createContext("light")
const LocaleContext = React.createContext("english")

class Greetings extends Component{
  constructor(props){
    super(props)
    this.state = {name:'moh',surname:'sharma',width:window.innerWidth}
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleResize = this.handleResize.bind(this);
  }
  handleInputChange(e){
    this.setState({ [e.target.name]:e.target.value})
  }
  componentDidMount(){
    document.title = this.state.name + ' '+ this.state.surname;
    window.addEventListener('resize', this.handleResize);
  }
  componentWillMount(){
    window.removeEventListener('resize', this.handleResize);
  }
  componentDidUpdate(){
    document.title = this.state.name + ' ' + this.state.surname;
  }
  handleResize(){
    this.setState({width:window.innerWidth})
  }
  render(){
    return(
        <ThemeContext.Consumer>
          {(value) => (
            <section className={value}>
              <input name="name" value={this.state.name} onChange={this.handleInputChange} />
              <input name="surname" value={this.state.surname} onChange={this.handleInputChange} />
              <LocaleContext.Consumer>
                {(language) => (
                <input name="language" value={language} onChange={this.handleInputChange} />
                )}
              </LocaleContext.Consumer>
              {this.state.width} 
            </section>
          )}
      </ThemeContext.Consumer>
    )
  }
}
//useState is a hook
//useContext is a hook
//useEffect is a hook
function GreetingsF(props){
  // const [name, setName] = useState('Mary');
  // const [surname, setSurname] = useState('Poppins');
  const name = useFormInput('Mary')
  const surname = useFormInput('Poppins')
  const theme = useContext(ThemeContext);
  const language = useContext(LocaleContext);
  useDocumentTitle(name.value+' '+surname.value);
  // useEffect(()=>{
  //   document.title = name + ' ' + surname;
  // })
  const width = useWindowWidth();
  // const [width, setWidth] = useState(window.innerWidth);
  // useEffect(() => {
  //   const handleResize = () => setWidth(window.innerWidth);
  //   window.addEventListener('resize', handleResize);
  //   return () => {//cleanup effect
  //     window.removeEventListener('resize', handleResize);
  //   }
  // })
  // function handleInputChange(e){
  //   if(e.target.name == "name")
  //     setName(e.target.value);
  //   else if (e.target.name == "surname")
  //     setSurname(e.target.value);
  // }
  return(
    <section className={theme}>
      <input {...name} />
      <input {...surname} />
      <input name="language" value={language}/>
      {width}
    </section>
  )
} 
//this function is a custom hook
//by convention custom hook always starts with use keyword
//linting
function useWindowWidth(){
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {//cleanup effect
      window.removeEventListener('resize', handleResize);
    }
  })
  return width;
}
function useDocumentTitle(title){
  useEffect(() => {
    document.title = title;
  });
}
function useFormInput(initalValue){  
  const [value, setValue] = useState(initalValue);
  function handleInputChange(e) {
      setValue(e.target.value);
  }
  return {
    value,
    onChange: handleInputChange
  };
}
class App extends Component {

  render() {
    return (
      <ThemeContext.Provider value="dark">
        <LocaleContext.Provider value="english">
          <GreetingsF/>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

export default App;
