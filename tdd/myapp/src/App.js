import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Clickers from './Clickers';

function App() {
  return (
      <div>
          <Header text='Header' />
          <Clickers />
      </div>
  );
}

export default App;
