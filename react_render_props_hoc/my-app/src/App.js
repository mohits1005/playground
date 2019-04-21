import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RenderProps from './components/ListContributors';

class App extends Component {
  render() {
    return (
      <div >
        <RenderProps />
      </div>
    );
  }
}

export default App;
